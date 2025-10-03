import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function testDynadotWait() {
  const apiKey = process.env.DYNADOT_API_KEY;
  
  console.log('⏰ Testing Dynadot API after waiting...');
  
  // Wait 30 seconds to clear rate limits
  console.log('⏳ Waiting 30 seconds to clear rate limits...');
  await new Promise(resolve => setTimeout(resolve, 30000));
  
  try {
    const response = await axios.get('https://api.dynadot.com/api3.json', {
      params: {
        key: apiKey,
        command: 'search',
        domain: 'example.com',
        show_price: true
      },
      timeout: 10000
    });
    
    console.log('✅ Status:', response.status);
    console.log('📡 Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.Response && response.data.Response.ResponseCode === '0') {
      console.log('🎉 SUCCESS! API is working now!');
      console.log('Domain available:', response.data.Response.available);
    } else {
      console.log('❌ Still failing:', response.data.Response?.Error);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.log('Response data:', error.response.data);
    }
  }
}

testDynadotWait();
