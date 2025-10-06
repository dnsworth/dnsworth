import UniversalPremiumGenerator from './universalPremiumGenerator.js';
import DomainGemHunter from './domainGemHunter.js';
import redisService from './redisService.js';

class DomainComparison {
  constructor() {
    this.originalGenerator = new UniversalPremiumGenerator();
    this.gemHunter = new DomainGemHunter();
    this.comparisonKey = 'domain_comparison';
    this.gemHunterKey = 'domain_gem_hunter';
  }

  /**
   * Run both systems in parallel and compare results
   */
  async runComparison(count = 150) {
    console.log('🔄 Starting Domain System Comparison');
    console.log('📊 Testing Original vs Gem Hunter systems...');
    
    try {
      // Run both systems in parallel
      const [originalResults, gemHunterResults] = await Promise.all([
        this.runOriginalSystem(count),
        this.runGemHunterSystem(count)
      ]);
      
      // Store results for comparison
      await this.storeComparisonResults(originalResults, gemHunterResults);
      
      // Return comparison summary
      return this.generateComparisonReport(originalResults, gemHunterResults);
      
    } catch (error) {
      console.error('❌ Comparison error:', error);
      return {
        success: false,
        error: error.message,
        originalSystem: { status: 'error' },
        gemHunterSystem: { status: 'error' }
      };
    }
  }

  /**
   * Run original system (unchanged)
   */
  async runOriginalSystem(count) {
    console.log('🔧 Running Original Universal Premium Generator...');
    
    try {
      const startTime = Date.now();
      const domains = await this.originalGenerator.generatePremiumDomains();
      const duration = Date.now() - startTime;
      
      console.log(`✅ Original system: ${domains.length} domains in ${duration}ms`);
      
      return {
        system: 'Original Universal Premium Generator',
        domains: domains,
        count: domains.length,
        duration: duration,
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ Original system error:', error);
      return {
        system: 'Original Universal Premium Generator',
        domains: [],
        count: 0,
        duration: 0,
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Run new Gem Hunter system
   */
  async runGemHunterSystem(count) {
    console.log('💎 Running Domain Gem Hunter...');
    
    try {
      const startTime = Date.now();
      const gemResults = await this.gemHunter.generateGemDomains(count);
      const duration = Date.now() - startTime;
      
      console.log(`✅ Gem Hunter: ${gemResults.length} validated gems in ${duration}ms`);
      
      return {
        system: 'Domain Gem Hunter',
        domains: gemResults,
        count: gemResults.length,
        duration: duration,
        status: 'success',
        timestamp: new Date().toISOString(),
        averageGemScore: this.calculateAverageScore(gemResults),
        highValueGems: this.countHighValueGems(gemResults)
      };
      
    } catch (error) {
      console.error('❌ Gem Hunter error:', error);
      return {
        system: 'Domain Gem Hunter',
        domains: [],
        count: 0,
        duration: 0,
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Store comparison results in Redis
   */
  async storeComparisonResults(originalResults, gemHunterResults) {
    try {
      const comparisonData = {
        timestamp: new Date().toISOString(),
        original: originalResults,
        gemHunter: gemHunterResults,
        comparison: {
          originalCount: originalResults.count,
          gemHunterCount: gemHunterResults.count,
          originalDuration: originalResults.duration,
          gemHunterDuration: gemHunterResults.duration,
          gemHunterAdvantage: gemHunterResults.count > originalResults.count
        }
      };
      
      await redisService.storeDomains(this.comparisonKey, comparisonData, 3600); // 1 hour TTL
      console.log('📊 Comparison results stored in Redis');
      
    } catch (error) {
      console.error('❌ Error storing comparison results:', error);
    }
  }

  /**
   * Generate comparison report
   */
  generateComparisonReport(originalResults, gemHunterResults) {
    const report = {
      success: true,
      timestamp: new Date().toISOString(),
      comparison: {
        original: {
          system: originalResults.system,
          status: originalResults.status,
          domainCount: originalResults.count,
          duration: originalResults.duration,
          error: originalResults.error || null
        },
        gemHunter: {
          system: gemHunterResults.system,
          status: gemHunterResults.status,
          domainCount: gemHunterResults.count,
          duration: gemHunterResults.duration,
          averageGemScore: gemHunterResults.averageGemScore || 0,
          highValueGems: gemHunterResults.highValueGems || 0,
          error: gemHunterResults.error || null
        },
        analysis: {
          gemHunterAdvantage: gemHunterResults.count > originalResults.count,
          performanceDifference: gemHunterResults.duration - originalResults.duration,
          qualityMetrics: {
            gemHunterHasScoring: gemHunterResults.averageGemScore > 0,
            gemHunterHasHighValue: gemHunterResults.highValueGems > 0
          }
        }
      }
    };
    
    console.log('📊 Comparison Report Generated');
    console.log(`Original: ${originalResults.count} domains, ${originalResults.duration}ms`);
    console.log(`Gem Hunter: ${gemHunterResults.count} domains, ${gemHunterResults.duration}ms`);
    
    if (gemHunterResults.averageGemScore) {
      console.log(`Gem Hunter Average Score: ${gemHunterResults.averageGemScore.toFixed(2)}`);
    }
    
    return report;
  }

  /**
   * Calculate average gem score
   */
  calculateAverageScore(gemResults) {
    if (!gemResults || gemResults.length === 0) return 0;
    
    const totalScore = gemResults.reduce((sum, gem) => sum + (gem.gemScore || 0), 0);
    return totalScore / gemResults.length;
  }

  /**
   * Count high-value gems (score > 80)
   */
  countHighValueGems(gemResults) {
    if (!gemResults || gemResults.length === 0) return 0;
    
    return gemResults.filter(gem => (gem.gemScore || 0) > 80).length;
  }

  /**
   * Get comparison history
   */
  async getComparisonHistory() {
    try {
      const history = await redisService.getDomains(this.comparisonKey);
      return history || null;
    } catch (error) {
      console.error('❌ Error getting comparison history:', error);
      return null;
    }
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      comparison: 'Active',
      systems: {
        original: 'Universal Premium Generator (unchanged)',
        gemHunter: 'Domain Gem Hunter (experimental)'
      },
      features: [
        'Parallel execution',
        'Side-by-side comparison',
        'Zero risk to original system',
        'Gradual adoption ready'
      ]
    };
  }
}

export default DomainComparison;

