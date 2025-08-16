import API_CONFIG from '../config/api.js';

// Simple in-memory cache for API responses
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// API utility functions for domain valuation
export const domainValuation = {
  // Single domain valuation with caching
  async getSingle(domain) {
    const cacheKey = `single_${domain}`;
    const cached = responseCache.get(cacheKey);
    
    // Return cached response if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('📦 Returning cached response for:', domain);
      return cached.data;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Reduced from 30s to 15s
    
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
      throw error;
    }
  },

  // Bulk domain valuation with optimized batching
  async getBulk(domains) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // Reduced from 60s to 25s
    
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
        console.log('📦 All bulk domains served from cache');
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
      throw error;
    }
  }
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.name === 'AbortError') {
    return {
      message: 'Request timeout. Please try again.',
      type: 'timeout'
    };
  }
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      message: 'Network error. Please check your connection.',
      type: 'network'
    };
  }
  
  if (error.message && error.message.includes('HTTP error')) {
    return {
      message: 'Server error. Please try again later.',
      type: 'server'
    };
  }
  
  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown'
  };
};

// Clear cache utility (useful for testing)
export const clearCache = () => {
  responseCache.clear();
  console.log('🗑️ API cache cleared');
};
