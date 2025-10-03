import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function testDynadotAPI() {
  const apiKey = process.env.DYNADOT_API_KEY;
  const baseURL = 'https://api.dynadot.com/restful/v1/domains/testdomain123456789.com/search';
  
  console.log('🔑 Testing Dynadot API...');
  
  try {
    console.log('🧪 Testing Dynadot RESTful API...');
    
    const response = await axios.get(baseURL, {
      params: {
        show_price: true,
        currency: 'USD'
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
      
    console.log('✅ API Response Status:', response.status);
    console.log('📡 Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data) {
      console.log('🎉 Dynadot API is working correctly!');
    }
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testDynadotAPI();
