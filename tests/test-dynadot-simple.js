import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDynadotAPI() {
  console.log('🔍 Testing Dynadot API with single domain...');
  
  try {
    // Test with just one domain
    const testDomain = 'example';
    const domainList = `${testDomain}.com`;
    
    console.log('📡 Making request to:', 'https://api.dynadot.com/restful/v1/domains/bulk_search');
    console.log('📡 With domain:', domainList);
    
    const response = await axios.get(
      'https://api.dynadot.com/restful/v1/domains/bulk_search',
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.DYNADOT_API_KEY}`
        },
        params: {
          domain_name_list: domainList
        },
        timeout: 10000
      }
    );
    
    console.log('✅ SUCCESS! Dynadot API Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ ERROR! Dynadot API Failed:');
    console.log('Error message:', error.message);
    console.log('Response status:', error.response?.status);
    console.log('Response data:', error.response?.data);
    
    if (error.response?.data?.error?.description === 'Too many failed attempts') {
      console.log('🚨 RATE LIMITED: Too many failed attempts. Please wait 15-30 minutes.');
    }
  }
}

testDynadotAPI();
