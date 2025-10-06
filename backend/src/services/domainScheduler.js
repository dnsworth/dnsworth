import cron from 'node-cron';
import dotenv from 'dotenv';
import AIDomainGenerator from './aiDomainGenerator.js';
import EnhancedDynadotService from './enhancedAvailabilityService.js';
import DomainValuationEngine from './valuationEngine.js';
import HumbleworthClient from './humbleworthClient.js';
import TrendService from './trendService.js';
import redisService from './redisService.js';

// Ensure environment variables are loaded
dotenv.config();

class DomainScheduler {
  constructor() {
    this.generator = new AIDomainGenerator();
    this.dynadot = new EnhancedDynadotService();
    this.humbleworth = new HumbleworthClient();
    this.valuationEngine = new DomainValuationEngine(this.humbleworth);
    this.trendService = new TrendService();
    this.redis = redisService;
    
    this.isRunning = false;
    this.lastGeneration = null;
  }

  /**
   * Start the scheduler
   */
  start() {
    console.log('🚀 Starting Domain Scheduler...');
    
    // Run every hour
    cron.schedule('0 * * * *', () => {
      console.log('⏰ Cron triggered - starting domain generation cycle');
      this.generateFreshBatch();
    });
    
    // Large batch generation remains disabled
    
    // Also run immediately on startup
    setTimeout(() => {
      this.generateFreshBatch();
    }, 5000); // Wait 5 seconds for Redis connection
  }

  /**
   * Generate a fresh batch of domains
   */
  async generateFreshBatch() {
    if (this.isRunning) {
      console.log('⏳ Generation already running, skipping...');
      return;
    }
    
    this.isRunning = true;
    
    try {
      console.log('🔄 Starting fresh domain generation cycle...');
      
      // Step 1: Generate new domains with AI
      const generatedDomains = await this.generator.generateDomainsBatch();
      console.log(`✅ Generated ${generatedDomains.length} AI domains`);
      
      let domainsToProcess = generatedDomains;
      
      // Step 2: Check availability (but don't fail if it doesn't work)
      try {
        const availableDomains = await this.dynadot.checkBulkAvailability(generatedDomains);
        console.log(`✅ Found ${availableDomains.length} available domains`);
        
        if (availableDomains.length > 0) {
          domainsToProcess = availableDomains;
        } else {
          console.log('⚠️ No available domains found - returning empty result');
          domainsToProcess = [];
        }
      } catch (error) {
        console.log('⚠️ Availability check failed - returning empty result:', error.message);
        domainsToProcess = [];
      }
      
      // Step 3: Score and rank domains
      const scoredDomains = await this.scoreDomains(domainsToProcess);
      console.log(`✅ Scored ${scoredDomains.length} domains`);
      
      // Step 4: Store in Redis (only if we have domains)
      if (scoredDomains.length > 0) {
        await this.storeNewBatch(scoredDomains.slice(0, 100)); // Keep top 100
      } else {
        console.log('📦 No domains to store - system will show empty state');
      }
      
      this.lastGeneration = new Date();
      console.log('🎉 Domain generation cycle completed successfully');
      
    } catch (error) {
      console.error('❌ Generation cycle failed:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Generate a large batch of domains (every 2 hours)
   */
  async generateLargeBatch() {
    if (this.isRunning) {
      console.log('⏳ Generation already running, skipping large batch...');
      return;
    }
    
    this.isRunning = true;
    
    try {
      console.log('🔄 Starting large domain generation cycle...');
      
      // Generate multiple batches
      const allDomains = new Set();
      
      for (let i = 0; i < 3; i++) {
        const batch = await this.generator.generateDomainsBatch();
        batch.forEach(domain => allDomains.add(domain));
        
        // Delay between batches
        await this.delay(5000);
      }
      
      const generatedDomains = Array.from(allDomains);
      console.log(`✅ Generated ${generatedDomains.length} total AI domains`);
      
      // Check availability
      const availableDomains = await this.dynadot.checkBulkAvailability(generatedDomains);
      console.log(`✅ Found ${availableDomains.length} available domains`);
      
      // Score and store
      const scoredDomains = this.scoreDomains(availableDomains);
      await this.storeNewBatch(scoredDomains.slice(0, 200)); // Keep top 200
      
      this.lastGeneration = new Date();
      console.log('🎉 Large domain generation cycle completed');
      
    } catch (error) {
      console.error('❌ Large generation cycle failed:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Score domains using advanced valuation engine
   */
  async scoreDomains(domains) {
    console.log(`🎯 Scoring ${domains.length} domains with advanced valuation...`);
    
    const scoredDomains = await Promise.all(domains.map(async (domain) => {
      try {
        // Normalize domain input - handle both string and object formats
        let domainName = typeof domain === 'string' ? domain : (domain.domain || domain);
        
        // Remove .com if it exists to avoid double .com issues
        if (domainName && domainName.endsWith('.com')) {
          domainName = domainName.replace(/\.com$/, '');
        }
        console.log(`🔍 Scoring domain: ${domainName}`);
        
        // Get comprehensive valuation
        const valuation = await this.valuationEngine.estimateDomainValue(domainName);
        console.log(`💰 Valuation for ${domainName}:`, valuation);
        
        // Get trend data
        const trendScore = this.trendService.getTrendScore(domainName);
        const trendCategories = this.trendService.getTrendCategories(domainName);
        
        // Calculate final score
        const finalScore = this.calculateFinalScore(valuation, trendScore, domain);
        
        // Ensure domain has .com suffix but avoid double .com
        let finalDomain = domainName;
        if (!finalDomain.endsWith('.com')) {
          finalDomain = `${finalDomain}.com`;
        }
        
        const scoredDomain = {
          domain: finalDomain,
          score: finalScore,
          estimatedValue: valuation.estimatedValue,
          confidence: valuation.confidence,
          trendScore,
          trendCategories,
          description: this.generateDescription(domainName),
          category: this.categorizeDomain(domainName),
          icon: this.getCategoryIcon(this.categorizeDomain(domainName)),
          tags: this.generateTags(domainName),
          generated_at: new Date().toISOString(),
          isAIGenerated: true,
          valuation: valuation,
          available: true  // Mark as available by default
        };
        
        console.log(`✅ Scored domain: ${domainName} with score ${finalScore}`);
        return scoredDomain;
      } catch (error) {
        console.error(`❌ Error scoring domain ${domainName}:`, error);
        // Ensure domain has .com suffix but avoid double .com
        let finalDomain = domainName;
        if (finalDomain && !finalDomain.endsWith('.com')) {
          finalDomain = `${finalDomain}.com`;
        }
        
        return {
          domain: finalDomain,
          score: 50,
          estimatedValue: 500,
          confidence: 50,
          trendScore: 0,
          trendCategories: [],
          description: this.generateDescription(domainName),
          category: this.categorizeDomain(domainName),
          icon: this.getCategoryIcon(this.categorizeDomain(domainName)),
          tags: this.generateTags(domainName),
          generated_at: new Date().toISOString(),
          isAIGenerated: true,
          available: true  // Mark as available by default
        };
      }
    }));
    
    console.log(`✅ Successfully scored ${scoredDomains.length} domains`);
    return scoredDomains.sort((a, b) => b.score - a.score);
  }

  /**
   * Calculate final score combining valuation and trends
   */
  calculateFinalScore(valuation, trendScore, domain) {
    const baseScore = valuation.breakdown.score || 50;
    const trendBonus = trendScore * 0.1; // 10% bonus for trending
    const confidenceMultiplier = valuation.confidence / 100;
    
    const finalScore = (baseScore + trendBonus) * confidenceMultiplier;
    return Math.min(Math.max(finalScore, 0), 200); // Cap between 0-200
  }

  /**
   * Calculate comprehensive domain score
   */
  calculateDomainScore(domain) {
    let score = 100;
    
    // Length scoring (6-12 chars ideal)
    if (domain.length >= 6 && domain.length <= 8) score += 30;
    else if (domain.length >= 9 && domain.length <= 12) score += 20;
    else if (domain.length > 12) score -= 20;
    else if (domain.length < 4) score -= 30;
    
    // Memorability scoring
    if (this.isAlliteration(domain)) score += 25;
    if (this.hasRepeatingPatterns(domain)) score += 15;
    if (this.endsWithVowel(domain)) score += 10;
    
    // Brandability
    if (this.soundsTechy(domain)) score += 20;
    if (this.isPronounceable(domain)) score += 25;
    if (this.hasGoodFlow(domain)) score += 15;
    if (this.isUnique(domain)) score += 10;
    
    // Commercial potential
    if (this.hasCommercialPotential(domain)) score += 15;
    
    return Math.max(0, Math.min(200, score));
  }

  // Helper methods for scoring
  isAlliteration(domain) {
    return /^(\w)\1*/i.test(domain);
  }
  
  hasRepeatingPatterns(domain) {
    return /(.)\1{1,}/.test(domain);
  }
  
  endsWithVowel(domain) {
    return /[aeiou]$/i.test(domain);
  }
  
  soundsTechy(domain) {
    const techWords = ['tech', 'cloud', 'data', 'code', 'app', 'api', 'ai', 'io', 'lab', 'soft', 'digital', 'cyber', 'quantum', 'neural', 'smart', 'auto'];
    return techWords.some(word => domain.includes(word));
  }
  
  isPronounceable(domain) {
    const vowelCount = (domain.match(/[aeiou]/gi) || []).length;
    return vowelCount >= domain.length * 0.3;
  }
  
  hasGoodFlow(domain) {
    const pattern = /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*$/i;
    return pattern.test(domain);
  }
  
  isUnique(domain) {
    const common = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who'];
    return !common.some(word => domain.includes(word));
  }
  
  hasCommercialPotential(domain) {
    const commercialWords = ['buy', 'sell', 'shop', 'store', 'market', 'trade', 'biz', 'pro', 'corp', 'inc', 'ltd', 'group', 'global', 'world', 'international'];
    return commercialWords.some(word => domain.includes(word));
  }

  /**
   * Store new batch of domains in Redis
   */
  async storeNewBatch(domains) {
    try {
      // Clear old available domains
      await this.redis.clearDomains('domains:available');
      
      // Store new batch
      if (domains.length > 0) {
        await this.redis.storeDomains('domains:available', domains, 3600); // 1 hour TTL
        console.log(`💾 Stored ${domains.length} domains in Redis`);
      }
      
      // Update last generation time
      await this.redis.storeCache('last_generation_time', new Date().toISOString(), 3600);
      
    } catch (error) {
      console.error('Error storing domains in Redis:', error);
    }
  }

  /**
   * Get available domains from cache
   */
  async getAvailableDomains(limit = 50) {
    try {
      console.log('🔍 Checking Redis for cached domains...');
      const domainData = await this.redis.getDomainData('domains:available');
      const lastGeneration = await this.redis.getCache('last_generation_time');
      
      console.log(`🔍 Redis cached value: ${domainData ? 'found' : 'not found'}`);
      console.log(`🔍 Last generation time: ${lastGeneration || 'not found'}`);
      
      if (domainData && domainData.domains) {
        const domains = domainData.domains;
        console.log(`📦 Found ${domains.length} cached domains in Redis`);
        
        if (lastGeneration) {
          const lastGenTime = new Date(lastGeneration);
          const now = new Date();
          const timeDiff = now - lastGenTime;
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
          
          console.log(`⏰ Domains generated ${Math.round(timeDiff / 60000)} minutes ago`);
          
          // Return domains even if they're older than 1 hour, but log it
          if (timeDiff >= oneHour) {
            console.log(`⚠️ Cached domains are older than 1 hour, but returning them anyway`);
          }
        }
        
        console.log(`📦 Returning ${Math.min(domains.length, limit)} cached domains`);
        return domains.slice(0, limit);
      } else {
        console.log('❌ No cached domains found in Redis');
      }
      return [];
    } catch (error) {
      console.error('Error getting domains from Redis:', error);
      return [];
    }
  }

  /**
   * Generate description for domain
   */
  generateDescription(domain) {
    const category = this.categorizeDomain(domain);
    // Remove .com if it exists to get clean domain name
    const domainName = domain.replace(/\.com$/, '').split('.')[0];
    switch (category) {
      case 'Technology': return `Cutting-edge ${domainName} platform for innovation`;
      case 'Business': return `Professional ${domainName} solutions for enterprise clients`;
      case 'Creative': return `Creative ${domainName} services for modern brands`;
      case 'Health & Wellness': return `Health and wellness ${domainName} platform`;
      case 'E-commerce': return `E-commerce ${domainName} marketplace platform`;
      default: return `Modern ${domainName} platform with great potential`;
    }
  }

  /**
   * Categorize domain based on content
   */
  categorizeDomain(domain) {
    // Remove .com if it exists to get clean domain name for categorization
    const cleanDomain = domain.replace(/\.com$/, '');
    const domainLower = cleanDomain.toLowerCase();
    if (domainLower.includes('ai') || domainLower.includes('tech') || domainLower.includes('data') || domainLower.includes('cloud')) return 'Technology';
    if (domainLower.includes('biz') || domainLower.includes('pro') || domainLower.includes('corporate') || domainLower.includes('solutions')) return 'Business';
    if (domainLower.includes('creative') || domainLower.includes('design') || domainLower.includes('brand') || domainLower.includes('studio')) return 'Creative';
    if (domainLower.includes('health') || domainLower.includes('wellness') || domainLower.includes('fitness')) return 'Health & Wellness';
    if (domainLower.includes('shop') || domainLower.includes('market') || domainLower.includes('commerce')) return 'E-commerce';
    return 'General';
  }

  /**
   * Estimate value for domain using HumbleWorth API
   */
  async estimateValue(domain) {
    try {
      const response = await fetch(`${process.env.HUMBLEWORTH_API_URL}/api/value`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: `${domain}.com` })
      });

      if (response.ok) {
        const data = await response.json();
        return data.estimatedValue || data.value || 500;
      }
    } catch (error) {
      console.log('HumbleWorth API not available, using fallback valuation');
    }
    
    // Fallback to basic estimation if API fails
    let baseValue = 500;
    
    // Length scoring
    if (domain.length < 6) baseValue += 1000;
    else if (domain.length >= 6 && domain.length <= 8) baseValue += 500;
    else if (domain.length >= 9 && domain.length <= 12) baseValue += 200;
    
    // Keyword scoring
    const domainLower = domain.toLowerCase();
    if (domainLower.includes('ai') || domainLower.includes('tech')) baseValue += 800;
    if (domainLower.includes('crypto') || domainLower.includes('blockchain')) baseValue += 600;
    if (domainLower.includes('health') || domainLower.includes('medical')) baseValue += 400;
    if (domainLower.includes('finance') || domainLower.includes('money')) baseValue += 300;
    
    // Brandability scoring
    if (this.isPronounceable(domain)) baseValue += 200;
    if (this.isAlliteration(domain)) baseValue += 300;
    
    return Math.floor(baseValue);
  }

  /**
   * Get category icon
   */
  getCategoryIcon(category) {
    switch (category) {
      case 'Technology': return '🔬';
      case 'Business': return '🏢';
      case 'Creative': return '🎭';
      case 'Health & Wellness': return '🏥';
      case 'E-commerce': return '🛍️';
      case 'Finance': return '💎';
      case 'Environment': return '🌿';
      case 'Education': return '🎓';
      case 'Entertainment': return '🎪';
      case 'Sports': return '⚽';
      case 'Food': return '🍽️';
      case 'Travel': return '✈️';
      case 'Real Estate': return '🏘️';
      case 'Automotive': return '🚗';
      case 'Fashion': return '👗';
      case 'Music': return '🎵';
      case 'Gaming': return '🎮';
      case 'Photography': return '📸';
      case 'Fitness': return '💪';
      case 'Beauty': return '💄';
      default: return '🌟';
    }
  }

  /**
   * Generate tags for domain
   */
  generateTags(domain) {
    // Return empty array - no tags wanted
    return [];
  }

  /**
   * Check if domain is pronounceable
   */
  isPronounceable(domain) {
    const vowelCount = (domain.match(/[aeiou]/gi) || []).length;
    return vowelCount >= domain.length * 0.3;
  }

  /**
   * Check if domain has alliteration
   */
  isAlliteration(domain) {
    return /^(\w)\1*/i.test(domain);
  }

  /**
   * Get generation status
   */
  async getStatus() {
    try {
      const lastGen = await this.redis.getCache('last_generation_time');
      const isRunning = this.isRunning;
      const domainData = await this.redis.getDomainData('domains:available');
      
      return {
        isRunning,
        lastGeneration: lastGen ? new Date(lastGen) : null,
        domainCount: domainData ? domainData.domains.length : 0,
        redisStatus: this.redis.getSystemStatus()
      };
    } catch (error) {
      console.error('Error getting status:', error);
      return {
        isRunning: false,
        lastGeneration: null,
        domainCount: 0,
        redisStatus: this.redis.getSystemStatus()
      };
    }
  }

  /**
   * Manual refresh trigger
   */
  async manualRefresh() {
    console.log('🔄 Manual refresh triggered');
    await this.generateFreshBatch();
  }

  /**
   * Delay utility
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  /**
   * Stop the scheduler
   */
  async stop() {
    console.log('🛑 Stopping Domain Scheduler...');
    await this.generator.close();
    await this.dynadot.close();
  }
}

export default DomainScheduler;
