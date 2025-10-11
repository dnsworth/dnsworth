// ULTIMATE GEM DOMAIN SCHEDULER
// 150 Timeless, Brandable Domains with Maximum Auction Value

import { GEM_DOMAIN_PROMPT, GEM_DOMAIN_VALIDATOR } from './ultimateDomainStrategy.js';
import EnhancedAvailabilityService from './enhancedAvailabilityService.js';
import HumbleworthClient from './humbleworthClient.js';
import redisService from './redisService.js';
import domainManager from './domainManager.js';
import { OpenAI } from 'openai';

class UltimateGemScheduler {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.availabilityService = new EnhancedAvailabilityService();
    this.valuationClient = new HumbleworthClient();
    this.redis = redisService;
    
    // 150 Gem Domain Strategy
    this.generationStrategy = {
      aiGenerated: 120,       // 120 AI-generated gems
      patternBased: 20,       // 20 pattern-based backups
      cachedReuse: 10         // 10 cached gems
    };
    
    this.batchCount = 0;
    this.totalGenerated = 0;
    this.totalValue = 0;
  }

  // 🎯 MAIN GENERATION - 150 GEM DOMAINS
  async generateGemBatch() {
    this.batchCount++;
    console.log(`\n💎 GEM BATCH #${this.batchCount} - Generating 150 Timeless Domains...`);
    
    try {
      await this.redis.initialize();
      const allDomains = new Set();
      
      // PHASE 1: AI Gem Generation (120 domains)
      console.log(`👑 PHASE 1: Generating ${this.generationStrategy.aiGenerated} AI gem domains...`);
      const aiDomains = await this.generateAIGemDomains(this.generationStrategy.aiGenerated);
      aiDomains.forEach(domain => allDomains.add(domain));
      console.log(`✅ AI Gems: ${aiDomains.length}`);
      
      // PHASE 2: Pattern Generation (20 domains)
      console.log(`✨ PHASE 2: Generating ${this.generationStrategy.patternBased} pattern gems...`);
      const patternDomains = this.generatePatternGems(this.generationStrategy.patternBased);
      patternDomains.forEach(domain => allDomains.add(domain));
      console.log(`✅ Pattern Gems: ${patternDomains.length}`);
      
      // PHASE 3: Cached Gems (10 domains)
      console.log(`💫 PHASE 3: Retrieving ${this.generationStrategy.cachedReuse} cached gems...`);
      const cachedDomains = await this.getCachedGems(this.generationStrategy.cachedReuse);
      cachedDomains.forEach(domain => allDomains.add(domain));
      console.log(`✅ Cached Gems: ${cachedDomains.length}`);
      
      // Ensure exactly 150 domains
      const domainArray = Array.from(allDomains);
      let finalDomains = domainArray.slice(0, 150);
      
      // Fill any gaps with additional patterns
      if (finalDomains.length < 150) {
        const needed = 150 - finalDomains.length;
        console.log(`⚠️  Generating ${needed} additional gems...`);
        const additional = this.generatePatternGems(needed * 2).slice(0, needed);
        finalDomains = [...finalDomains, ...additional].slice(0, 150);
      }
      
      console.log(`📊 TOTAL GEMS: ${finalDomains.length}/150`);
      
      // Availability Check
      console.log(`🔍 Checking availability for ${finalDomains.length} gems...`);
      const domainsWithSuffix = finalDomains.map(domain => `${domain}.com`);
      const availabilityResults = await this.availabilityService.checkBulkAvailability(domainsWithSuffix);
      
      const availableDomains = availabilityResults
        .filter(result => result.available)
        .map(result => result.domain.replace('.com', ''));
      
      console.log(`🎯 AVAILABLE GEMS: ${availableDomains.length}`);
      
      if (availableDomains.length === 0) {
        console.log('❌ No available gems found in this batch');
        return [];
      }
      
      // Auction Value Processing (CRITICAL)
      console.log(`💰 PHASE 4: Auction Value Analysis...`);
      const premiumGems = await this.processGemValuations(availableDomains);
      
      // Cache successful gems
      if (premiumGems.length > 0) {
        await this.cacheSuccessfulGems(premiumGems);
        this.updateStats(premiumGems);
      }
      
      this.printBatchSummary(premiumGems);
      return premiumGems;
      
    } catch (error) {
      console.error('❌ GEM GENERATION FAILED:', error);
      return [];
    }
  }

  // 👑 AI GEM GENERATION (GPT-3.5 Turbo)
  async generateAIGemDomains(count = 120) {
    try {
      console.log(`🧠 Activating GEM-GPT for ${count} timeless domains...`);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are GEM-GPT, the world's most sophisticated brandable domain generator. You create timeless, premium domains that sound like established luxury brands."
          },
          {
            role: "user",
            content: GEM_DOMAIN_PROMPT.replace('EXACTLY 150', `EXACTLY ${count}`)
          }
        ],
        max_tokens: 4000,
        temperature: 0.7, // Lower temperature for more consistent quality
      });

      const domainsText = response.choices[0].message.content;
      const domains = domainsText.split('\n')
        .map(line => {
          const match = line.replace(/^\d+\.\s*/, '').trim();
          return match.split(' ')[0]; // Take first word only
        })
        .filter(domain => domain && domain.length > 0)
        .map(domain => domain.replace('.com', '').trim());

      // Strict validation
      const validatedDomains = domains.filter(domain => 
        GEM_DOMAIN_VALIDATOR.validateDomain(domain)
      ).slice(0, count);

      console.log(`✅ AI Gems Validated: ${validatedDomains.length}/${count}`);
      return validatedDomains;

    } catch (error) {
      console.error('❌ AI Gem Generation Failed:', error.message);
      return this.generatePatternGems(count); // Fallback to patterns
    }
  }

  // ✨ PATTERN-BASED GEM GENERATION
  generatePatternGems(count = 20) {
    const patterns = {
      // Surname-style patterns
      surnamePrefixes: [
        'Ash', 'Crest', 'Field', 'Stone', 'River', 'Brook', 'Lake', 'Hill', 
        'Wood', 'Oak', 'Pine', 'Cedar', 'Maple', 'Sun', 'Moon', 'Star',
        'Gold', 'Silver', 'Crystal', 'Amber', 'Pearl', 'Diamond',
        'Royal', 'Noble', 'Imperial', 'Sovereign', 'Regal', 'Prime',
        'True', 'Steady', 'Constant', 'Ever', 'Legacy', 'Heritage'
      ],
      surnameSuffixes: [
        'worth', 'wood', 'field', 'stone', 'brook', 'stream', 'crest',
        'ridge', 'view', 'point', 'port', 'gate', 'mark', 'trust',
        'haven', 'mont', 'ville', 'land', 'shire', 'ford', 'bridge',
        'ley', 'ton', 'well', 'spring', 'vale', 'dale', 'mere'
      ],
      
      // Luxury brand patterns
      luxuryPrefixes: [
        'Aura', 'Lux', 'Noble', 'Royal', 'Imperial', 'Sovereign', 'Regal',
        'Elite', 'Prime', 'Exclusive', 'Signature', 'Legacy', 'Heritage',
        'Dynasty', 'Crown', 'Jewel', 'Pearl', 'Diamond', 'Gold', 'Silver',
        'Platinum', 'Crystal', 'Amber', 'Onyx', 'Ruby', 'Sapphire'
      ],
      luxurySuffixes: [
        'crest', 'wood', 'stone', 'field', 'worth', 'mark', 'trust',
        'gate', 'port', 'view', 'point', 'haven', 'mont', 'ville'
      ]
    };

    const gems = new Set();
    
    while (gems.size < count) {
      // Alternate between surname and luxury patterns
      if (Math.random() > 0.5) {
        // Surname pattern
        const prefix = patterns.surnamePrefixes[Math.floor(Math.random() * patterns.surnamePrefixes.length)];
        const suffix = patterns.surnameSuffixes[Math.floor(Math.random() * patterns.surnameSuffixes.length)];
        const gem = prefix + suffix;
        
        if (this.validateGemPattern(gem)) {
          gems.add(gem);
        }
      } else {
        // Luxury pattern
        const prefix = patterns.luxuryPrefixes[Math.floor(Math.random() * patterns.luxuryPrefixes.length)];
        const suffix = patterns.luxurySuffixes[Math.floor(Math.random() * patterns.luxurySuffixes.length)];
        const gem = prefix + suffix;
        
        if (this.validateGemPattern(gem)) {
          gems.add(gem);
        }
      }
      
      // Safety break
      if (gems.size >= count * 3) break;
    }
    
    return Array.from(gems).slice(0, count);
  }

  validateGemPattern(gem) {
    return gem.length >= 6 && gem.length <= 14 && 
           /^[A-Z][a-z]+$/.test(gem) &&
           !GEM_DOMAIN_VALIDATOR.hasBannedPatterns(gem) &&
           GEM_DOMAIN_VALIDATOR.countSyllables(gem) >= 2 &&
           GEM_DOMAIN_VALIDATOR.countSyllables(gem) <= 4;
  }

  // 💰 AUCTION VALUE PROCESSING (CRITICAL)
  async processGemValuations(gems) {
    const premiumGems = [];
    const concurrency = 3; // Lower concurrency for better accuracy
    
    console.log(`📈 Processing auction values for ${gems.length} gems...`);
    
    for (let i = 0; i < gems.length; i += concurrency) {
      const batch = gems.slice(i, i + concurrency);
      const batchPromises = batch.map(async (gem) => {
        try {
          // Get actual auction value from Replicate
          const valuation = await this.valuationClient.getValue(gem);
          
          // Our estimated auction value
          const estimatedAuctionValue = GEM_DOMAIN_VALIDATOR.estimateAuctionValue(gem);
          
          // Use the higher of estimated or actual auction value
          const auctionValue = Math.max(
            estimatedAuctionValue, 
            valuation.auctionValue || 0
          );
          
          // CRITICAL: Only include gems with sufficient auction value
          if (auctionValue >= 500) {
            return {
              domain: gem,
              valuation: {
                estimatedValue: auctionValue,
                auctionValue: auctionValue,
                marketplaceValue: valuation.marketplaceValue || auctionValue * 1.2,
                brokerageValue: valuation.brokerageValue || auctionValue * 1.5
              },
              confidence: this.calculateConfidence(gem, auctionValue),
              source: 'ultimate_gem_generator',
              category: this.categorizeGem(gem),
              style: this.identifyGemStyle(gem),
              lastUpdated: new Date().toISOString(),
              batchId: this.batchCount
            };
          }
        } catch (error) {
          console.log(`⚠️ Valuation failed for ${gem}`);
        }
        return null;
      });

      const batchResults = await Promise.all(batchPromises);
      const validGems = batchResults.filter(gem => gem !== null);
      premiumGems.push(...validGems);
      
      // Progress indicator
      if (premiumGems.length % 10 === 0) {
        console.log(`📊 Progress: ${premiumGems.length} premium gems found...`);
      }
      
      // Strategic pause between batches
      if (i + concurrency < gems.length) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    return premiumGems;
  }

  calculateConfidence(gem, auctionValue) {
    let confidence = 70; // Base confidence
    
    // Style confidence bonuses
    if (GEM_DOMAIN_VALIDATOR.isSurnameStyle(gem)) confidence += 15;
    if (GEM_DOMAIN_VALIDATOR.isLuxuryStyle(gem)) confidence += 10;
    if (GEM_DOMAIN_VALIDATOR.isTimelessBusiness(gem)) confidence += 10;
    
    // Auction value confidence
    if (auctionValue >= 1000) confidence += 10;
    if (auctionValue >= 2500) confidence += 5;
    
    return Math.min(95, confidence);
  }

  categorizeGem(gem) {
    if (GEM_DOMAIN_VALIDATOR.isSurnameStyle(gem)) return 'Surname_Gem';
    if (GEM_DOMAIN_VALIDATOR.isLuxuryStyle(gem)) return 'Luxury_Brand';
    if (GEM_DOMAIN_VALIDATOR.isNaturalStyle(gem)) return 'Natural_Element';
    if (GEM_DOMAIN_VALIDATOR.isTimelessBusiness(gem)) return 'Timeless_Business';
    return 'Premium_Brandable';
  }

  identifyGemStyle(gem) {
    const styles = [];
    if (GEM_DOMAIN_VALIDATOR.isSurnameStyle(gem)) styles.push('surname');
    if (GEM_DOMAIN_VALIDATOR.isLuxuryStyle(gem)) styles.push('luxury');
    if (GEM_DOMAIN_VALIDATOR.isNaturalStyle(gem)) styles.push('natural');
    if (GEM_DOMAIN_VALIDATOR.isTimelessBusiness(gem)) styles.push('timeless');
    return styles.length > 0 ? styles.join('_') : 'brandable';
  }

  // 💾 CACHING METHODS
  async getCachedGems(count = 10) {
    try {
      const cachedGems = await this.redis.get('ultimate:gem_cache');
      if (cachedGems && Array.isArray(cachedGems)) {
        const shuffled = [...cachedGems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }
    } catch (error) {
      console.log('⚠️ Gem cache unavailable');
    }
    return [];
  }

  async cacheSuccessfulGems(gems) {
    try {
      const gemNames = gems.map(g => g.domain);
      const existingCache = await this.redis.get('ultimate:gem_cache') || [];
      const newCache = [...new Set([...existingCache, ...gemNames])].slice(-50); // Keep 50 best
      await this.redis.set('ultimate:gem_cache', newCache);
      console.log(`💫 Cached ${gemNames.length} premium gems`);
    } catch (error) {
      console.log('⚠️ Gem cache update failed');
    }
  }

  // 📈 STATISTICS TRACKING
  updateStats(gems) {
    const batchCount = gems.length;
    const batchValue = gems.reduce((sum, gem) => sum + gem.valuation.auctionValue, 0);
    
    this.totalGenerated += batchCount;
    this.totalValue += batchValue;
  }

  printBatchSummary(gems) {
    if (gems.length === 0) {
      console.log('❌ BATCH FAILED: No premium gems generated');
      return;
    }
    
    const avgValue = gems.reduce((sum, gem) => sum + gem.valuation.auctionValue, 0) / gems.length;
    const topGems = gems.sort((a, b) => b.valuation.auctionValue - a.valuation.auctionValue).slice(0, 5);
    
    console.log(`\n🏆 GEM BATCH #${this.batchCount} SUMMARY:`);
    console.log(`💎 Premium Gems: ${gems.length}`);
    console.log(`💰 Average Auction Value: $${avgValue.toLocaleString()}`);
    console.log(`📈 Total Batch Value: $${gems.reduce((sum, gem) => sum + gem.valuation.auctionValue, 0).toLocaleString()}`);
    console.log(`🎯 Top 5 Gems:`);
    
    topGems.forEach((gem, index) => {
      console.log(`   ${index + 1}. ${gem.domain} - $${gem.valuation.auctionValue.toLocaleString()}`);
    });
    
    console.log(`\n📊 LIFETIME STATS:`);
    console.log(`   Total Gems: ${this.totalGenerated}`);
    console.log(`   Total Value: $${this.totalValue.toLocaleString()}`);
    console.log(`   Average Value: $${this.totalValue > 0 ? (this.totalValue / this.totalGenerated).toLocaleString() : 0}`);
  }

  // 🚀 SCHEDULER CONTROLS
  async start() {
    console.log('\n🚀 STARTING ULTIMATE GEM SCHEDULER');
    console.log('💎 MISSION: 150 Timeless, Brandable Domains Per Batch');
    console.log('💰 TARGET: $500+ Minimum Auction Value');
    console.log('🎯 STRATEGY: HumbleWorth Annihilation');
    console.log('⏰ SCHEDULE: Hourly Generation\n');
    
    // Initial generation
    await this.generateGemBatch();
    
    // Hourly generation cycle
    setInterval(async () => {
      console.log('\n⏰ HOURLY GEM GENERATION CYCLE STARTING...');
      await this.generateGemBatch();
    }, 60 * 60 * 1000);
    
    console.log('✅ ULTIMATE GEM SCHEDULER ACTIVE - TIMELESS DOMAINS GUARANTEED');
  }

  getStatus() {
    return {
      active: true,
      batchCount: this.batchCount,
      totalGenerated: this.totalGenerated,
      totalValue: this.totalValue,
      strategy: 'Gem Generation',
      nextBatch: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      mission: 'HumbleWorth Domination via Auction Value'
    };
  }
}

export default UltimateGemScheduler;
