// Enhanced secure domain validation utilities for backend
import { domainValidationConfig, requestValidationConfig } from '../config/security.js';

// Enhanced domain validation with advanced security checks
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

  // Advanced security checks
  if (domainValidationConfig.securityChecks.checkForXSS) {
    if (domain.includes('<') || domain.includes('>') || domain.includes('"') || domain.includes("'")) {
      return { valid: false, error: 'Domain contains invalid characters' };
    }
  }

  if (domainValidationConfig.securityChecks.checkForProtocols) {
    if (domain.includes('javascript:') || domain.includes('data:') || domain.includes('vbscript:') || 
        domain.includes('file:') || domain.includes('ftp:') || domain.includes('mailto:')) {
      return { valid: false, error: 'Domain contains invalid protocol' };
    }
  }

  if (domainValidationConfig.securityChecks.checkForInjection) {
    if (domain.includes('--') || domain.includes('/*') || domain.includes('*/') || 
        domain.includes('union') || domain.includes('select') || domain.includes('drop')) {
      return { valid: false, error: 'Domain contains potentially dangerous content' };
    }
  }

  // Stricter regex pattern with additional security
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!domainRegex.test(domain)) {
    return { valid: false, error: 'Invalid domain format' };
  }

  // Check individual parts
  const parts = domain.split('.');
  if (parts.length < 2) {
    return { valid: false, error: 'Domain must have at least one TLD' };
  }

  // Validate each part with enhanced security
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.length > domainValidationConfig.maxPartLength || part.length === 0) {
      return { 
        valid: false, 
        error: `Domain part too long. Maximum ${domainValidationConfig.maxPartLength} characters per part.` 
      };
    }
    
    // Check for consecutive hyphens
    if (part.includes('--')) {
      return { valid: false, error: 'Domain cannot contain consecutive hyphens' };
    }
    
    // Check for leading/trailing hyphens
    if (part.startsWith('-') || part.endsWith('-')) {
      return { valid: false, error: 'Domain parts cannot start or end with hyphens' };
    }
    
    // Check for invalid characters
    if (!/^[a-zA-Z0-9-]+$/.test(part)) {
      return { valid: false, error: 'Domain parts can only contain letters, numbers, and hyphens' };
    }

    // Check for consecutive dots
    if (part.includes('..')) {
      return { valid: false, error: 'Domain cannot contain consecutive dots' };
    }
  }

  // Check TLD
  const tld = parts[parts.length - 1].toLowerCase();
  
  // Block dangerous TLDs
  if (domainValidationConfig.blockedTLDs.includes(tld)) {
    return { valid: false, error: `TLD '${tld}' is not allowed` };
  }

  // Block IP addresses disguised as domains
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipRegex.test(domain)) {
    return { valid: false, error: 'IP addresses are not allowed as domains' };
  }

  // Check for blocked patterns
  for (const pattern of domainValidationConfig.blockedPatterns) {
    if (pattern.test(domain)) {
      return { valid: false, error: 'Domain matches blocked pattern' };
    }
  }

  // Additional security checks
  if (domain.includes('admin') || domain.includes('root') || domain.includes('system')) {
    return { valid: false, error: 'Domain contains restricted keywords' };
  }

  // Check for suspicious patterns
  if (domain.match(/[0-9]{4,}/)) {
    return { valid: false, error: 'Domain contains too many consecutive numbers' };
  }

  return { valid: true, domain: domain.toLowerCase() };
}

// Enhanced domain list validation
export function validateDomainList(domains) {
  if (!Array.isArray(domains)) {
    return { valid: false, error: 'Invalid input format. Expected array of domains.' };
  }

  if (domains.length === 0) {
    return { valid: false, error: 'No domains provided' };
  }

  if (domains.length > domainValidationConfig.maxDomainsPerRequest) {
    return { 
      valid: false, 
      error: `Too many domains. Maximum ${domainValidationConfig.maxDomainsPerRequest} allowed per request.` 
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

// Enhanced input sanitization with advanced protection
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Remove potentially dangerous characters and patterns
  sanitized = sanitized
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/file:/gi, '') // Remove file: protocol
    .replace(/ftp:/gi, '') // Remove ftp: protocol
    .replace(/mailto:/gi, '') // Remove mailto: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/["']/g, '') // Remove quotes
    .replace(/--/g, '') // Remove SQL comment markers
    .replace(/\/\*/g, '') // Remove SQL comment markers
    .replace(/\*\//g, '') // Remove SQL comment markers
    .replace(/union/gi, '') // Remove SQL keywords
    .replace(/select/gi, '') // Remove SQL keywords
    .replace(/drop/gi, '') // Remove SQL keywords
    .replace(/insert/gi, '') // Remove SQL keywords
    .replace(/update/gi, '') // Remove SQL keywords
    .replace(/delete/gi, '') // Remove SQL keywords
    .trim();

  // Limit input length
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

