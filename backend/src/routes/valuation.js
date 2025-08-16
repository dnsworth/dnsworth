import express from 'express';
import fetch from 'node-fetch';
import { SECURITY_CONFIG } from '../config/security.js';

const router = express.Router();

// Domain validation function
function validateDomain(domain) {
  if (!domain || typeof domain !== 'string') return false;
  
  // Remove protocol and www if present
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Domain regex validation
  const regex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return regex.test(cleanDomain);
}

// Single domain valuation
router.post('/value', async (req, res) => {
  try {
    const { domain } = req.body;
    
    // Input validation
    if (!domain || !validateDomain(domain)) {
      return res.status(400).json({ 
        error: 'Invalid domain format. Please provide a valid domain name.' 
      });
    }

    // Clean the domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Processing valuation request for domain: ${cleanDomain}`);
    }

    // Call HumbleWorth API using environment variable
    const response = await fetch(SECURITY_CONFIG.HUMBLEWORTH_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'DNSWorth/2.0.0'
      },
      body: JSON.stringify({ 
        domains: [cleanDomain] 
      }),
      timeout: SECURITY_CONFIG.REQUEST_TIMEOUT || 30000
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`HumbleWorth API error: ${response.status} ${response.statusText}`);
      }
      return res.status(response.status).json({ 
        error: 'Error fetching valuation from external service' 
      });
    }

    const data = await response.json();
    
    // Validate response data
    if (!data || !data.valuations || !Array.isArray(data.valuations)) {
      return res.status(500).json({ 
        error: 'Invalid response from valuation service' 
      });
    }

    // Return the first valuation result
    const result = data.valuations[0];
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Valuation completed for ${cleanDomain}: $${result?.valuation?.estimatedValue || 'N/A'}`);
    }
    
    res.json({
      success: true,
      domain: cleanDomain,
      valuation: result,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Valuation error:', err);
    }
    
    if (err.name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout. Please try again.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Bulk domain valuation
router.post('/bulk-value', async (req, res) => {
  try {
    const { domains } = req.body;
    
    // Input validation
    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      return res.status(400).json({ 
        error: 'Please provide an array of domains' 
      });
    }

    if (domains.length > SECURITY_CONFIG.MAX_DOMAINS_PER_REQUEST || 100) {
      return res.status(400).json({ 
        error: `Maximum ${SECURITY_CONFIG.MAX_DOMAINS_PER_REQUEST || 100} domains allowed per request` 
      });
    }

    // Validate and clean all domains
    const validDomains = [];
    const invalidDomains = [];

    domains.forEach(domain => {
      if (validateDomain(domain)) {
        const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
        validDomains.push(cleanDomain);
      } else {
        invalidDomains.push(domain);
      }
    });

    if (validDomains.length === 0) {
      return res.status(400).json({ 
        error: 'No valid domains provided' 
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Processing bulk valuation for ${validDomains.length} domains`);
    }

    // Call HumbleWorth API for bulk valuation using environment variable
    const response = await fetch(SECURITY_CONFIG.HUMBLEWORTH_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'DNSWorth/2.0.0'
      },
      body: JSON.stringify({ 
        domains: validDomains 
      }),
      timeout: SECURITY_CONFIG.REQUEST_TIMEOUT || 60000
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`HumbleWorth API error: ${response.status} ${response.statusText}`);
      }
      return res.status(response.status).json({ 
        error: 'Error fetching bulk valuation from external service' 
      });
    }

    const data = await response.json();
    
    // Validate response data
    if (!data || !data.valuations || !Array.isArray(data.valuations)) {
      return res.status(500).json({ 
        error: 'Invalid response from valuation service' 
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Bulk valuation completed for ${validDomains.length} domains`);
    }

    res.json({
      success: true,
      domains: validDomains,
      valuations: data.valuations,
      invalidDomains,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Bulk valuation error:', err);
    }
    
    if (err.name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout. Please try again.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

export default router;
