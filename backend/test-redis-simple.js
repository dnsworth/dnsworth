#!/usr/bin/env node

// Simple Redis connection test
import Redis from 'ioredis';

async function testRedis() {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    console.log('❌ No REDIS_URL found');
    return;
  }

  console.log('🔍 Testing Redis URL:', redisUrl.substring(0, 20) + '...');
  
  try {
    const url = new URL(redisUrl);
    const isRedisCloud = url.hostname.includes('redis-cloud.com');
    const useTLS = url.protocol === 'rediss:' || isRedisCloud;
    
    console.log('📊 Connection details:', {
      protocol: url.protocol,
      host: url.hostname,
      port: url.port,
      useTLS,
      isRedisCloud
    });

    const options = {
      port: Number(url.port || 6379),
      host: url.hostname,
      username: url.username || 'default',
      password: url.password,
      tls: useTLS ? {
        servername: url.hostname,
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
      } : undefined,
      connectTimeout: 10000,
      commandTimeout: 5000,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 1,
      lazyConnect: false
    };

    console.log('🔧 Connection options:', {
      ...options,
      password: options.password ? '[HIDDEN]' : undefined
    });

    const redis = new Redis(options);
    
    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });
    
    redis.on('error', (err) => {
      console.log('❌ Redis connection error:', err.message);
    });
    
    redis.on('close', () => {
      console.log('🔌 Redis connection closed');
    });

    // Test basic operations
    await redis.set('test', 'hello');
    const value = await redis.get('test');
    console.log('✅ Redis test successful:', value);
    
    await redis.disconnect();
    console.log('✅ Redis disconnected cleanly');
    
  } catch (error) {
    console.log('❌ Redis test failed:', error.message);
  }
}

testRedis().catch(console.error);
