import API_CONFIG from '../config/api.js';

// Simple in-memory cache for API responses
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Warm-up function to prevent cold start issues
export const warmUpApi = async () => {
  try {
    // Call the warmup endpoint to prepare the backend
    const response = await fetch(`${API_CONFIG.baseURL}/warmup`, {
      method: 'GET',
      headers: { 
        'X-Requested-With': 'XMLHttpRequest',
        'X-Client-Version': '2.0.0'
      }
    });
    
    if (response.ok) {
      console.log('✅ API warmed up successfully');
      return true;
    }
  } catch (error) {
    console.log('⚠️  API warmup failed:', error.message);
  }
  return false;
};

// API utility functions for domain valuation
export const domainValuation = {
  // Single domain valuation with caching and warm-up
  async getSingle(domain) {
    const cacheKey = `single_${domain}`;
    const cached = responseCache.get(cacheKey);
    
    // Return cached response if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      // Returning cached response for domain
      return cached.data;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // Increased timeout to 18s
    
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/value`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Client-Version': '2.0.0'
        },
        body: JSON.stringify({ domain }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the successful response
      responseCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      // If it's a timeout error, try to warm up the API and retry once
      if (error.name === 'AbortError') {
        console.log('🔄 First request timed out, warming up API and retrying...');
        await warmUpApi();
        
        // Retry the request with a shorter timeout
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 15000);
        
        try {
          const retryResponse = await fetch(`${API_CONFIG.baseURL}/api/value`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-Client-Version': '2.0.0'
            },
            body: JSON.stringify({ domain }),
            signal: retryController.signal
          });
          
          clearTimeout(retryTimeoutId);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          
          const retryData = await retryResponse.json();
          
          // Cache the successful response
          responseCache.set(cacheKey, {
            data: retryData,
            timestamp: Date.now()
          });
          
          return retryData;
        } catch (retryError) {
          clearTimeout(retryTimeoutId);
          throw retryError;
        }
      }
      
      throw error;
    }
  },

  // Bulk domain valuation with optimized batching and warm-up
  async getBulk(domains) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased timeout to 30s
    
    try {
      // Check cache for individual domains first
      const uncachedDomains = [];
      const cachedResults = [];
      
      for (const domain of domains) {
        const cacheKey = `single_${domain}`;
        const cached = responseCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          cachedResults.push(cached.data);
        } else {
          uncachedDomains.push(domain);
        }
      }
      
      // If all domains are cached, return immediately
      if (uncachedDomains.length === 0) {
        // All bulk domains served from cache
        return { results: cachedResults };
      }
      
      // Only fetch uncached domains
      const response = await fetch(`${API_CONFIG.baseURL}/api/bulk-value`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Client-Version': '2.0.0'
        },
        body: JSON.stringify({ domains: uncachedDomains }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const bulkData = await response.json();
      
      // Cache individual domain results
      if (bulkData.results) {
        bulkData.results.forEach((result, index) => {
          const domain = uncachedDomains[index];
          const cacheKey = `single_${domain}`;
          responseCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
          });
        });
      }
      
      // Combine cached and new results
      const allResults = [...cachedResults, ...(bulkData.results || [])];
      
      return { results: allResults };
    } catch (error) {
      clearTimeout(timeoutId);
      
      // If it's a timeout error, try to warm up the API and retry once
      if (error.name === 'AbortError') {
        console.log('🔄 Bulk request timed out, warming up API and retrying...');
        await warmUpApi();
        
        // Retry the request with a shorter timeout
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 25000);
        
        try {
          const retryResponse = await fetch(`${API_CONFIG.baseURL}/api/bulk-value`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-Client-Version': '2.0.0'
            },
            body: JSON.stringify({ domains: uncachedDomains }),
            signal: retryController.signal
          });
          
          clearTimeout(retryTimeoutId);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          
          const retryData = await retryResponse.json();
          
          // Cache individual domain results
          if (retryData.results) {
            retryData.results.forEach((result, index) => {
              const domain = uncachedDomains[index];
              const cacheKey = `single_${domain}`;
              responseCache.set(cacheKey, {
                data: result,
                timestamp: Date.now()
              });
            });
          }
          
          // Combine cached and new results
          const allResults = [...cachedResults, ...(retryData.results || [])];
          
          return { results: allResults };
        } catch (retryError) {
          clearTimeout(retryTimeoutId);
          throw retryError;
        }
      }
      
      throw error;
    }
  }
};

// Error handling utility
export const handleApiError = (error) => {
  // Timeout errors
  if (error.name === 'AbortError') {
    return {
      message: 'Request timeout. Please try again.',
      type: 'timeout'
    };
  }
  
  // Network connectivity errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      message: 'Network error. Please check your connection and try again.',
      type: 'network'
    };
  }
  
  // HTTP status errors
  if (error.message && error.message.includes('HTTP error')) {
    const statusMatch = error.message.match(/status: (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 0;
    
    if (status === 429) {
      return {
        message: 'Too many requests. Please wait a moment and try again.',
        type: 'rate_limit'
      };
    } else if (status >= 500) {
      return {
        message: 'Server error. Please try again later.',
        type: 'server'
      };
    } else if (status >= 400) {
      return {
        message: 'Request error. Please check your input and try again.',
        type: 'client'
      };
    }
    
    return {
      message: 'Server error. Please try again later.',
      type: 'server'
    };
  }
  
  // Connection refused or similar network issues
  if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
    return {
      message: 'Unable to connect to server. Please check your internet connection.',
      type: 'connection'
    };
  }
  
  // Generic fallback
  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown'
  };
};

// Clear cache utility (useful for testing)
export const clearCache = () => {
  responseCache.clear();
  console.log('✅ API cache cleared successfully');
};
