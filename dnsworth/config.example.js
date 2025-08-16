// DNSWorth Configuration Template
// Copy this file to config.js and fill in your actual values
// NEVER commit config.js files to version control

export const config = {
  // =============================================================================
  // SERVER CONFIGURATION
  // =============================================================================
  
  server: {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost'
  },

  // =============================================================================
  // SECURITY CONFIGURATION
  // =============================================================================
  
  security: {
    sessionSecret: process.env.APP_SECRET_1 || 'your-super-secret-session-key-here',
    jwtSecret: process.env.APP_SECRET_2 || 'your-jwt-secret-key-here',
    encryptionKey: process.env.APP_SECRET_3 || 'your-32-character-encryption-key',
    
    // Rate limiting
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    },
    
    // CORS
    cors: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
        'http://localhost:3000',
        'https://dnsworth.com'
      ]
    }
  },

  // =============================================================================
  // EXTERNAL API CONFIGURATION
  // =============================================================================
  
  api: {
    humbleworth: {

      url: process.env.HUMBLEWORTH_API_URL || 'https://valuation.humbleworth.com/api/valuation',
      timeout: 10000
    }
  },

  // =============================================================================
  // REDIS CONFIGURATION (Production)
  // =============================================================================
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB) || 0,
    enabled: process.env.REDIS_ENABLED === 'true'
  },

  // =============================================================================
  // LOGGING AND MONITORING
  // =============================================================================
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    securityLevel: process.env.SECURITY_LOG_LEVEL || 'warn',
    auditEnabled: process.env.AUDIT_LOG_ENABLED === 'true'
  },

  // =============================================================================
  // DONATION AND SUPPORT LINKS
  // =============================================================================
  
  donation: {
    primary: process.env.VITE_DONATION_LINK || 'https://www.paypal.me/dekunley',
    backup: process.env.VITE_DONATION_BACKUP || 'https://www.paypal.me/dekunley'
  },

  // =============================================================================
  // PRODUCTION SECURITY
  // =============================================================================
  
  production: {
    ssl: {
      keyPath: process.env.SSL_KEY_PATH,
      certPath: process.env.SSL_CERT_PATH,
      caPath: process.env.SSL_CA_PATH
    },
    
    headers: {
      strictTransportSecurity: process.env.STRICT_TRANSPORT_SECURITY === 'true',
      contentSecurityPolicy: process.env.CONTENT_SECURITY_POLICY === 'true',
      xFrameOptions: process.env.X_FRAME_OPTIONS || 'DENY',
      xContentTypeOptions: process.env.X_CONTENT_TYPE_OPTIONS || 'nosniff'
    }
  }
};

// =============================================================================
// IMPORTANT SECURITY NOTES
// =============================================================================

/*
1. Generate strong secrets using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
2. Use different secrets for development, staging, and production
3. Rotate secrets regularly
4. Never share or commit these values
5. Use environment-specific .env files (.env.development, .env.production)
6. Consider using a secrets management service in production
7. Store sensitive configuration in environment variables, not in code
8. Use HTTPS in production with valid SSL certificates
9. Implement proper logging and monitoring
10. Regular security audits and updates
*/

export default config;
