// Security utilities for input validation and sanitization

// Enhanced domain validation with security checks
export function validateDomain(domain) {
  if (!domain || typeof domain !== 'string') {
    return false;
  }

  // Length validation
  if (domain.length > 253) {
    return false;
  }

  // Stricter regex pattern
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!domainRegex.test(domain)) {
    return false;
  }

  // Check individual parts
  const parts = domain.split('.');
  if (parts.length < 2) {
    return false;
  }

  // Validate each part
  for (const part of parts) {
    if (part.length > 63 || part.length === 0) {
      return false;
    }
    
    // Check for consecutive hyphens
    if (part.includes('--')) {
      return false;
    }
    
    // Check for leading/trailing hyphens
    if (part.startsWith('-') || part.endsWith('-')) {
      return false;
    }
  }

  // Block dangerous TLDs and reserved domains
  const dangerousTLDs = [
    'test', 'localhost', 'invalid', 'example', 'local', 'internal',
    'private', 'corp', 'home', 'lan', 'intranet', 'dev', 'staging'
  ];
  
  const tld = parts[parts.length - 1].toLowerCase();
  if (dangerousTLDs.includes(tld)) {
    return false;
  }

  // Block IP addresses disguised as domains
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipRegex.test(domain)) {
    return false;
  }

  return true;
}

// Input sanitization to prevent XSS
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate and sanitize domain list for bulk operations
export function validateDomainList(domains) {
  if (!Array.isArray(domains)) {
    return { valid: false, error: 'Invalid input format' };
  }

  if (domains.length === 0) {
    return { valid: false, error: 'No domains provided' };
  }

  if (domains.length > 100) {
    return { valid: false, error: 'Maximum 100 domains allowed' };
  }

  const validDomains = [];
  const invalidDomains = [];

  for (const domain of domains) {
    const cleanDomain = sanitizeInput(domain);
    
    if (validateDomain(cleanDomain)) {
      validDomains.push(cleanDomain);
    } else {
      invalidDomains.push(domain);
    }
  }

  return {
    valid: validDomains.length > 0,
    validDomains,
    invalidDomains,
    totalValid: validDomains.length,
    totalInvalid: invalidDomains.length
  };
}

// Rate limiting helper
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

// Secure token generation (for Pro user verification)
export function generateSecureToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate Pro user token
export function validateProToken(token) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Basic token format validation
  const tokenRegex = /^[a-f0-9]{64}$/;
  return tokenRegex.test(token);
}

