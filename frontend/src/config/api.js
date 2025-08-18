// API configuration for DNSWorth frontend
import { PRODUCTION_CONFIG } from './production.js';

const API_CONFIG = {
  // Base URL for API calls - Use local backend for development, production backend for production
  baseURL: import.meta.env.DEV ? 'http://localhost:8000' : 'https://dnsworth.onrender.com:8000',
  
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
