// Production configuration for DNSWorth frontend
// This file contains only safe, public configuration values

export const PRODUCTION_CONFIG = {
  // API Configuration
  api: {
    baseURL: 'https://dnsworth.onrender.com',
    timeout: 15000,
    retryAttempts: 3,
  },
  
  // Security Configuration
  security: {
    // Content Security Policy
    csp: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'"],
      'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      'font-src': ["'self'", "https://fonts.gstatic.com"],
      'img-src': ["'self'", "data:", "https:"],
      'connect-src': ["'self'", "https://dnsworth.onrender.com"],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
    },
    
    // Feature flags for production
    features: {
      debugMode: false,
      verboseLogging: false,
      developmentTools: false,
    }
  },
  
  // Performance Configuration
  performance: {
    enableServiceWorker: true,
    enableCaching: true,
    enableCompression: true,
    maxCacheAge: 86400000, // 24 hours
  },
  
  // Analytics Configuration (if needed)
  analytics: {
    enabled: true,
    trackingId: null, // Set via environment variable if needed
  }
};

export default PRODUCTION_CONFIG;
