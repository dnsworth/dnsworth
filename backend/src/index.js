import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fetch from 'node-fetch';
import { 
  corsOptions, 
  rateLimitConfig, 
  helmetConfig,
  apiSecurityConfig,
  requestValidationConfig,
  SECURITY_CONFIG
} from './config/security.js';
import { 
  validateDomain, 
  validateDomainList, 
  sanitizeInput,
  validateRequest,
  performSecurityAudit 
} from './utils/validation.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet(helmetConfig));
app.use(cors(corsOptions));

// Additional security middleware
app.use((req, res, next) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Add request ID for tracking
  req.requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  next();
});

// Body parsing middleware with enhanced security
app.use(express.json({ 
  limit: apiSecurityConfig.maxRequestSize,
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ 
        error: 'Invalid JSON',
        code: 'INVALID_JSON',
        message: 'Request body contains invalid JSON format'
      });
      throw new Error('Invalid JSON');
    }
  }
}));

// Enhanced rate limiting with Redis support
const limiter = rateLimit(rateLimitConfig);
app.use(limiter);

// Security headers middleware
app.use((req, res, next) => {
  // Add security headers
  Object.entries(apiSecurityConfig.securityHeaders).forEach(([key, value]) => {
    res.set(key, value);
  });
  
  // Add request ID header
  res.set('X-Request-ID', req.requestId);
  
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };
    
    if (res.statusCode >= 400) {
      console.warn('Request completed with error:', logData);
    } else {
      console.log('Request completed successfully:', logData);
    }
  });
  
  next();
});

// Health check endpoint with security audit
app.get('/health', (req, res) => {
  const securityAudit = performSecurityAudit();
  
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    security: {
      audit: securityAudit,
      version: '2.0.0',
      features: ['enhanced-validation', 'rate-limiting', 'security-headers', 'input-sanitization']
    }
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'DNSWorth API',
    version: '2.0.0',
    description: 'Free domain valuation API powered by HumbleWorth - Enhanced security, no restrictions',
    endpoints: {
      health: '/health',
      singleValuation: '/api/value',
      bulkValuation: '/api/bulk-value'
    },
    features: {
      unlimited: true,
      noProRequired: true,
      maxDomains: 100,
      rateLimit: `${rateLimitConfig.max} requests per ${rateLimitConfig.windowMs / 60000} minutes`,
      security: 'Enhanced with advanced protection'
    },
    support: {
      donation: 'https://www.paypal.me/dekunley',
      message: 'Support us to keep this tool free forever!'
    }
  });
});

// Single domain valuation endpoint with enhanced security
app.post('/api/value', validateRequest, async (req, res) => {
  try {
    const { domain } = req.body;
    
    // Enhanced validation and sanitization
    if (!domain) {
      return res.status(400).json({ 
        error: 'Domain is required',
        code: 'MISSING_DOMAIN',
        requestId: req.requestId
      });
    }

    const cleanDomain = sanitizeInput(domain);
    const validation = validateDomain(cleanDomain);
    
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error,
        code: 'INVALID_DOMAIN',
        requestId: req.requestId
      });
    }

    // Call HumbleWorth API with enhanced timeout and security
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiSecurityConfig.timeout);

    const apiResponse = await fetch(SECURITY_CONFIG.HUMBLEWORTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DNSWorth/2.0.0',
        'X-Request-ID': req.requestId
      },
      body: JSON.stringify({ domains: [validation.domain] }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!apiResponse.ok) {
      throw new Error(`HumbleWorth API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // Transform response to match expected format
    // HumbleWorth API returns {"valuations": [{"auction": X, "brokerage": Y, "domain": Z, "marketplace": W}]}
    const result = data.valuations && data.valuations.length > 0 ? data.valuations[0] : {};
    
    // Calculate estimated value as average of auction, marketplace, and brokerage
    const estimatedValue = Math.round((result.auction + result.marketplace + result.brokerage) / 3);
    
    const transformedData = {
      domain: validation.domain,
      valuation: {
        estimatedValue: estimatedValue,
        auctionValue: result.auction || 0,
        marketplaceValue: result.marketplace || 0,
        brokerageValue: result.brokerage || 0
      },
      confidence: 85, // Default confidence since API doesn't provide it
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    };

    res.json(transformedData);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout',
        message: 'The valuation request timed out. Please try again.',
        code: 'REQUEST_TIMEOUT',
        requestId: req.requestId
      });
    }
    
    // Secure error logging - no sensitive data
    console.error('Valuation error:', {
      requestId: req.requestId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing your request.',
      code: 'INTERNAL_ERROR',
      requestId: req.requestId
    });
  }
});

// Bulk domain valuation endpoint with enhanced security
app.post('/api/bulk-value', validateRequest, async (req, res) => {
  try {
    const { domains, totalDomains } = req.body;
    
    // Enhanced input validation
    if (!domains || !Array.isArray(domains)) {
      return res.status(400).json({ 
        error: 'Invalid domains array',
        code: 'INVALID_DOMAINS_ARRAY',
        requestId: req.requestId
      });
    }

    // Enhanced domain list validation
    const validation = validateDomainList(domains);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error,
        code: 'INVALID_DOMAIN_LIST',
        requestId: req.requestId
      });
    }

    // Check domain count limit
    if (validation.totalValid > apiSecurityConfig.maxDomainsPerRequest) {
      return res.status(400).json({ 
        error: `Too many domains. Maximum ${apiSecurityConfig.maxDomainsPerRequest} allowed.`,
        code: 'DOMAIN_LIMIT_EXCEEDED',
        requestId: req.requestId
      });
    }

    // Process domains in batches with enhanced security
    const batchSize = 5; // Reduced for security
    const results = [];
    const errors = [];

    for (let i = 0; i < validation.validDomains.length; i += batchSize) {
      const batch = validation.validDomains.slice(i, i + batchSize);
      
      try {
        const batchPromises = batch.map(async (domain) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), apiSecurityConfig.timeout);

            const apiResponse = await fetch(SECURITY_CONFIG.HUMBLEWORTH_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DNSWorth/2.0.0',
                'X-Request-ID': req.requestId
              },
              body: JSON.stringify({ domains: [domain] }),
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!apiResponse.ok) {
              throw new Error(`API error: ${apiResponse.status}`);
            }

            const data = await apiResponse.json();

            // HumbleWorth API returns {"valuations": [{"auction": X, "brokerage": Y, "domain": Z, "marketplace": W}]}
            const result = data.valuations && data.valuations.length > 0 ? data.valuations[0] : {};
            
            // Calculate estimated value as average of auction, marketplace, and brokerage
            const estimatedValue = Math.round((result.auction + result.marketplace + result.brokerage) / 3);

                   return {
                     domain,
                     valuation: {
                       estimatedValue: estimatedValue,
                       auctionValue: result.auction || 0,
                       marketplaceValue: result.marketplace || 0,
                       brokerageValue: result.brokerage || 0
                     },
                     confidence: 85 // Default confidence since API doesn't provide it
                   };
          } catch (error) {
            errors.push({
              domain,
              error: 'Valuation failed' // Generic error message for security
            });
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter(result => result !== null));

        // Enhanced delay between batches for security
        if (i + batchSize < validation.validDomains.length) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } catch (error) {
        console.error('Batch processing error:', {
          requestId: req.requestId,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Prepare secure response
    const response = {
      totalDomains: validation.totalDomains,
      processedDomains: results.length,
      failedDomains: errors.length,
      valuations: results,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
      message: 'Bulk valuation completed successfully! All features are free and unlimited.',
      requestId: req.requestId
    };

    res.json(response);
    
  } catch (error) {
    // Secure error logging
    console.error('Bulk valuation error:', {
      requestId: req.requestId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing bulk valuation.',
      code: 'INTERNAL_ERROR',
      requestId: req.requestId
    });
  }
});

// Contact form submission endpoint
app.post('/api/contact', validateRequest, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, email, subject, and message are required',
        code: 'MISSING_FIELDS',
        requestId: req.requestId
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please enter a valid email address',
        code: 'INVALID_EMAIL',
        requestId: req.requestId
      });
    }
    
    // Import email functionality
    const { createTransporter, emailTemplates, sendEmail } = await import('./config/email.js');
    
    // Create email transporter
    const transporter = createTransporter();
    
    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    };
    
    // Get email template
    const template = emailTemplates.contactForm(emailData);
    
    // Send email
    const mailOptions = {
      from: 'info@dnsworth.com',
      to: 'info@dnsworth.com',
      subject: template.subject,
      text: template.text,
      html: template.html,
      replyTo: emailData.email // So you can reply directly to the sender
    };
    
    const result = await sendEmail(transporter, mailOptions);
    
    // Log successful submission
    console.log('Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      ...emailData,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      emailResult: result
    });
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit contact form. Please try again later.',
      code: 'INTERNAL_ERROR',
      requestId: req.requestId
    });
  }
});

// Enhanced error handling middleware
app.use((error, req, res, next) => {
      // Secure error logging
    console.error('Unhandled error:', {
      requestId: req.requestId,
      error: error.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
      timestamp: new Date().toISOString()
    });
  
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'The request body contains invalid JSON.',
      code: 'INVALID_JSON',
      requestId: req.requestId
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred.',
    code: 'UNEXPECTED_ERROR',
    requestId: req.requestId
  });
});

// Enhanced 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist.`,
    code: 'ENDPOINT_NOT_FOUND',
    requestId: req.requestId
  });
});

// Start server with enhanced security logging
app.listen(PORT, () => {
  // DNSWorth API server running with enhanced security features
  
  // Perform security audit on startup
  const audit = performSecurityAudit();
  if (!audit.secure) {
    console.warn(`⚠️  Security audit issues detected: ${audit.issues.join(', ')}`);
  } else {
    console.log('✅ Security audit passed successfully');
  }
});

// Enhanced graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
