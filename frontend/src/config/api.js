// API configuration for DNSWorth frontend
import { PRODUCTION_CONFIG } from './production.js';

const API_CONFIG = {
  // Base URL for API calls - Temporarily use local backend for testing
  // TODO: Change back to production when backend is fixed
  baseURL: 'http://localhost:8000', // Temporarily force local backend
  
  // Request timeout in milliseconds
  timeout: PRODUCTION_CONFIG.api.timeout,
  
  // Retry configuration
  retryAttempts: PRODUCTION_CONFIG.api.retryAttempts,
  retryDelay: 1000,
  
  // Rate limiting
  rateLimit: {
    maxRequests: 10,
    windowMs: 60000, // 1 minute
  },
  
  // Cache configuration
  cache: {
    enabled: PRODUCTION_CONFIG.performance.enableCaching,
    duration: PRODUCTION_CONFIG.performance.maxCacheAge,
    maxSize: 100,
  },
  
  // Headers
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Client-Version': '2.0.0'
  }
};

export default API_CONFIG;
