import express from 'express';
import DomainGenerator from '../services/domainGenerator.js';

const router = express.Router();

const domainGenerator = new DomainGenerator();

/**
 * GET /api/gems
 * Get fresh AI-generated domain gems
 */
router.get('/', async (req, res) => {
  try {
    const {
      count = 20,
      category,
      keywords,
      tlds,
      length,
      refresh = false
    } = req.query;

    // Parse preferences
    const preferences = {
      category: category || null,
      keywords: keywords ? keywords.split(',') : null,
      tlds: tlds ? tlds.split(',') : null,
      length: length ? parseInt(length) : null
    };

    // Generate fresh domains
    const gems = await domainGenerator.generateFreshDomains(
      parseInt(count),
      preferences
    );

    res.json({
      success: true,
      data: {
        gems,
        total: gems.length,
        generatedAt: new Date().toISOString(),
        preferences
      }
    });
  } catch (error) {
    console.error('Error generating domain gems:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate domain gems',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/gems/generate
 * Generate domains with specific preferences
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      count = 20,
      preferences = {}
    } = req.body;

    const gems = await domainGenerator.generateFreshDomains(
      parseInt(count),
      preferences
    );

    res.json({
      success: true,
      data: {
        gems,
        total: gems.length,
        generatedAt: new Date().toISOString(),
        preferences
      }
    });
  } catch (error) {
    console.error('Error generating custom domain gems:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate custom domain gems',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/gems/check-availability
 * Check availability of specific domains
 */
router.post('/check-availability', async (req, res) => {
  try {
    const { domains } = req.body;

    if (!domains || !Array.isArray(domains)) {
      return res.status(400).json({
        success: false,
        error: 'Domains array is required'
      });
    }

    const availabilityResults = [];

    for (const domain of domains) {
      try {
        const isAvailable = await domainGenerator.checkAvailability(domain);
        availabilityResults.push({
          domain,
          available: isAvailable,
          checkedAt: new Date().toISOString()
        });
      } catch (error) {
        availabilityResults.push({
          domain,
          available: false,
          error: error.message,
          checkedAt: new Date().toISOString()
        });
      }
    }

    res.json({
      success: true,
      data: {
        results: availabilityResults,
        total: availabilityResults.length
      }
    });
  } catch (error) {
    console.error('Error checking domain availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check domain availability',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/gems/trending
 * Get trending keywords and categories
 */
router.get('/trending', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        keywords: domainGenerator.getTrendingKeywords(),
        categories: domainGenerator.getCategories(),
        tlds: domainGenerator.getTlds()
      }
    });
  } catch (error) {
    console.error('Error getting trending data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trending data',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/gems/refresh
 * Force refresh of domain gems (for admin use)
 */
router.post('/refresh', async (req, res) => {
  try {
    const { count = 50 } = req.body;

    // Generate a larger batch for refresh
    const gems = await domainGenerator.generateFreshDomains(parseInt(count));

    res.json({
      success: true,
      data: {
        gems,
        total: gems.length,
        refreshedAt: new Date().toISOString(),
        message: 'Domain gems refreshed successfully'
      }
    });
  } catch (error) {
    console.error('Error refreshing domain gems:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh domain gems',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
