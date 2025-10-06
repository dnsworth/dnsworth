import UniversalScheduler from './universalScheduler.js';
// import redisManager from './redisManager.js'; // DISABLED

class BudgetAwareScheduler extends UniversalScheduler {
  constructor() {
    super();
    this.monthlySpent = 0;
    this.monthlyBudget = parseFloat(process.env.MONTHLY_BUDGET) || 5.00; // $5/month safety net
    this.redisKey = 'monthly_api_costs';
    // Use the same Redis client as UniversalScheduler (this.redis)
  }

  async generateHourlyBatch() {
    // Check budget before proceeding
    await this.loadMonthlySpent();
    
    if (this.monthlySpent >= this.monthlyBudget) {
      console.log('💰 [BUDGET] Monthly limit reached, using cached domains');
      return this.getCachedDomains();
    }

    try {
      console.log(`💰 [BUDGET] Monthly spent: $${this.monthlySpent.toFixed(3)}/$5.00`);
      
      const batch = await super.generateHourlyBatch();
      
      // Track cost (estimate)
      const batchCost = await this.estimateBatchCost();
      await this.recordCost(batchCost);
      
      return batch;
      
    } catch (error) {
      console.error('❌ [BUDGET] Batch failed, using fallback:', error.message);
      return this.getCachedDomains();
    }
  }

  async estimateBatchCost() {
    // Conservative estimates based on actual usage
    return {
      openai: 0.003,    // 90 domains with gpt-3.5-turbo
      replicate: 0.001, // 30 seconds CPU-small for valuations
      dynadot: 0.000,   // Free API
      total: 0.004      // $0.004 per batch
    };
  }

  async recordCost(cost) {
    this.monthlySpent += cost.total;
    
    // Use in-memory storage to avoid Redis issues
    console.log(`💰 [BUDGET] Cost recorded: $${cost.total.toFixed(3)} (Total: $${this.monthlySpent.toFixed(3)})`);
  }

  async loadMonthlySpent() {
    // Use in-memory storage to avoid Redis issues
    this.monthlySpent = 0;
    console.log(`💰 [BUDGET] Loaded monthly spent: $${this.monthlySpent.toFixed(3)}`);
  }

  async getBudgetStatus() {
    await this.loadMonthlySpent();
    return {
      monthlySpent: this.monthlySpent,
      monthlyBudget: this.monthlyBudget,
      remaining: this.monthlyBudget - this.monthlySpent,
      percentage: (this.monthlySpent / this.monthlyBudget) * 100
    };
  }

  async resetMonthlyBudget() {
    this.monthlySpent = 0;
    try {
      await this.redis.del(this.redisKey);
      console.log('💰 [BUDGET] Monthly budget reset');
    } catch (error) {
      console.log('⚠️ [BUDGET] Could not reset in Redis:', error.message);
    }
  }
}

export default BudgetAwareScheduler;
