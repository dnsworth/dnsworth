import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import AIDomainGenerator from '../services/aiDomainGenerator.js';
import EnhancedDynadotService from '../services/enhancedAvailabilityService.js';
import DomainScheduler from '../services/domainScheduler.js';
import PersonalizationEngine from '../services/personalizationEngine.js';
import MultiSourceAvailability from '../services/multiSourceAvailability.js';
import auditLogger from '../middleware/auditLogger.js';

// Ensure environment variables are loaded
dotenv.config();

const router = express.Router();

// Lazy service initialization to avoid issues during module loading
let aiGenerator = null;
let dynadotService = null;
let scheduler = null;
let personalizationEngine = null;
let multiSourceAvailability = null;

function getServices() {
  if (!aiGenerator) {
    aiGenerator = new AIDomainGenerator();
    dynadotService = new EnhancedDynadotService();
    scheduler = new DomainScheduler();
    personalizationEngine = new PersonalizationEngine();
    multiSourceAvailability = new MultiSourceAvailability();
    
    // Start the scheduler
    scheduler.start();
  }
  return { aiGenerator, dynadotService, scheduler, personalizationEngine, multiSourceAvailability };
}

/**
 * GET /api/ai-gems - Get AI-generated domain gems
 */
router.get('/', async (req, res) => {
  try {
    const { count = 30, refresh = false, keywords, style = 'tech', length = 'medium', userId } = req.query;
    const { scheduler, personalizationEngine } = getServices();
    
    let domains = [];
    
    // Always get cached domains - no manual refresh allowed
    domains = await scheduler.getAvailableDomains(parseInt(count));
    console.log(`🔍 Retrieved ${domains.length} domains from scheduler`);
    
    // If no cached domains, return empty result (domains will be generated on schedule)
    if (domains.length === 0) {
      console.log('📦 No cached domains available - waiting for next generation cycle');
      domains = [];
    } else {
      console.log(`✅ Found ${domains.length} cached domains, returning them`);
    }
    
    // Personalize domains if userId is provided
    if (userId) {
      console.log(`🎯 Personalizing domains for user ${userId}...`);
      domains = await personalizationEngine.getPersonalizedDomains(userId, domains);
    }
    
    // Limit results
    const limitedDomains = domains.slice(0, parseInt(count));
    
    res.json({
      success: true,
      data: {
        gems: limitedDomains,
        total: limitedDomains.length,
        generatedAt: new Date().toISOString(),
        isAIGenerated: true,
        personalized: !!userId,
        source: 'AI Generation Engine'
      }
    });
    
  } catch (error) {
    console.error('Error in AI gems API:', error);
    
    // Log security event for failed domain generation
    auditLogger.logSecurityEvent('domain_generation_failed', {
      error: error.message,
      userId: req.query.userId,
      count: req.query.count
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI domains',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/ai-gems/custom - Generate custom domains based on keywords
 */
router.post('/custom', async (req, res) => {
  try {
    const { keywords, style = 'tech', length = 'medium', count = 20 } = req.body;
    
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Keywords array is required'
      });
    }
    
    console.log(`🎯 Generating custom domains for keywords: ${keywords.join(', ')}`);
    
    // Generate custom domains
    const generatedDomains = await aiGenerator.generateCustomDomains(keywords, style, length);
    
    // Check availability
    const availableDomains = await dynadotService.checkBulkAvailability(generatedDomains);
    
    // Format results
    const domains = availableDomains.map(domain => ({
      domain: domain.domain,
      description: generateDescription(domain.domain),
      category: categorizeDomain(domain.domain),
      tld: domain.tld || '.com',
      estimatedValue: estimateValue(domain.domain),
      availability: domain.available,
      price: domain.price,
      score: calculateScore(domain.domain),
      icon: getCategoryIcon(categorizeDomain(domain.domain)),
      tags: generateTags(domain.domain),
      generatedAt: new Date().toISOString(),
      isAIGenerated: true,
      customGenerated: true,
      keywords: keywords
    })).sort((a, b) => b.score - a.score).slice(0, parseInt(count));
    
    res.json({
      success: true,
      data: {
        gems: domains,
        total: domains.length,
        generatedAt: new Date().toISOString(),
        isAIGenerated: true,
        customGenerated: true,
        keywords: keywords,
        style: style,
        length: length
      }
    });
    
  } catch (error) {
    console.error('Error in custom AI gems API:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate custom domains',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/ai-gems/status - Get generation status
 */
router.get('/status', async (req, res) => {
  try {
    const status = await scheduler.getStatus();
    
    res.json({
      success: true,
      data: {
        isRunning: status.isRunning,
        lastGeneration: status.lastGeneration,
        domainCount: status.domainCount,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      }
    });
    
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get status',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/ai-gems/refresh - Manual refresh trigger
 */
router.post('/refresh', async (req, res) => {
  try {
    await scheduler.manualRefresh();
    
    res.json({
      success: true,
      message: 'Domain generation refresh started'
    });
    
  } catch (error) {
    console.error('Error refreshing domains:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh domains',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Helper functions
function generateDescription(domain) {
  const domainLower = domain.toLowerCase();
  const domainName = domain.split('.')[0];
  
  if (domainLower.includes('ai') || domainLower.includes('tech')) {
    return `AI-powered ${domainName} platform for modern businesses`;
  } else if (domainLower.includes('cloud') || domainLower.includes('data')) {
    return `Cloud-based ${domainName} solutions for enterprises`;
  } else if (domainLower.includes('app') || domainLower.includes('mobile')) {
    return `Mobile-first ${domainName} application platform`;
  } else if (domainLower.includes('fin') || domainLower.includes('pay')) {
    return `Financial technology ${domainName} services`;
  } else if (domainLower.includes('health') || domainLower.includes('med')) {
    return `Healthcare technology ${domainName} platform`;
  } else {
    return `Modern ${domainName} platform with great potential`;
  }
}

function categorizeDomain(domain) {
  const domainLower = domain.toLowerCase();
  
  if (domainLower.includes('ai') || domainLower.includes('tech') || domainLower.includes('data')) {
    return 'Technology';
  } else if (domainLower.includes('fin') || domainLower.includes('pay') || domainLower.includes('money')) {
    return 'Finance';
  } else if (domainLower.includes('health') || domainLower.includes('med') || domainLower.includes('wellness')) {
    return 'Healthcare';
  } else if (domainLower.includes('edu') || domainLower.includes('learn') || domainLower.includes('teach')) {
    return 'Education';
  } else if (domainLower.includes('shop') || domainLower.includes('market') || domainLower.includes('commerce')) {
    return 'E-commerce';
  } else {
    return 'Business';
  }
}

async function estimateValue(domain) {
  try {
    const cleanDomain = `${domain}.com`.replace(/^(https?:\/\/)?(www\.)?/, '');
    const response = await fetch('https://valuation.humbleworth.com/api/valuation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DNSWorth/2.0.0'
      },
      body: JSON.stringify({ domains: [cleanDomain] })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`🔍 HumbleWorth API response for ${domain}.com:`, JSON.stringify(data, null, 2));
      // Use auction value from the valuations array
      const auctionValue = data.valuations?.[0]?.auction;
      console.log(`💰 Using auction value: ${auctionValue} for ${domain}.com`);
      return auctionValue || data.valuations?.[0]?.marketplace || data.valuations?.[0]?.brokerage || 1000;
    }
  } catch (error) {
    console.log(`❌ HumbleWorth API error for ${domain}.com:`, error.message);
    console.log('🔄 Using fallback valuation');
  }
  
  // Fallback to basic estimation if API fails
  let baseValue = 1000;
  
  // Length scoring
  if (domain.length <= 4) baseValue += 2000;
  else if (domain.length <= 6) baseValue += 1000;
  else if (domain.length <= 8) baseValue += 500;
  
  // Tech keyword bonus
  const techKeywords = ['ai', 'tech', 'app', 'data', 'cloud', 'api', 'io', 'lab'];
  if (techKeywords.some(keyword => domain.includes(keyword))) {
    baseValue += 800;
  }
  
  // Brandability bonus
  if (isBrandable(domain)) {
    baseValue += 600;
  }
  
  const fallbackValue = Math.floor(baseValue + Math.random() * 1000);
  console.log(`🎲 Using fallback value: ${fallbackValue} for ${domain}.com`);
  return fallbackValue;
}

function calculateScore(domain) {
  let score = 100;
  
  // Length scoring
  if (domain.length >= 6 && domain.length <= 8) score += 30;
  else if (domain.length >= 9 && domain.length <= 12) score += 20;
  else if (domain.length > 12) score -= 20;
  
  // Memorability
  if (isAlliteration(domain)) score += 25;
  if (hasRepeatingPatterns(domain)) score += 15;
  if (endsWithVowel(domain)) score += 10;
  
  // Brandability
  if (soundsTechy(domain)) score += 20;
  if (isPronounceable(domain)) score += 25;
  if (isBrandable(domain)) score += 15;
  
  return Math.max(0, Math.min(200, score));
}

function generateTags(domain) {
  // Return empty array - no tags wanted
  return [];
}

function getCategoryIcon(category) {
  const icons = {
    'Technology': '🔬',
    'Finance': '💎',
    'Healthcare': '🏥',
    'Education': '🎓',
    'E-commerce': '🛍️',
    'Business': '🏢',
    'Creative': '🎭',
    'Health & Wellness': '🏥',
    'Environment': '🌿',
    'Entertainment': '🎪',
    'Sports': '⚽',
    'Food': '🍽️',
    'Travel': '✈️',
    'Real Estate': '🏘️',
    'Automotive': '🚗',
    'Fashion': '👗',
    'Music': '🎵',
    'Gaming': '🎮',
    'Photography': '📸',
    'Fitness': '💪',
    'Beauty': '💄',
    'General': '🌟'
  };
  return icons[category] || '🌟';
}

// Helper functions for scoring
function isAlliteration(domain) {
  return /^(\w)\1*/i.test(domain);
}

function hasRepeatingPatterns(domain) {
  return /(.)\1{1,}/.test(domain);
}

function endsWithVowel(domain) {
  return /[aeiou]$/i.test(domain);
}

function soundsTechy(domain) {
  const techWords = ['tech', 'cloud', 'data', 'code', 'app', 'api', 'ai', 'io', 'lab', 'soft', 'digital', 'cyber'];
  return techWords.some(word => domain.includes(word));
}

function isPronounceable(domain) {
  const vowelCount = (domain.match(/[aeiou]/gi) || []).length;
  return vowelCount >= domain.length * 0.3;
}

function isBrandable(domain) {
  return /^[a-z]{4,12}$/i.test(domain) && 
         /[aeiou]/i.test(domain) && 
         !/[^a-z]/i.test(domain);
}

/**
 * POST /api/ai-gems/check-availability - Check availability for specific domains
 */
router.post('/check-availability', async (req, res) => {
  try {
    const { domains } = req.body;
    const { dynadotService } = getServices();
    
    if (!domains || !Array.isArray(domains)) {
      return res.status(400).json({
        success: false,
        error: 'Domains array is required'
      });
    }
    
    // Check availability for the provided domains
    const availabilityResults = await dynadotService.checkBulkAvailability(
      domains.map(domain => ({ domain: domain.replace('.com', ''), tld: '.com' }))
    );
    
    res.json({
      success: true,
      data: {
        results: availabilityResults.map(result => ({
          domain: result.domain,
          available: result.available,
          checkedAt: new Date().toISOString()
        }))
      }
    });
  } catch (error) {
    console.error('❌ Error checking availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check availability',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Test Dynadot API endpoint
router.get('/test-dynadot', async (req, res) => {
  try {
    // Test with just one domain to avoid rate limiting
    const testDomains = ['example'];
    const domainList = testDomains.map(d => `${d}.com`).join(',');
    
    console.log('🔍 Testing Dynadot API with single domain:', domainList);
    
    const response = await axios.get(
      'https://api.dynadot.com/restful/v1/domains/bulk_search',
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.DYNADOT_API_KEY}`
        },
        params: {
          domain_name_list: domainList
        }
      }
    );
    
    res.json({
      success: true,
      request: {
        url: 'https://api.dynadot.com/restful/v1/domains/bulk_search',
        params: { domain_name_list: domainList }
      },
      response: response.data
    });
    
  } catch (error) {
        res.json({
          success: false,
          error: error.message,
          response: error.response?.data
        });
  }
});

/**
 * POST /api/ai-gems/trigger-generation - Manually trigger domain generation
 */
router.post('/trigger-generation', async (req, res) => {
  try {
    const { scheduler } = getServices();
    console.log('🔄 Manual domain generation triggered');
    await scheduler.generateFreshBatch();
    res.json({
      success: true,
      message: 'Domain generation triggered successfully'
    });
  } catch (error) {
    console.error('Error triggering generation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger generation',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
