// Enhanced backend security configuration
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Security constants
export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || (isProduction ? 200 : 500),
  
  // CORS origins - use environment variables
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://dnsworth.com',
    process.env.FRONTEND_WWW_URL || 'https://www.dnsworth.com'
  ],
  
  // Request limits
  MAX_REQUEST_SIZE: process.env.MAX_REQUEST_SIZE || '5mb',
  MAX_DOMAINS_PER_REQUEST: parseInt(process.env.MAX_DOMAINS_PER_REQUEST) || 100,
  
  // Timeouts
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT) || (isProduction ? 10000 : 30000),
  
  // External API configuration
  HUMBLEWORTH_API_URL: process.env.HUMBLEWORTH_API_URL || 'https://valuation.humbleworth.com/api/valuation'
};

// Redis configuration for production
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB || 0,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3
};

// CORS configuration with enhanced security
export const corsOptions = {
  origin: SECURITY_CONFIG.ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'X-Client-Version',
    'X-Request-ID'
  ],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Advanced rate limiting with proper store configuration
export const rateLimitConfig = {
  windowMs: SECURITY_CONFIG.RATE_LIMIT_WINDOW_MS,
  max: SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS,
  message: { 
    error: 'Rate limit exceeded',
    retryAfter: Math.ceil(SECURITY_CONFIG.RATE_LIMIT_WINDOW_MS / 1000),
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use memory store for development, null for production (will use default)
  store: isProduction ? undefined : undefined,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  // Enhanced key generator with fingerprinting
  keyGenerator: (req) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'unknown';
    const requestId = req.get('X-Request-ID') || 'no-id';
    
    // Create unique fingerprint
    return `${ip}-${userAgent.substring(0, 50)}-${requestId}`;
  },
  // Enhanced rate limit handler
  handler: (req, res) => {
    const retryAfter = Math.ceil(SECURITY_CONFIG.RATE_LIMIT_WINDOW_MS / 1000);
    
    res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter,
      message: 'Too many requests from this IP',
      code: 'RATE_LIMIT_EXCEEDED',
      timestamp: new Date().toISOString()
    });
    
    // Log rate limit violation
    console.warn(`Rate limit exceeded for IP: ${req.ip}, User-Agent: ${req.get('User-Agent')}`);
  }
};

// Enhanced Helmet security configuration
export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "https://api.dicebear.com"],
      connectSrc: ["'self'", "https://dnsworth.onrender.com", "https://valuation.humbleworth.com"],
      fontSrc: ["'self'", "https:", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: isProduction ? [] : null
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' },
  xssFilter: true,
  hidePoweredBy: true,
  ieNoOpen: true,
  dnsPrefetchControl: { allow: false }
};

// Enhanced domain validation configuration
export const domainValidationConfig = {
  maxLength: 253,
  maxPartLength: 63,
  allowedTLDs: [
    'com', 'org', 'net', 'edu', 'gov', 'mil', 'int',
    'co', 'io', 'ai', 'app', 'dev', 'tech', 'digital',
    'online', 'website', 'site', 'web', 'blog', 'store',
    'shop', 'biz', 'info', 'name', 'pro', 'me', 'tv',
    'cc', 'ws', 'fm', 'am', 'fm', 'co.uk', 'org.uk',
    'net.uk', 'me.uk', 'ltd.uk', 'plc.uk', 'sch.uk',
    'ac.uk', 'gov.uk', 'nhs.uk', 'police.uk', 'mod.uk'
  ],
  blockedTLDs: [
    'test', 'localhost', 'invalid', 'example', 'local',
    'internal', 'private', 'corp', 'home', 'lan',
    'intranet', 'dev', 'staging', 'debug', 'admin',
    'root', 'system', 'internal', 'private'
  ],
  blockedPatterns: [
    /^[0-9]+$/, // Pure numbers
    /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/, // IP addresses
    /^[0-9a-fA-F:]+$/, // IPv6 addresses
    /^[0-9a-fA-F]+$/, // Hex strings
    /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/, // IP pattern
    /^[a-f0-9]{32}$/i, // MD5 hashes
    /^[a-f0-9]{40}$/i, // SHA1 hashes
    /^[a-f0-9]{64}$/i  // SHA256 hashes
  ],
  // Additional security checks
  securityChecks: {
    checkForXSS: true,
    checkForInjection: true,
    checkForProtocols: true,
    maxConsecutiveHyphens: 1,
    maxConsecutiveDots: 1
  }
};

// Enhanced API security configuration
export const apiSecurityConfig = {
  maxRequestSize: SECURITY_CONFIG.MAX_REQUEST_SIZE,
  timeout: SECURITY_CONFIG.REQUEST_TIMEOUT,
  maxDomainsPerRequest: SECURITY_CONFIG.MAX_DOMAINS_PER_REQUEST,
  maxRequestsPerMinute: isProduction ? 30 : 1000,
  requireHeaders: ['Content-Type', 'X-Requested-With', 'X-Client-Version'],
  validateOrigin: true,
  logRequests: true,
  logErrors: true,
  // Security headers
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  }
};

// Request validation configuration
export const requestValidationConfig = {
  maxBodySize: 5 * 1024 * 1024, // 5MB
  allowedContentTypes: ['application/json'],
  requiredHeaders: ['Content-Type', 'X-Requested-With'],
  maxHeaderSize: 8192,
  // Input sanitization
  sanitization: {
    removeScripts: true,
    removeEventHandlers: true,
    removeProtocols: true,
    maxInputLength: 1000
  }
};

// Export all configurations
export default {
  corsOptions,
  rateLimitConfig,
  helmetConfig,
  domainValidationConfig,
  apiSecurityConfig,
  requestValidationConfig,
  redisConfig,
  isProduction,
  isDevelopment,
  SECURITY_CONFIG
};
