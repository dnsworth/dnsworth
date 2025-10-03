// Simple test script to verify the gems API works
import express from 'express';

const app = express();
app.use(express.json());

// Simple mock gems data
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

// Gems API endpoint
app.get('/api/gems', (req, res) => {
  try {
    const { count = 20 } = req.query;
    const gems = mockGems.slice(0, parseInt(count));
    
    res.json({
      success: true,
      data: {
        gems,
        total: gems.length,
        generatedAt: new Date().toISOString(),
        message: 'Mock data - working!'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get domain gems',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Gems API test server running'
  });
});

// Start server
const PORT = 8001; // Use different port to avoid conflicts
app.listen(PORT, () => {
  console.log(`🧪 Test server running on http://localhost:${PORT}`);
  console.log(`📡 Test the gems API: http://localhost:${PORT}/api/gems`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  console.log('\n✅ If you see this, the API structure works!');
  console.log('🔄 Now you can test the frontend with this working API');
});
