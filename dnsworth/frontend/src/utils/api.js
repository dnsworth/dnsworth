import API_CONFIG from '../config/api.js';

// API utility functions for domain valuation
export const domainValuation = {
  // Single domain valuation
  async getSingle(domain) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
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
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  },

  // Bulk domain valuation
  async getBulk(domains) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout * 2); // Longer timeout for bulk
    
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/bulk-value`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Client-Version': '2.0.0'
        },
        body: JSON.stringify({ domains }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
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
