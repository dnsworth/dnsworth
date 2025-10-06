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
  }

  async connect() {
    // Return existing connection if available
    if (this.redis && this.isConnected) {
      return this.redis;
    }

    // Simple connection - no complex retry logic
    if (this.connectionAttempts > 0) {
      console.log('⏳ Redis connection in progress, waiting...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.redis;
    }

    try {
      const redisUrl = process.env.REDIS_URL || process.env.REDISCLOUD_URL;
      
      if (!redisUrl) {
        console.log('⚠️ No Redis URL found, using memory fallback');
        this.fallbackMode = true;
        return null;
      }

      this.connectionAttempts++;
      console.log(`🔄 Attempting Redis connection (${this.connectionAttempts}/${this.maxRetries})...`);

      this.redis = new Redis(redisUrl, {
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 1, // Reduce retries to prevent connection spam
        lazyConnect: false, // Connect immediately
        keepAlive: 30000,
        connectTimeout: 5000, // Shorter timeout
        commandTimeout: 3000, // Shorter timeout
        retryDelayOnClusterDown: 1000,
        enableOfflineQueue: false,
        maxLoadingTimeout: 3000,
        maxMemoryPolicy: 'allkeys-lru', // Memory management
        onError: (err) => {
          console.error('❌ Redis connection error:', err.message);
          this.isConnected = false;
          // Don't retry on every error to prevent connection spam
        },
        onConnect: () => {
          console.log('✅ Redis connected successfully');
          this.isConnected = true;
          this.connectionAttempts = 0;
          this.fallbackMode = false;
        },
        onReconnecting: () => {
          console.log('🔄 Redis reconnecting...');
        },
        onClose: () => {
          console.log('🔌 Redis connection closed');
          this.isConnected = false;
        }
      });

      // Wait for connection with timeout
      await Promise.race([
        this.redis.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        )
      ]);

      return this.redis;

    } catch (error) {
      console.error('❌ Redis connection failed:', error.message);
      
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
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      if (this.fallbackMode || !this.isConnected) {
        console.warn('⚠️ Using memory fallback for GET');
        return this.memoryStore.get(key) || null;
      }

      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('❌ Redis GET error:', error.message);
      return this.memoryStore.get(key) || null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      if (this.fallbackMode || !this.isConnected) {
        console.warn('⚠️ Using memory fallback for SET');
        this.memoryStore.set(key, value);
        return true;
      }

      await this.redis.setex(key, ttl, JSON.stringify(value));
      console.log(`✅ Stored in Redis: ${key}`);
      return true;
    } catch (error) {
      console.error('❌ Redis SET error:', error.message);
      this.memoryStore.set(key, value);
      return true;
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
      connectionAttempts: this.connectionAttempts
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