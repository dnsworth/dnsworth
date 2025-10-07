// Minimal test for EnhancedDynadotService.parseBulkResponse mapping
// Run: node tests/test-availability-parse.js

import EnhancedDynadotService from '../backend/src/services/enhancedAvailabilityService.js';

function buildSampleResponse() {
  return {
    code: 200,
    message: 'Success',
    data: {
      domain_result_list: [
        { domain_name: 'alpha.com', available: 'yes', price: '12.99', currency: 'USD' },
        { domain_name: 'beta.com', available: 'no', price: '12.99', currency: 'USD' },
        { domain_name: 'gamma.com', status: 'available', price: '12.99', currency: 'USD' },
        { name: 'delta.com', available: true },
        { domain: 'epsilon.com', available: 1 }
      ]
    }
  };
}

async function main() {
  const svc = new EnhancedDynadotService();
  const resp = buildSampleResponse();
  const all = ['alpha.com', 'beta.com', 'gamma.com', 'delta.com', 'epsilon.com'];
  const results = svc.parseBulkResponse(resp, all);
  console.log('Parsed available count:', results.length);
  console.log('Parsed available domains:', results.map(r => r.domain).join(', '));
  if (results.length >= 4) {
    console.log('✅ Parser looks correct');
  } else {
    console.log('⚠️ Parser returned fewer than expected available domains');
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});


