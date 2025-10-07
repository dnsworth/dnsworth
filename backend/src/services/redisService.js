import redisManager from './redisManager.js';

class RedisService {
  constructor() {
    this.redis = redisManager;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    await this.redis.connect();
    this.initialized = true;
    console.log('✅ Redis Service initialized');
  }

  // Domain storage methods
  async storeDomains(key, domains, ttl = 3600) {
    await this.initialize();
    
    const domainData = {
      domains,
      generatedAt: new Date().toISOString(),
      count: domains.length,
      source: 'ai-generation'
    };

    return await this.redis.set(key, domainData, ttl);
  }

  async getDomains(key) {
    await this.initialize();
    
    const data = await this.redis.get(key);
    // Guard for legacy plain-array writes (defensive)
    if (Array.isArray(data)) return data;
    return data ? data.domains : [];
  }

  async getDomainData(key) {
    await this.initialize();
    
    return await this.redis.get(key);
  }

  async clearDomains(key) {
    await this.initialize();
    
    return await this.redis.del(key);
  }

  async hasDomains(key) {
    await this.initialize();
    
    return await this.redis.exists(key);
  }

  // Cache management
  async storeCache(key, data, ttl = 1800) {
    await this.initialize();
    
    return await this.redis.set(key, data, ttl);
  }

  async getCache(key) {
    await this.initialize();
    
    return await this.redis.get(key);
  }

  async clearCache(pattern) {
    await this.initialize();
    
    if (pattern) {
      const keys = await this.redis.keys(pattern);
      for (const key of keys) {
        await this.redis.del(key);
      }
      return keys.length;
    } else {
      return await this.redis.flushall();
    }
  }

  // Health check
  async healthCheck() {
    try {
      await this.initialize();
      const status = this.redis.getStatus();
      
      return {
        healthy: true,
        status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Batch operations
  async storeBatch(operations) {
    await this.initialize();
    
    const results = [];
    for (const op of operations) {
      try {
        let result;
        switch (op.type) {
          case 'set':
            result = await this.redis.set(op.key, op.value, op.ttl);
            break;
          case 'del':
            result = await this.redis.del(op.key);
            break;
          default:
            throw new Error(`Unknown operation type: ${op.type}`);
        }
        results.push({ success: true, result, key: op.key });
      } catch (error) {
        results.push({ success: false, error: error.message, key: op.key });
      }
    }
    
    return results;
  }

  // Get all domain keys
  async getAllDomainKeys() {
    await this.initialize();
    
    return await this.redis.keys('domains:*');
  }

  // Get system status
  getSystemStatus() {
    return this.redis.getStatus();
  }
}

// Singleton instance
const redisService = new RedisService();

export default redisService;


