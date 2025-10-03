import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDynadotIndividual() {
  console.log('🔍 Testing Dynadot API with INDIVIDUAL domain search...');
  
  try {
    // Test with a completely new domain we haven't tested
    const testDomain = 'brandnewtest123';
    
    console.log('📡 Making INDIVIDUAL request to:', `https://api.dynadot.com/restful/v1/domains/${testDomain}.com/search`);
    
    const response = await axios.post(
      `https://api.dynadot.com/restful/v1/domains/${testDomain}.com/search`,
      {
        domainName: `${testDomain}.com`,
        showPrice: "yes",
        currency: "USD"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.DYNADOT_API_KEY}`
        },
        timeout: 10000
      }
    );
    
    console.log('✅ SUCCESS! Dynadot Individual API Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ ERROR! Dynadot Individual API Failed:');
    console.log('Error message:', error.message);
    console.log('Response status:', error.response?.status);
    console.log('Response data:', error.response?.data);
    
    if (error.response?.data?.error?.description === 'Too many failed attempts') {
      console.log('🚨 RATE LIMITED: Too many failed attempts. Please wait 15-30 minutes.');
    } else if (error.response?.data?.error?.description === 'Invalid api command') {
      console.log('🚨 API COMMAND ERROR: The endpoint or method might be wrong.');
    }
  }
}

testDynadotIndividual();