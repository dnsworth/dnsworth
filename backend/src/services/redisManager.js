import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

class RedisManager {
  constructor() {
    this.redis = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = 3;
    this.retryDelay = 1000;
    this.fallbackMode = false;
    this.memoryStore = new Map();
    this.lastError = null; // capture last connection/command error for diagnostics
    this.connectionInfo = null; // parsed info for debugging (no secrets)
    this.isConnecting = false; // prevent multiple simultaneous connection attempts
  }

  async connect() {
    // Prevent multiple simultaneous connection attempts
    if (this.isConnecting) {
      console.log('⏳ Redis connection already in progress, waiting...');
      return this.redis;
    }

    // If already connected and healthy, return it
    if (this.redis && this.isConnected && this.redis.status === 'ready') {
      return this.redis;
    }

    // Destroy any existing problematic connection
    if (this.redis && !this.isConnected) {
      try {
        this.redis.disconnect();
        this.redis.quit();
      } catch (e) {
        // Ignore errors during cleanup
      }
      this.redis = null;
    }

    this.isConnecting = true;
    console.log('🔄 Creating fresh Redis connection...');

    try {
      const redisUrl = process.env.REDIS_URL || process.env.REDISCLOUD_URL;
      
      console.log('🔍 Redis URL check:', {
        hasRedisUrl: !!process.env.REDIS_URL,
        hasRedisCloudUrl: !!process.env.REDISCLOUD_URL,
        redisUrlLength: redisUrl ? redisUrl.length : 0,
        redisUrlPrefix: redisUrl ? redisUrl.substring(0, 20) + '...' : 'none'
      });
      
      if (!redisUrl) {
        console.log('⚠️ No Redis URL found, using memory fallback');
        this.fallbackMode = true;
        this.isConnecting = false;
        return null;
      }

      // Parse REDIS_URL explicitly and build options
      const urlObj = new URL(redisUrl);
      const protocol = urlObj.protocol.replace(':', '');
      const host = urlObj.hostname;
      const port = Number(urlObj.port || (protocol === 'rediss' ? 6380 : 6379));
      const password = urlObj.password;

      this.connectionInfo = {
        protocol,
        host,
        port,
        isTLS: protocol === 'rediss'
      };

      const isDev = (process.env.NODE_ENV || '').toLowerCase() === 'development';
      const clientOptions = {
        host,
        port,
        password,
        db: 0,
        lazyConnect: false,
        connectTimeout: isDev ? 3000 : 10000,
        commandTimeout: isDev ? 3000 : 5000,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 1,
        // CRITICAL: Add connection event handlers
        retryStrategy: (times) => {
          const maxTimes = isDev ? 1 : 3;
          if (times > maxTimes) {
            console.log('❌ Max Redis connection retries exceeded');
            return null;
          }
          return Math.min(times * 100, isDev ? 1000 : 3000);
        }
      };

      // Add TLS for rediss protocol
      if (protocol === 'rediss') {
        clientOptions.tls = {
          rejectUnauthorized: false,
          servername: host
        };
      }

      this.redis = new Redis(clientOptions);

      // Set up event listeners BEFORE connecting
      this.redis.on('connect', () => {
        console.log('✅ Redis connected successfully');
        this.isConnected = true;
        this.isConnecting = false;
        this.fallbackMode = false;
        this.lastError = null;
      });

      this.redis.on('error', (err) => {
        console.error('❌ Redis connection error:', err.message);
        this.isConnected = false;
        this.isConnecting = false;
        this.lastError = err.message;
      });

      this.redis.on('close', () => {
        console.log('🔌 Redis connection closed');
        this.isConnected = false;
      });

      this.redis.on('ready', () => {
        console.log('✅ Redis ready for commands');
        this.isConnected = true;
      });

      // Wait for connection with timeout
      await new Promise((resolve, reject) => {
        const ms = isDev ? 3000 : 10000;
        const timeout = setTimeout(() => {
          reject(new Error(`Redis connection timeout after ${ms}ms`));
        }, ms);

        this.redis.once('ready', () => {
          clearTimeout(timeout);
          resolve();
        });

        this.redis.once('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      return this.redis;

    } catch (error) {
      this.isConnecting = false;
      console.error('❌ Redis connection failed:', error.message);
      this.lastError = error.message;
      this.fallbackMode = true;
      
      // Clean up failed connection
      if (this.redis) {
        this.redis.disconnect();
        this.redis = null;
      }
      
      return null;
    }
  }

  async get(key) {
    try {
      // Ensure we have a connection
      if (!this.isConnected || !this.redis || this.redis.status !== 'ready') {
        await this.connect();
      }
      
      if (!this.isConnected || this.fallbackMode) {
        throw new Error('Redis not connected - cannot retrieve data');
      }

      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('❌ Redis GET error:', error.message);
      // Don't throw here - let the caller handle empty data
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    if (!this.isConnected) {
      await this.connect();
    }
    
    if (!this.isConnected) {
      throw new Error('Redis not connected - cannot store data');
    }

    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      console.log(`✅ Stored in Redis: ${key}`);
      return true;
    } catch (error) {
      console.error('❌ Redis SET error:', error.message);
      throw error;
    }
  }

  async del(key) {
    try {
      if (this.fallbackMode || !this.isConnected) {
        return this.memoryStore.delete(key);
      }

      return await this.redis.del(key);
    } catch (error) {
      console.error('❌ Redis DEL error:', error.message);
      return this.memoryStore.delete(key);
    }
  }

  async exists(key) {
    try {
      if (this.fallbackMode || !this.isConnected) {
        return this.memoryStore.has(key);
      }

      return await this.redis.exists(key);
    } catch (error) {
      console.error('❌ Redis EXISTS error:', error.message);
      return this.memoryStore.has(key);
    }
  }

  async keys(pattern) {
    try {
      if (this.fallbackMode || !this.isConnected) {
        const memoryKeys = Array.from(this.memoryStore.keys());
        return memoryKeys.filter(key => key.includes(pattern.replace('*', '')));
      }

      return await this.redis.keys(pattern);
    } catch (error) {
      console.error('❌ Redis KEYS error:', error.message);
      const memoryKeys = Array.from(this.memoryStore.keys());
      return memoryKeys.filter(key => key.includes(pattern.replace('*', '')));
    }
  }

  async flushall() {
    try {
      if (this.fallbackMode || !this.isConnected) {
        this.memoryStore.clear();
        return true;
      }

      return await this.redis.flushall();
    } catch (error) {
      console.error('❌ Redis FLUSHALL error:', error.message);
      this.memoryStore.clear();
      return true;
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      fallbackMode: this.fallbackMode,
      memoryStoreSize: this.memoryStore.size,
      connectionAttempts: this.connectionAttempts,
      lastError: this.lastError,
      connectionInfo: this.connectionInfo
    };
  }

  async disconnect() {
    if (this.redis && this.isConnected) {
      try {
        await this.redis.disconnect();
        this.isConnected = false;
        console.log('🔌 Redis disconnected gracefully');
      } catch (error) {
        console.error('❌ Error disconnecting Redis:', error.message);
      }
    }
  }

  // Force cleanup of all connections
  async forceCleanup() {
    try {
      if (this.redis) {
        await this.redis.quit();
        this.redis = null;
        this.isConnected = false;
        this.connectionAttempts = 0;
        console.log('🧹 Redis connections cleaned up');
      }
    } catch (error) {
      console.error('❌ Error during Redis cleanup:', error.message);
    }
  }
}

// Singleton instance
const redisManager = new RedisManager();

export default redisManager;