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

// Helmet configuration for security headers
export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://dnsworth.onrender.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
};

// API security configuration
export const apiSecurityConfig = {
  maxRequestSize: SECURITY_CONFIG.MAX_REQUEST_SIZE,
  maxDomainsPerRequest: SECURITY_CONFIG.MAX_DOMAINS_PER_REQUEST,
  timeout: SECURITY_CONFIG.REQUEST_TIMEOUT,
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
  maxHeaderSize: 16 * 1024, // 16KB
  allowedContentTypes: ['application/json'],
  requiredHeaders: ['X-Requested-With'],
  sanitization: {
    maxInputLength: 1000,
    allowedTags: [],
    allowedAttributes: []
  }
};

// Domain validation configuration
export const domainValidationConfig = {
  maxLength: 253,
  minLength: 1,
  allowedCharacters: /^[a-zA-Z0-9\-\.]+$/,
  maxLabels: 127,
  maxLabelLength: 63
};

// Input sanitization function
export function sanitizeInput(input, options = {}) {
  if (typeof input !== 'string') {
    return input;
  }
  
  let sanitized = input.trim();
  
  // Remove potentially dangerous characters
  sanitized = sanitized
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, ''); // Remove iframe tags
  
  // Apply length limits
  if (sanitized.length > requestValidationConfig.sanitization.maxInputLength) {
    sanitized = sanitized.substring(0, requestValidationConfig.sanitization.maxInputLength);
  }
  
  return sanitized;
}

// Enhanced request validation middleware
export function validateRequest(req, res, next) {
  // Check request size
  const contentLength = parseInt(req.get('Content-Length') || '0');
  const maxSize = requestValidationConfig.maxBodySize;
  
  if (contentLength > maxSize) {
    return res.status(413).json({
      error: 'Request too large',
      message: `Maximum request size is ${Math.round(maxSize / (1024 * 1024))}MB`,
      code: 'REQUEST_TOO_LARGE'
    });
  }
  
  // Check content type - be more flexible with charset and whitespace
  const contentType = req.get('Content-Type');
  if (!contentType) {
    return res.status(400).json({
      error: 'Missing content type',
      message: 'Content-Type header is required',
      code: 'MISSING_CONTENT_TYPE'
    });
  }
  
  // Check if content type contains any of the allowed types (more flexible)
  const hasValidContentType = requestValidationConfig.allowedContentTypes.some(type => 
    contentType.toLowerCase().includes(type.toLowerCase())
  );
  
  if (!hasValidContentType) {
    return res.status(400).json({
      error: 'Invalid content type',
      message: `Content-Type must contain one of: ${requestValidationConfig.allowedContentTypes.join(', ')}`,
      code: 'INVALID_CONTENT_TYPE'
    });
  }
  
  // Check for required headers
  for (const header of requestValidationConfig.requiredHeaders) {
    if (!req.get(header)) {
      return res.status(400).json({
        error: 'Missing required header',
        message: `Header '${header}' is required`,
        code: 'MISSING_HEADER'
      });
    }
  }

  // Check header size
  const headerSize = JSON.stringify(req.headers).length;
  if (headerSize > requestValidationConfig.maxHeaderSize) {
    return res.status(431).json({
      error: 'Request header too large',
      message: 'Request headers exceed maximum size limit',
      code: 'HEADER_TOO_LARGE'
    });
  }

  // Generate request ID for tracking
  req.requestId = req.get('X-Request-ID') || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  next();
}

// Rate limiting helper with enhanced security
export function createRateLimiter(maxRequests = 10, windowMs = 60000) {
  const requests = new Map();
  
  return function checkRateLimit(identifier) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }
    
    const userRequests = requests.get(identifier);
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    validRequests.push(now);
    requests.set(identifier, validRequests);
    
    return true; // Request allowed
  };
}

// Domain validation function
export function validateDomain(domain) {
  if (!domain || typeof domain !== 'string') {
    return { valid: false, error: 'Domain is required' };
  }

  // Length validation
  if (domain.length > domainValidationConfig.maxLength) {
    return { 
      valid: false, 
      error: `Domain too long. Maximum ${domainValidationConfig.maxLength} characters allowed.` 
    };
  }

  // Check for empty or whitespace-only domains
  if (domain.trim().length === 0) {
    return { valid: false, error: 'Domain cannot be empty' };
  }

  // Check for invalid characters
  if (!domainValidationConfig.allowedCharacters.test(domain)) {
    return { valid: false, error: 'Domain contains invalid characters' };
  }

  // Check individual parts
  const parts = domain.split('.');
  if (parts.length < 2) {
    return { valid: false, error: 'Domain must have at least one TLD' };
  }

  // Validate each part
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.length > domainValidationConfig.maxLabelLength || part.length === 0) {
      return { 
        valid: false, 
        error: `Domain part too long. Maximum ${domainValidationConfig.maxLabelLength} characters per part.` 
      };
    }
    
    // Check for leading/trailing hyphens
    if (part.startsWith('-') || part.endsWith('-')) {
      return { valid: false, error: 'Domain parts cannot start or end with hyphens' };
    }
  }

  return { valid: true, domain: domain.toLowerCase() };
}

// Domain list validation
export function validateDomainList(domains) {
  if (!Array.isArray(domains)) {
    return { valid: false, error: 'Invalid input format. Expected array of domains.' };
  }

  if (domains.length === 0) {
    return { valid: false, error: 'No domains provided' };
  }

  if (domains.length > domainValidationConfig.maxLabels) {
    return { 
      valid: false, 
      error: `Too many domains. Maximum ${domainValidationConfig.maxLabels} allowed per request.` 
    };
  }

  const validDomains = [];
  const invalidDomains = [];
  const errors = [];

  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    const validation = validateDomain(domain);
    
    if (validation.valid) {
      validDomains.push(validation.domain);
    } else {
      invalidDomains.push(domain);
      errors.push(`Domain ${i + 1}: ${validation.error}`);
    }
  }

  return {
    valid: validDomains.length > 0,
    validDomains,
    invalidDomains,
    totalValid: validDomains.length,
    totalInvalid: invalidDomains.length,
    errors,
    message: invalidDomains.length > 0 
      ? `${invalidDomains.length} invalid domains found and will be skipped.`
      : 'All domains are valid.'
  };
}

// Security audit function
export function performSecurityAudit() {
  const issues = [];
  
  // Check configuration
  if (domainValidationConfig.maxLength > 300) {
    issues.push('Domain length limit too high');
  }
  
  if (requestValidationConfig.maxBodySize > 10 * 1024 * 1024) {
    issues.push('Request body size limit too high');
  }
  
  return {
    secure: issues.length === 0,
    issues,
    timestamp: new Date().toISOString()
  };
}

