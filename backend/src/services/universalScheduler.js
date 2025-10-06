import UniversalPremiumGenerator from './universalPremiumGenerator.js';
import EnhancedAvailabilityService from './enhancedAvailabilityService.js';
import HumbleworthClient from './humbleworthClient.js';
import redisService from './redisService.js';
import domainManager from './domainManager.js';

class UniversalScheduler {
  constructor() {
    this.generator = new UniversalPremiumGenerator();
    this.availabilityService = new EnhancedAvailabilityService();
    this.valuationClient = new HumbleworthClient();
    this.redis = redisService;
  }

  async generateHourlyBatch() {
    try {
      // Initialize Redis service
      await this.redis.initialize();

      console.log('🔄 Generating universal premium domains (150 domains)...');
      
      // Single call for 150 universal domains
      const allDomains = await this.generator.generatePremiumDomains();
      
      // Analyze category distribution
      this.generator.analyzeCategoryDistribution(allDomains);
      
      // Add .com suffix for availability check
      const domainsWithSuffix = allDomains.map(domain => `${domain}.com`);
      
      console.log(`🔍 Checking availability for ${domainsWithSuffix.length} domains with Dynadot batching (5 per batch)...`);
      
      // Use Dynadot service with 5 domains per batch (account limit)
      const availabilityResults = await this.availabilityService.checkBulkAvailability(domainsWithSuffix);
      
      // Filter available domains and preserve category information
      const availableDomains = availabilityResults
        .filter(result => result.available)
        .map(result => {
          // Ensure domain is stored without .com suffix for consistency
          const domain = result.domain.replace('.com', '');
          // Find the original domain with its category
          const originalDomain = allDomains.find(d => d === domain);
          return {
            domain: domain,
            category: this.getCategoryForDomain(domain, allDomains)
          };
        });
      
      console.log(`🎯 Universal Results: ${availableDomains.length}/150 available`);
      
      if (availableDomains.length === 0) {
        console.log('⚠️ No available domains found in this batch');
        return [];
      }
      
      // Get valuations for available domains
      console.log('💰 Getting valuations for available domains...');
      const domainsWithValuations = await this.getValuationsForDomains(availableDomains.slice(0, 30));
      
      // Store in Redis
      await this.storeDomainsInRedis(domainsWithValuations);
      
      console.log(`✅ Successfully processed ${domainsWithValuations.length} universal premium domains`);
      return domainsWithValuations;
      
    } catch (error) {
      console.error('❌ Universal generation failed:', error.message);
      return [];
    }
  }

  getCategoryForDomain(domain, allDomains) {
    // This is a simple mapping - in a real implementation, you'd track categories properly
    const techKeywords = ['tech', 'data', 'code', 'soft', 'web', 'cyber', 'intelli', 'nexa', 'link', 'byte', 'wave'];
    const ecommerceKeywords = ['shop', 'sell', 'style', 'buy', 'fash', 'trend', 'glam', 'lux', 'chic', 'brand', 'mode', 'vogue'];
    const entertainmentKeywords = ['star', 'fun', 'play', 'buzz', 'game', 'show', 'celeb', 'film', 'vibe', 'joy', 'party'];
    
    if (techKeywords.some(keyword => domain.toLowerCase().includes(keyword))) return 'tech';
    if (ecommerceKeywords.some(keyword => domain.toLowerCase().includes(keyword))) return 'ecommerce';
    if (entertainmentKeywords.some(keyword => domain.toLowerCase().includes(keyword))) return 'entertainment';
    
    return 'lifestyle'; // default category
  }

  async getValuationsForDomains(domains) {
    const domainsWithValuations = [];
    
    for (const domainData of domains) {
      const domain = typeof domainData === 'string' ? domainData : domainData.domain;
      try {
        const valuation = await this.valuationClient.getValue(domain);
        
        // Ensure domain is stored without .com suffix for consistency
        const cleanDomain = domain.replace('.com', '');
        
        domainsWithValuations.push({
          domain: cleanDomain,
          category: domainData.category || 'lifestyle',
          estimatedValue: valuation.auctionValue || valuation.value_usd || Math.max(valuation.marketplaceValue || 0, valuation.brokerageValue || 0),
          auctionValue: valuation.auctionValue || 0,
          marketplaceValue: valuation.marketplaceValue || 0,
          brokerageValue: valuation.brokerageValue || 0,
          confidence: valuation.confidence || 40,
          source: valuation.source || 'fallback',
          available: true,
          price: 'Available',
          lastUpdated: new Date().toISOString(),
          // Add required fields for frontend
          id: Math.random().toString(36).substr(2, 9),
          status: 'available'
        });
      } catch (error) {
        console.log(`❌ Valuation failed for ${domain}: ${error.message}`);
        // Add domain with fallback valuation
        const cleanDomain = domain.replace('.com', '');
        
        domainsWithValuations.push({
          domain: cleanDomain,
          category: domainData.category || 'lifestyle',
          estimatedValue: 500,
          auctionValue: 500,
          marketplaceValue: 2500,
          brokerageValue: 5000,
          confidence: 40,
          source: 'fallback',
          available: true,
          price: 'Available',
          lastUpdated: new Date().toISOString(),
          // Add required fields for frontend
          id: Math.random().toString(36).substr(2, 9),
          status: 'available'
        });
      }
    }
    
    return domainsWithValuations;
  }

  async storeDomainsInRedis(domains) {
    try {
      console.log(`💾 Adding ${domains.length} new available domains to existing ones...`);
      console.log(`💾 Sample domain structure:`, domains[0]);
      
      // Use domainManager to add domains (implements your logic)
      const allDomains = await domainManager.addAvailableDomains(domains);
      console.log(`💾 Successfully managed ${allDomains.length} total available domains`);
      
      return allDomains;
    } catch (error) {
      console.error('Error storing domains in Redis:', error);
      throw error; // Don't use fallback - fail if Redis doesn't work
    }
  }


  async getCachedDomains() {
    try {
      // Use domainManager to get display domains (max 30, most recent first)
      const displayDomains = await domainManager.getDisplayDomains();
      console.log(`📦 Retrieved ${displayDomains.length} domains for display`);
      return displayDomains;
    } catch (error) {
      console.error('Error retrieving cached domains:', error);
      return [];
    }
  }


  async start() {
    console.log('🚀 Starting Universal Scheduler...');
    // Initialize Redis service
    await this.redis.initialize();
    
    // Start the hourly generation cycle
    console.log('⏰ Starting hourly domain generation cycle...');
    await this.generateHourlyBatch();
    
    // Set up interval for hourly generation
    setInterval(async () => {
      console.log('⏰ Cron triggered - starting domain generation cycle');
      await this.generateHourlyBatch();
    }, 60 * 60 * 1000); // 1 hour
    
    console.log('✅ Universal Scheduler started successfully');
  }

  async closeRedis() {
    // Redis service is shared, don't close it here
    console.log('🔌 Universal scheduler closed (Redis service remains active)');
  }
}

export default UniversalScheduler;
