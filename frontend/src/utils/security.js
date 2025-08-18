// Security utilities for DNSWorth frontend
import { SearchTracker } from './searchTracker';

// Environment configuration
export const SECURITY_CONFIG = {
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  donationLinks: {
    primary: import.meta.env.VITE_DONATION_LINK || 'https://www.paypal.me/dekunley',
    backup: import.meta.env.VITE_DONATION_BACKUP || 'https://www.paypal.me/dekunley',
  }
};

// Secure HTML sanitizer to prevent XSS attacks
export function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Create a temporary div element
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Define allowed HTML tags and attributes
  const allowedTags = [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'span', 'div'
  ];

  const allowedAttributes = {
    'a': ['href', 'target', 'rel', 'title'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'div': ['class', 'id'],
    'span': ['class', 'id'],
    'p': ['class'],
    'h1': ['class'],
    'h2': ['class'],
    'h3': ['class'],
    'h4': ['class'],
    'h5': ['class'],
    'h6': ['class'],
    'ul': ['class'],
    'ol': ['class'],
    'li': ['class'],
    'blockquote': ['class'],
    'code': ['class'],
    'pre': ['class']
  };

  // Recursively sanitize the DOM tree
  function sanitizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode();
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      // Remove disallowed tags
      if (!allowedTags.includes(tagName)) {
        return null;
      }

      // Create a new element with the same tag name
      const newElement = document.createElement(tagName);
      
      // Copy allowed attributes
      const allowedAttrs = allowedAttributes[tagName] || [];
      for (const attr of allowedAttrs) {
        if (node.hasAttribute(attr)) {
          let value = node.getAttribute(attr);
          
          // Sanitize specific attributes
          if (attr === 'href') {
            // Only allow http, https, and mailto protocols
            if (!value.match(/^(https?:\/\/|mailto:)/)) {
              value = '#';
            }
          } else if (attr === 'src') {
            // Only allow http and https protocols for images
            if (!value.match(/^https?:\/\//)) {
              value = '';
            }
          } else if (attr === 'target') {
            // Only allow _blank for external links
            if (value !== '_blank') {
              value = '';
            }
          }
          
          if (value) {
            newElement.setAttribute(attr, value);
          }
        }
      }

      // Add rel="noopener noreferrer" for external links
      if (tagName === 'a' && node.getAttribute('target') === '_blank') {
        newElement.setAttribute('rel', 'noopener noreferrer');
      }

      // Recursively sanitize child nodes
      for (const child of node.childNodes) {
        const sanitizedChild = sanitizeNode(child);
        if (sanitizedChild) {
          newElement.appendChild(sanitizedChild);
        }
      }

      return newElement;
    }

    return null;
  }

  // Sanitize the entire HTML
  const sanitizedNode = sanitizeNode(tempDiv);
  if (sanitizedNode) {
    return sanitizedNode.innerHTML;
  }

  return '';
}

// Secure content renderer that uses sanitized HTML
export function renderSecureHTML(content) {
  const sanitized = sanitizeHTML(content);
  return { __html: sanitized };
}

// Rate limiting for user actions
export class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(userId, validRequests);
    
    return true;
  }

  reset(userId) {
    this.requests.delete(userId);
  }
}

// Input validation and sanitization
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters and patterns
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

export function validateDomain(domain) {
  if (!domain || typeof domain !== 'string') {
    return false;
  }
  
  // Basic domain validation
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return domainRegex.test(domain) && domain.length <= 253;
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

// Secure token generation (for Pro user verification)
export function generateSecureToken() {
  // Generate a cryptographically secure random token
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

// Secure donation link validation
export function validateDonationLink(link) {
  if (!link || typeof link !== 'string') {
    return false;
  }
  
  // Only allow PayPal and trusted donation platforms
  const allowedDomains = [
    'paypal.me',
    'paypal.com',
    'stripe.com',
    'gofundme.com'
  ];
  
  try {
    const url = new URL(link);
    return allowedDomains.some(domain => url.hostname.endsWith(domain));
  } catch {
    return false;
  }
}

// Export the search tracker for use in other components
export { SearchTracker };
