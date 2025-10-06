import Replicate from 'replicate';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class HumbleworthClient {
  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    this.model = process.env.REPLICATE_MODEL || "humbleworth/price-predict-v1:a925db842c707850e4ca7b7e86b217692b0353a9ca05eb028802c4a85db93843";
  }

  async getValue(domain) {
    try {
      console.log(`🔍 Using Replicate HumbleWorth API for ${domain}`);
      
      const output = await this.replicate.run(this.model, {
        input: {
          domains: domain
        }
      });

      console.log(`📊 Replicate response for ${domain}:`, output);

      if (output && output.valuations && output.valuations.length > 0) {
        const valuation = output.valuations[0];
        const auctionValue = valuation.auction || 0;
        const marketplaceValue = valuation.marketplace || 0;
        const brokerageValue = valuation.brokerage || 0;

        console.log(`💰 Using Replicate value: ${auctionValue} for ${domain} (auction: ${auctionValue}, marketplace: ${marketplaceValue}, brokerage: ${brokerageValue})`);
        
        return {
          value_usd: auctionValue,
          auctionValue: auctionValue,
          marketplaceValue: marketplaceValue,
          brokerageValue: brokerageValue,
          confidence: 90,
          source: 'replicate',
          raw: output
        };
      }
    } catch (error) {
      console.log(`❌ Replicate API failed for ${domain}: ${error.message}`);
    }

    // Fallback to calculated values if Replicate fails
    const fallbackValues = this.calculateDetailedFallbackValue(domain);
    console.log(`💰 Using fallback value: ${fallbackValues.auctionValue} for ${domain} (auction: ${fallbackValues.auctionValue}, marketplace: ${fallbackValues.marketplaceValue}, brokerage: ${fallbackValues.brokerageValue})`);
    
    return {
      value_usd: fallbackValues.auctionValue,
      auctionValue: fallbackValues.auctionValue,
      marketplaceValue: fallbackValues.marketplaceValue,
      brokerageValue: fallbackValues.brokerageValue,
      confidence: 40,
      source: 'fallback',
      raw: { source: 'fallback' }
    };
  }

  extractValueFromResponse(data) {
    if (!data) return 0;
    
    // Format 1: Direct auction value
    if (typeof data.auction === 'number') {
      return data.auction;
    }
    // Format 2: Nested valuations array
    if (data.valuations && Array.isArray(data.valuations) && data.valuations.length > 0) {
      const valuation = data.valuations[0];
      return valuation.auction || valuation.value || 0;
    }
    // Format 3: Direct value field
    if (typeof data.value === 'number') {
      return data.value;
    }
    // Format 4: Nested data object
    if (data.data && typeof data.data.auction === 'number') {
      return data.data.auction;
    }
    // Format 5: Check for any numeric value in the response
    const findNumericValue = (obj) => {
      if (typeof obj === 'number') return obj;
      if (typeof obj === 'object' && obj !== null) {
        for (const value of Object.values(obj)) {
          const num = findNumericValue(value);
          if (num > 0) return num;
        }
      }
      return 0;
    };
    return findNumericValue(data);
  }

  calculateDetailedFallbackValue(domain) {
    const domainName = domain.replace('.com', '').toLowerCase();
    let baseValue = 200;
    
    // Length-based pricing (shorter = more valuable)
    if (domainName.length <= 4) {
      baseValue = 5000;
    } else if (domainName.length <= 6) {
      baseValue = 2000;
    } else if (domainName.length <= 8) {
      baseValue = 1000;
    } else if (domainName.length <= 10) {
      baseValue = 500;
    }
    
    // Premium keywords boost
    const premiumKeywords = ['tech', 'ai', 'app', 'cloud', 'data', 'smart', 'digital', 'online', 'web', 'net'];
    const hasPremiumKeyword = premiumKeywords.some(keyword => domainName.includes(keyword));
    if (hasPremiumKeyword) {
      baseValue *= 1.5;
    }
    
    // Common words penalty
    const commonWords = ['test', 'demo', 'sample', 'example', 'temp', 'new', 'old'];
    const hasCommonWord = commonWords.some(word => domainName.includes(word));
    if (hasCommonWord) {
      baseValue *= 0.5;
    }
    
    // Calculate realistic breakdown values based on HumbleWorth patterns
    // Auction values are typically the lowest (base value)
    const auctionValue = Math.round(baseValue * (0.8 + Math.random() * 0.4));
    
    // Marketplace values are typically 10-50x higher than auction
    const marketplaceValue = Math.round(auctionValue * (10 + Math.random() * 40));
    
    // Brokerage values are typically 20-100x higher than auction
    const brokerageValue = Math.round(auctionValue * (20 + Math.random() * 80));
    
    return {
      auctionValue: Math.max(auctionValue, 1), // Ensure at least 1
      marketplaceValue: Math.max(marketplaceValue, 1),
      brokerageValue: Math.max(brokerageValue, 1)
    };
  }

  calculateFallbackValue(domain) {
    const detailed = this.calculateDetailedFallbackValue(domain);
    return detailed.auctionValue;
  }
}

export default HumbleworthClient;


