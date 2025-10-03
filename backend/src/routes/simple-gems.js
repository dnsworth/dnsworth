import express from 'express';

const router = express.Router();

// Simple mock data for testing
const mockGems = [
  {
    domain: 'techflow.io',
    description: 'Modern tech platform for workflow automation',
    category: 'Technology',
    tld: '.io',
    estimatedValue: 1250,
    confidence: 87,
    availability: true,
    icon: '⚡',
    tags: ['tech', 'automation', 'platform'],
    generatedAt: new Date().toISOString(),
    isAIGenerated: false
  },
  {
    domain: 'greenenergy.co',
    description: 'Sustainable energy solutions and renewable technology',
    category: 'Environment',
    tld: '.co',
    estimatedValue: 890,
    confidence: 92,
    availability: true,
    icon: '🌱',
    tags: ['green', 'energy', 'sustainability'],
    generatedAt: new Date().toISOString(),
    isAIGenerated: false
  },
  {
    domain: 'cryptotrade.net',
    description: 'Advanced cryptocurrency trading platform',
    category: 'Finance',
    tld: '.net',
    estimatedValue: 2100,
    confidence: 85,
    availability: true,
    icon: '₿',
    tags: ['crypto', 'trading', 'finance'],
    generatedAt: new Date().toISOString(),
    isAIGenerated: false
  }
];

/**
 * GET /api/gems
 * Get simple domain gems (no AI for now)
 */
router.get('/', async (req, res) => {
  try {
    const { count = 20 } = req.query;
    
    // Return mock data for now
    const gems = mockGems.slice(0, parseInt(count));
    
    res.json({
      success: true,
      data: {
        gems,
        total: gems.length,
        generatedAt: new Date().toISOString(),
        message: 'Using mock data - AI generation coming soon!'
      }
    });
  } catch (error) {
    console.error('Error getting domain gems:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get domain gems',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
