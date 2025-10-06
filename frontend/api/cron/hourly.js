import BudgetAwareScheduler from '../../../backend/src/services/budgetAwareScheduler.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify cron secret for security
  const cronSecret = req.headers.authorization?.replace('Bearer ', '');
  if (cronSecret !== process.env.CRON_SECRET) {
    console.log('❌ [CRON] Unauthorized cron request');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('🔄 [CRON] Starting hourly domain generation...');

  try {
    const scheduler = new BudgetAwareScheduler();
    const results = await scheduler.generateHourlyBatch();
    
    const budgetStatus = await scheduler.getBudgetStatus();
    
    console.log(`✅ [CRON] Batch complete: ${results.length} domains generated`);
    
    res.json({ 
      success: true, 
      domains: results.length,
      budget: budgetStatus,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ [CRON] Batch failed:', error.message);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

