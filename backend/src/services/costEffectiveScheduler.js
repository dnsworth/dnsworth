// Cost-Effective Domain Generation Scheduler
// Reduces OpenAI usage by 80% while maintaining 150 domains

import UniversalDomainGenerator from './universalDomainGenerator.js';
import EnhancedAvailabilityService from './enhancedAvailabilityService.js';
import HumbleworthClient from './humbleworthClient.js';
import redisService from './redisService.js';
import domainManager from './domainManager.js';

class CostEffectiveScheduler {
  constructor() {
    this.generator = new UniversalDomainGenerator();
    this.availabilityService = new EnhancedAvailabilityService();
    this.valuationClient = new HumbleworthClient();
    this.redis = redisService;
    
    // Cost-effective generation strategy
    this.generationStrategy = {
      aiGenerated: 20,        // Only 20 AI-generated domains (was 150)
      patternBased: 80,       // 80 pattern-based domains (free)
      cachedReuse: 50         // 50 domains from cache (free)
    };
  }

  // Pattern-based domain generation (no AI costs)
  generatePatternBasedDomains(count = 80) {
    const patterns = [
      // Tech + Industry patterns
      'tech', 'ai', 'app', 'cloud', 'data', 'smart', 'digital', 'online', 'web', 'net',
      'fin', 'health', 'edu', 'eco', 'auto', 'food', 'travel', 'shop', 'game', 'news',
      
      // Geographic patterns
      'nyc', 'la', 'sf', 'chi', 'miami', 'boston', 'seattle', 'denver', 'austin', 'dallas',
      'london', 'paris', 'tokyo', 'sydney', 'toronto', 'berlin', 'madrid', 'rome', 'amsterdam',
      
      // Action/Verb patterns
      'go', 'get', 'make', 'build', 'create', 'design', 'develop', 'launch', 'start', 'grow',
      'learn', 'teach', 'help', 'solve', 'find', 'discover', 'explore', 'connect', 'share',
      
      // Brandable patterns
      'ly', 'fy', 'io', 'co', 'me', 'us', 'pro', 'hub', 'lab', 'studio', 'works', 'group'
    ];

    const domains = [];
    
    for (let i = 0; i < count; i++) {
      // Random pattern combination
      const pattern1 = patterns[Math.floor(Math.random() * patterns.length)];
      const pattern2 = patterns[Math.floor(Math.random() * patterns.length)];
      
      // Create domain variations
      const variations = [
        `${pattern1}${pattern2}`,
        `${pattern1}${pattern2}ly`,
        `${pattern1}${pattern2}fy`,
        `${pattern1}${pattern2}io`,
        `${pattern1}${pattern2}co`,
        `${pattern1}${pattern2}hub`,
        `${pattern1}${pattern2}lab`,
        `${pattern1}${pattern2}pro`
      ];
      
      // Pick random variation
      const domain = variations[Math.floor(Math.random() * variations.length)];
      
      // Ensure reasonable length (4-12 characters)
      if (domain.length >= 4 && domain.length <= 12) {
        domains.push(domain);
      }
    }
    
    return domains.slice(0, count);
  }

  // Get cached domains from previous days
  async getCachedDomains(count = 50) {
    try {
      const cachedDomains = await this.redis.get('domains:cached');
      if (cachedDomains && Array.isArray(cachedDomains)) {
        // Shuffle and return random selection
        const shuffled = cachedDomains.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }
    } catch (error) {
      console.log('⚠️ No cached domains available:', error.message);
    }
    return [];
  }

  // Cache current domains for future reuse
  async cacheDomains(domains) {
    try {
      const existingCache = await this.redis.get('domains:cached') || [];
      const newCache = [...existingCache, ...domains].slice(-200); // Keep last 200
      await this.redis.set('domains:cached', newCache);
      console.log(`💾 Cached ${domains.length} domains for future reuse`);
    } catch (error) {
      console.log('⚠️ Failed to cache domains:', error.message);
    }
  }

  async generateCostEffectiveBatch() {
    try {
      console.log('💰 Generating cost-effective domain batch (150 domains)...');
      
      // Initialize Redis
      await this.redis.initialize();

      const allDomains = [];
      
      // 1. Generate AI domains (expensive but high quality)
      console.log(`🤖 Generating ${this.generationStrategy.aiGenerated} AI domains...`);
      try {
        const aiDomains = await this.generator.generateUniversalDomains();
        allDomains.push(...aiDomains.slice(0, this.generationStrategy.aiGenerated));
        console.log(`✅ Generated ${aiDomains.slice(0, this.generationStrategy.aiGenerated).length} AI domains`);
      } catch (error) {
        console.log('⚠️ AI generation failed, using more patterns:', error.message);
      }
      
      // 2. Generate pattern-based domains (free)
      console.log(`🔧 Generating ${this.generationStrategy.patternBased} pattern-based domains...`);
      const patternDomains = this.generatePatternBasedDomains(this.generationStrategy.patternBased);
      allDomains.push(...patternDomains);
      console.log(`✅ Generated ${patternDomains.length} pattern-based domains`);
      
      // 3. Get cached domains (free)
      console.log(`💾 Retrieving ${this.generationStrategy.cachedReuse} cached domains...`);
      const cachedDomains = await this.getCachedDomains(this.generationStrategy.cachedReuse);
      allDomains.push(...cachedDomains);
      console.log(`✅ Retrieved ${cachedDomains.length} cached domains`);
      
      // Ensure we have exactly 150 domains
      const finalDomains = allDomains.slice(0, 150);
      console.log(`📊 Total domains prepared: ${finalDomains.length}`);
      
      // Add .com suffix for availability check
      const domainsWithSuffix = finalDomains.map(domain => `${domain}.com`);
      
      console.log(`🔍 Checking availability for ${domainsWithSuffix.length} domains...`);
      
      // Check availability with Dynadot
      const availabilityResults = await this.availabilityService.checkBulkAvailability(domainsWithSuffix);
      
      // Filter available domains
      const availableDomains = availabilityResults
        .filter(result => result.available)
        .map(result => {
          const domain = result.domain.replace('.com', '');
          return {
            domain: domain,
            category: this.getCategoryForDomain(domain, finalDomains)
          };
        });
      
      console.log(`🎯 Found ${availableDomains.length} available domains`);
      
      if (availableDomains.length === 0) {
        console.log('⚠️ No available domains found in this batch');
        return [];
      }
      
      // Get valuations for available domains
      console.log(`💰 Getting valuations for ${availableDomains.length} domains...`);
      const domainsWithValuations = [];
      
      for (const domainData of availableDomains) {
        try {
          const valuation = await this.valuationClient.getValue(domainData.domain);
          
          // Only include domains with auction value >= $50
          if (valuation.auctionValue >= 50) {
            domainsWithValuations.push({
              domain: domainData.domain,
              category: domainData.category,
              valuation: {
                estimatedValue: valuation.auctionValue !== undefined ? valuation.auctionValue : (valuation.value_usd || 0),
                auctionValue: valuation.auctionValue || 0,
                marketplaceValue: valuation.marketplaceValue || 0,
                brokerageValue: valuation.brokerageValue || 0
              },
              confidence: valuation.confidence || 50,
              source: valuation.source || 'replicate',
              lastUpdated: new Date().toISOString()
            });
          }
        } catch (error) {
          console.log(`⚠️ Valuation failed for ${domainData.domain}:`, error.message);
        }
      }
      
      // Store domains in Redis
      if (domainsWithValuations.length > 0) {
        await domainManager.addAvailableDomains(domainsWithValuations);
        
        // Cache some domains for future reuse
        const domainsToCache = domainsWithValuations
          .slice(0, 20)
          .map(d => d.domain);
        await this.cacheDomains(domainsToCache);
      }
      
      console.log(`✅ Successfully processed ${domainsWithValuations.length} cost-effective domains`);
      console.log(`💰 Cost breakdown: ${this.generationStrategy.aiGenerated} AI + ${this.generationStrategy.patternBased} patterns + ${this.generationStrategy.cachedReuse} cached`);
      
      return domainsWithValuations;
      
    } catch (error) {
      console.error('❌ Cost-effective generation failed:', error.message);
      return [];
    }
  }

  getCategoryForDomain(domain, allDomains) {
    // Simple category detection based on domain patterns
    if (domain.includes('tech') || domain.includes('ai') || domain.includes('app')) return 'technology';
    if (domain.includes('fin') || domain.includes('bank') || domain.includes('money')) return 'finance';
    if (domain.includes('health') || domain.includes('med') || domain.includes('care')) return 'healthcare';
    if (domain.includes('edu') || domain.includes('learn') || domain.includes('teach')) return 'education';
    if (domain.includes('eco') || domain.includes('green') || domain.includes('solar')) return 'sustainability';
    if (domain.includes('shop') || domain.includes('store') || domain.includes('buy')) return 'ecommerce';
    if (domain.includes('game') || domain.includes('play') || domain.includes('fun')) return 'entertainment';
    if (domain.includes('news') || domain.includes('media') || domain.includes('blog')) return 'media';
    
    return 'business';
  }

  async start() {
    console.log('🚀 Starting Cost-Effective Scheduler...');
    
    // Generate initial batch
    await this.generateCostEffectiveBatch();
    
    // Set up hourly generation (reduced frequency)
    setInterval(async () => {
      console.log('⏰ Hourly cost-effective generation cycle...');
      await this.generateCostEffectiveBatch();
    }, 60 * 60 * 1000); // Every hour
    
    console.log('✅ Cost-Effective Scheduler started successfully');
  }
}

export default CostEffectiveScheduler;
