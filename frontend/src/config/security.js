// Secure configuration management
const SECURITY_CONFIG = {
  // Environment validation
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  
  // Secure donation links
  donationLinks: {
    primary: import.meta.env.VITE_DONATION_LINK || 'https://www.paypal.me/dekunley',
    backup: import.meta.env.VITE_DONATION_BACKUP || 'https://www.paypal.me/dekunley',
    secure: true
  },
  
  // Rate limiting configuration
  rateLimit: {
    maxSearchesPerMinute: 10,
    maxSearchesPerHour: 100,
    cooldownPeriod: 60000 // 1 minute
  },
  
  // Security headers
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  },
  
  // Input validation
  validation: {
    maxDomainLength: 253,
    maxBulkDomains: 100,
    allowedTLDs: ['com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'co', 'io', 'ai', 'app', 'dev', 'tech'],
    blockedPatterns: [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /on\w+=/i,
      /<script/i,
      /<iframe/i
    ]
  }
};

// Validate configuration
export function validateSecurityConfig() {
  const errors = [];
  
  if (SECURITY_CONFIG.isProduction && SECURITY_CONFIG.donationLinks.primary.includes('example.com')) {
    errors.push('Production donation link not configured');
  }
  
  if (SECURITY_CONFIG.rateLimit.maxSearchesPerMinute > 20) {
    errors.push('Rate limit too high for security');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Secure link validation
export function validateSecureLink(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname !== 'example.com';
  } catch {
    return false;
  }
}

// Get secure donation link
export function getSecureDonationLink() {
  const config = validateSecurityConfig();
  if (!config.valid) {
    console.warn('Security configuration issues detected');
  }
  
  return SECURITY_CONFIG.donationLinks.primary;
}

// Rate limiting helper
export function checkRateLimit(searchCount, lastSearchTime) {
  const now = Date.now();
  const timeDiff = now - lastSearchTime;
  
  if (timeDiff < SECURITY_CONFIG.rateLimit.cooldownPeriod) {
    return searchCount <= SECURITY_CONFIG.rateLimit.maxSearchesPerMinute;
  }
  
  return true;
}

export default SECURITY_CONFIG;
