#!/usr/bin/env node

/**
 * Test script to verify timeout fixes for DNSWorth backend
 * This script tests the warmup endpoint and domain valuation to ensure no more timeout issues
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://127.0.0.1:8000'; // Use IPv4 explicitly
const TEST_DOMAIN = 'example.com';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (color, message) => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const testEndpoint = async (endpoint, method = 'GET', body = null) => {
  const startTime = Date.now();
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Client-Version': '2.0.0'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const duration = Date.now() - startTime;
    
    if (response.ok) {
      const data = await response.json();
      log('green', `✅ ${endpoint} - ${response.status} (${duration}ms)`);
      return { success: true, data, duration, status: response.status };
    } else {
      log('red', `❌ ${endpoint} - ${response.status} (${duration}ms)`);
      return { success: false, status: response.status, duration };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    log('red', `❌ ${endpoint} - Error: ${error.message} (${duration}ms)`);
    return { success: false, error: error.message, duration };
  }
};

const runTests = async () => {
  log('cyan', '\n🚀 DNSWorth Backend Timeout Fix Test Suite');
  log('cyan', '==========================================\n');
  
  // Test 1: Health check
  log('blue', '1. Testing health endpoint...');
  const healthResult = await testEndpoint('/health');
  
  // Test 2: Warmup endpoint
  log('blue', '\n2. Testing warmup endpoint...');
  const warmupResult = await testEndpoint('/warmup');
  
  // Test 3: First domain valuation (should work without timeout)
  log('blue', '\n3. Testing first domain valuation (no timeout expected)...');
  const firstValuationResult = await testEndpoint('/api/value', 'POST', { domain: TEST_DOMAIN });
  
  // Test 4: Second domain valuation (should be fast)
  log('blue', '\n4. Testing second domain valuation (should be fast)...');
  const secondValuationResult = await testEndpoint('/api/value', 'POST', { domain: 'test.com' });
  
  // Test 5: Bulk valuation
  log('blue', '\n5. Testing bulk valuation...');
  const bulkResult = await testEndpoint('/api/bulk-value', 'POST', { 
    domains: ['example.com', 'test.com', 'demo.com'] 
  });
  
  // Summary
  log('cyan', '\n📊 Test Results Summary');
  log('cyan', '======================');
  
  const results = [healthResult, warmupResult, firstValuationResult, secondValuationResult, bulkResult];
  const successfulTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  
  log('bright', `\nTotal Tests: ${totalTests}`);
  log('green', `Passed: ${successfulTests}`);
  log('red', `Failed: ${totalTests - successfulTests}`);
  
  // Check for timeout issues
  const timeoutIssues = results.filter(r => r.duration > 15000).length;
  if (timeoutIssues > 0) {
    log('yellow', `⚠️  ${timeoutIssues} tests took longer than 15 seconds`);
  } else {
    log('green', '✅ No timeout issues detected');
  }
  
  // Performance analysis
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / totalTests;
  log('blue', `\nAverage Response Time: ${Math.round(avgDuration)}ms`);
  
  if (avgDuration < 5000) {
    log('green', '✅ Performance: Excellent');
  } else if (avgDuration < 10000) {
    log('yellow', '⚠️  Performance: Good');
  } else {
    log('red', '❌ Performance: Needs improvement');
  }
  
  log('cyan', '\n🎯 Test completed!');
  
  if (successfulTests === totalTests) {
    log('green', '🎉 All tests passed! The timeout issue has been resolved.');
  } else {
    log('red', '❌ Some tests failed. Please check the backend configuration.');
  }
};

// Run tests
runTests().catch(error => {
  log('red', `\n💥 Test suite failed: ${error.message}`);
  process.exit(1);
});
