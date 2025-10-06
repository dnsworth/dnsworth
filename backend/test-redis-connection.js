import redisService from './src/services/redisService.js';

async function testRedisConnection() {
  try {
    console.log('🔍 Testing Redis connection...');
    
    // Test storing data
    const testData = [{ domain: 'test123', available: true }];
    await redisService.storeDomains('test:key', testData, 60);
    console.log('✅ Successfully stored test data');
    
    // Test retrieving data
    const retrieved = await redisService.getDomains('test:key');
    console.log('✅ Successfully retrieved data:', retrieved);
    
    // Test getting all domain keys
    const keys = await redisService.getAllDomainKeys();
    console.log('✅ All domain keys:', keys);
    
    // Clean up
    await redisService.clearDomains('test:key');
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Redis test failed:', error);
  }
}

testRedisConnection();

