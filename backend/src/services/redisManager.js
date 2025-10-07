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
  }

  async connect() {
    // Return existing connection if available
    if (this.redis && this.isConnected) {
      return this.redis;
    }

    // Check if we've exceeded max retries
    if (this.connectionAttempts >= this.maxRetries) {
      console.log('⚠️ Max Redis connection attempts reached, using memory fallback');
      this.fallbackMode = true;
      return null;
    }

    // If we have a stale connection, completely destroy it
    if (this.redis) {
      console.log('🔄 Destroying stale Redis connection...');
      try {
        this.redis.removeAllListeners();
        this.redis.disconnect();
        this.redis.quit();
      } catch (e) {
        // Ignore disconnect errors
      }
      this.redis = null;
      this.isConnected = false;
      
      // Small delay to ensure previous connection is fully destroyed
      await new Promise(resolve => setTimeout(resolve, 100));
    }

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
          return null;
        }

      this.connectionAttempts++;
      console.log(`🔄 Attempting Redis connection (${this.connectionAttempts}/${this.maxRetries})...`);

      // Parse REDIS_URL explicitly and build options
      let clientOptions;
      try {
        const urlObj = new URL(redisUrl);
        const protocol = urlObj.protocol.replace(':', '');
        const host = urlObj.hostname;
        const port = Number(urlObj.port || (protocol === 'rediss' ? 6380 : 6379));
        const username = urlObj.username || 'default';
        const password = urlObj.password || undefined;
        const isRedisCloudHost = /redis-cloud\.com$/.test(host) || /redns\.redis-cloud\.com$/.test(host);
        const useTLS = protocol === 'rediss' || isRedisCloudHost;

        this.connectionInfo = {
          protocol,
          host,
          port,
          isTLS: useTLS
        };

        // Upstash Redis connection configuration
        clientOptions = {
          host,
          port,
          password,
          db: 0,
          tls: useTLS ? {
            rejectUnauthorized: false,
            servername: host,
            checkServerIdentity: () => undefined
          } : undefined,
          connectTimeout: 15000,
          commandTimeout: 10000,
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 1,
          lazyConnect: false,
          keepAlive: 30000,
          family: 4,
          onError: (err) => {
            console.error('❌ Redis connection error:', err.message);
            this.isConnected = false;
            this.lastError = err.message;
          },
          onConnect: () => {
            console.log('✅ Redis connected successfully');
            this.isConnected = true;
            this.connectionAttempts = 0;
            this.fallbackMode = false;
            this.lastError = null;
          },
          onReconnecting: () => {
            console.log('🔄 Redis reconnecting...');
          },
          onClose: () => {
            console.log('🔌 Redis connection closed');
            this.isConnected = false;
          }
        };
      } catch (_) {
        // Fallback to URL string with basic TLS options if parsing fails
        clientOptions = {
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 1,
          lazyConnect: false,
          keepAlive: 30000,
          connectTimeout: 5000,
          commandTimeout: 3000,
          retryDelayOnClusterDown: 1000,
          enableOfflineQueue: false,
          maxLoadingTimeout: 3000,
          maxMemoryPolicy: 'allkeys-lru'
        };
      }

      this.redis = new Redis(clientOptions.port ? clientOptions : redisUrl, clientOptions.port ? undefined : clientOptions);

      // For lazy connect, we need to explicitly connect
      if (clientOptions.lazyConnect) {
        console.log('🔄 Connecting to Redis (lazy connect)...');
        await this.redis.connect();
      }

      // Wait for connection with timeout
      await Promise.race([
        this.redis.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 15000)
        )
      ]);

      return this.redis;

    } catch (error) {
      console.error('❌ Redis connection failed:', error.message);
      this.lastError = error.message;
      
      if (this.connectionAttempts < this.maxRetries) {
        console.log(`🔄 Retrying Redis connection in ${this.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.connect();
      } else {
        console.log('⚠️ Redis connection failed after retries, using memory fallback');
        this.fallbackMode = true;
        this.connectionAttempts = 0; // Reset for future attempts
        return null;
      }
    }
  }

  async get(key) {
    if (!this.isConnected) {
      await this.connect();
    }
    
    if (!this.isConnected) {
      throw new Error('Redis not connected - cannot retrieve data');
    }

    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('❌ Redis GET error:', error.message);
      throw error;
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