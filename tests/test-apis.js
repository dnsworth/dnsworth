import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Test OpenAI API
async function testOpenAI() {
  console.log('🤖 Testing OpenAI API...');
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Generate 3 short domain name ideas for a tech startup'
        }
      ],
      max_tokens: 100
    });

    console.log('✅ OpenAI API working!');
    console.log('Sample response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('❌ OpenAI API error:', error.message);
    return false;
  }
}

// Test Dynadot API
async function testDynadot() {
  console.log('🌐 Testing Dynadot API...');
  try {
    if (!process.env.DYNADOT_API_KEY) {
      console.log('⚠️  Dynadot API key not configured');
      return false;
    }

    // Mask API key in logs for security
    console.log('Using Dynadot API key: [MASKED]');

    const response = await axios.post('https://api.dynadot.com/api3.json', {
      key: process.env.DYNADOT_API_KEY,
      command: 'domain_check',
      domain: 'example-test-domain-12345.com'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Dynadot API working!');
    console.log('API Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Dynadot API error:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🧪 Testing API Connections...\n');
  
  const openaiResult = await testOpenAI();
  console.log('');
  
  const dynadotResult = await testDynadot();
  console.log('');
  
  console.log('📊 Test Results:');
  console.log(`OpenAI API: ${openaiResult ? '✅ Working' : '❌ Failed'}`);
  console.log(`Dynadot API: ${dynadotResult ? '✅ Working' : '❌ Failed'}`);
  
  if (openaiResult && dynadotResult) {
    console.log('\n🎉 All APIs are working correctly!');
  } else {
    console.log('\n⚠️  Some APIs need configuration. Check your .env file.');
  }
}

// Run tests
runTests().catch(console.error);
