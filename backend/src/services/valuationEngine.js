// Thin wrapper around HumbleWorth valuation API to keep call sites stable
class DomainValuationEngine {
  constructor(humbleworthClient) {
    this.valuationCache = new Map();
    this.similarSalesCache = new Map();
    this.humbleworth = humbleworthClient;
  }

  async estimateDomainValue(domain) {
    try {
      // Check cache first
      const cacheKey = domain.toLowerCase();
      if (this.valuationCache.has(cacheKey)) {
        return this.valuationCache.get(cacheKey);
      }

      console.log(`💰 Fetching HumbleWorth valuation for: ${domain}`);

      // Prefer HumbleWorth's valuation when available
      let valuation;
      if (this.humbleworth && typeof this.humbleworth.getValue === 'function') {
        const hw = await this.humbleworth.getValue(domain);
        valuation = {
          domain,
          estimatedValue: hw?.value_usd ?? hw?.value ?? 0,
          confidence: hw?.confidence ?? 70,
          breakdown: { score: hw?.score ?? 70, value: hw?.value_usd ?? hw?.value ?? 0, confidence: hw?.confidence ?? 70 },
          source: 'humbleworth'
        };
      } else {
        // Fallback to internal heuristic if HumbleWorth client not wired yet
        const factors = await Promise.allSettled([
          this.checkSimilarSales(domain),
          this.checkBrandabilityScore(domain),
          this.checkSEOPotential(domain),
          this.checkSocialMediaAvailability(domain),
          this.checkTrademarkRisk(domain),
          this.checkDomainAge(domain),
          this.checkKeywordValue(domain),
          this.checkTLDValue(domain)
        ]);
        const results = {};
        factors.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const factorNames = [
              'similarSales', 'brandability', 'seo', 'socialMedia', 
              'trademarkRisk', 'domainAge', 'keywordValue', 'tldValue'
            ];
            results[factorNames[index]] = result.value;
          }
        });
        valuation = this.calculateCompositeValue(results, domain);
        valuation.source = 'internal';
      }
      
      // Cache the result
      this.valuationCache.set(cacheKey, valuation);
      
      return valuation;
    } catch (error) {
      console.error('Error estimating domain value:', error);
      return this.getDefaultValuation(domain);
    }
  }

  async checkSimilarSales(domain) {
    try {
      // Mock implementation - in production, use NameBio, Flippa, etc.
      const mockSimilarSales = [
        { domain: 'techflow.com', price: 2500, date: '2023-01-15' },
        { domain: 'datapulse.com', price: 1800, date: '2023-02-20' },
        { domain: 'cloudbase.com', price: 3200, date: '2023-03-10' },
        { domain: 'appstream.com', price: 1500, date: '2023-04-05' }
      ];

      // Find similar domains based on length, pattern, and keywords
      const similar = mockSimilarSales.filter(sale => 
        this.isSimilarDomain(domain, sale.domain)
      );

      if (similar.length === 0) {
        return { averagePrice: 0, confidence: 0, sales: [] };
      }

      const averagePrice = similar.reduce((sum, sale) => sum + sale.price, 0) / similar.length;
      const confidence = Math.min(similar.length * 20, 100);

      return {
        averagePrice,
        confidence,
        sales: similar
      };
    } catch (error) {
      console.error('Error checking similar sales:', error);
      return { averagePrice: 0, confidence: 0, sales: [] };
    }
  }

  async checkBrandabilityScore(domain) {
    let score = 0;
    
    // Length scoring (6-10 chars is optimal)
    if (domain.length >= 6 && domain.length <= 10) {
      score += 30;
    } else if (domain.length >= 4 && domain.length <= 12) {
      score += 20;
    } else {
      score += 10;
    }

    // Memorability factors
    if (this.isEasyToSpell(domain)) score += 20;
    if (this.isEasyToPronounce(domain)) score += 20;
    if (this.isMemorable(domain)) score += 25;

    // Commercial appeal
    if (this.hasCommercialAppeal(domain)) score += 15;
    if (this.soundsBrandable(domain)) score += 20;

    // Uniqueness
    if (this.isUnique(domain)) score += 10;

    return {
      score: Math.min(score, 100),
      factors: {
        length: domain.length,
        spellable: this.isEasyToSpell(domain),
        pronounceable: this.isEasyToPronounce(domain),
        memorable: this.isMemorable(domain),
        commercial: this.hasCommercialAppeal(domain),
        brandable: this.soundsBrandable(domain),
        unique: this.isUnique(domain)
      }
    };
  }

  async checkSEOPotential(domain) {
    let score = 0;
    
    // Check for keyword potential
    const keywords = this.extractKeywords(domain);
    score += keywords.length * 10;

    // Check for commercial intent
    if (this.hasCommercialIntent(domain)) score += 25;

    // Check for search volume potential
    if (this.hasSearchVolumePotential(domain)) score += 20;

    // Check for brand potential
    if (this.hasBrandPotential(domain)) score += 15;

    return {
      score: Math.min(score, 100),
      keywords,
      commercialIntent: this.hasCommercialIntent(domain),
      searchVolumePotential: this.hasSearchVolumePotential(domain),
      brandPotential: this.hasBrandPotential(domain)
    };
  }

  async checkSocialMediaAvailability(domain) {
    // Mock implementation - in production, check actual social media APIs
    const platforms = ['twitter', 'instagram', 'github', 'linkedin', 'facebook'];
    const available = platforms.filter(platform => 
      Math.random() > 0.3 // Mock 70% availability
    );

    return {
      available: available.length,
      total: platforms.length,
      platforms: available,
      score: (available.length / platforms.length) * 100
    };
  }

  async checkTrademarkRisk(domain) {
    // Mock implementation - in production, use trademark databases
    const riskLevels = ['low', 'medium', 'high'];
    const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    
    const riskScores = { low: 90, medium: 60, high: 20 };
    
    return {
      risk,
      score: riskScores[risk],
      factors: {
        commonWords: this.hasCommonWords(domain),
        brandable: this.soundsBrandable(domain),
        generic: this.isGeneric(domain)
      }
    };
  }

  async checkDomainAge(domain) {
    // Mock implementation - in production, use WHOIS data
    const age = Math.floor(Math.random() * 10); // 0-10 years
    
    let score = 50; // Base score
    if (age > 5) score += 20; // Older domains are more valuable
    if (age > 10) score += 10;
    
    return {
      age,
      score,
      premium: age > 5
    };
  }

  async checkKeywordValue(domain) {
    const keywords = this.extractKeywords(domain);
    let totalValue = 0;
    
    keywords.forEach(keyword => {
      // Mock keyword values - in production, use keyword research APIs
      const value = this.getKeywordValue(keyword);
      totalValue += value;
    });
    
    return {
      keywords,
      totalValue,
      averageValue: keywords.length > 0 ? totalValue / keywords.length : 0,
      score: Math.min(totalValue, 100)
    };
  }

  async checkTLDValue(domain) {
    // For .com domains, this is always high value
    return {
      tld: '.com',
      score: 100,
      premium: true
    };
  }

  calculateCompositeValue(factors, domain) {
    const weights = {
      similarSales: 0.25,
      brandability: 0.20,
      seo: 0.15,
      socialMedia: 0.10,
      trademarkRisk: 0.10,
      domainAge: 0.05,
      keywordValue: 0.10,
      tldValue: 0.05
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([factor, weight]) => {
      if (factors[factor] && factors[factor].score !== undefined) {
        totalScore += factors[factor].score * weight;
        totalWeight += weight;
      }
    });

    const finalScore = totalWeight > 0 ? totalScore / totalWeight : 50;
    
    // Convert score to estimated value
    const estimatedValue = this.scoreToValue(finalScore, domain);
    
    return {
      domain,
      estimatedValue,
      confidence: Math.min(finalScore, 100),
      factors,
      breakdown: {
        score: finalScore,
        value: estimatedValue,
        confidence: Math.min(finalScore, 100)
      }
    };
  }

  scoreToValue(score, domain) {
    // Convert score to estimated value in USD
    const baseValue = 100;
    const multiplier = Math.pow(score / 50, 2); // Exponential scaling
    
    // Adjust for domain length (shorter = more valuable)
    const lengthMultiplier = Math.max(0.5, 1 - (domain.length - 6) * 0.1);
    
    return Math.round(baseValue * multiplier * lengthMultiplier);
  }

  getDefaultValuation(domain) {
    return {
      domain,
      estimatedValue: 500,
      confidence: 50,
      factors: {},
      breakdown: {
        score: 50,
        value: 500,
        confidence: 50
      }
    };
  }

  // Helper methods
  isSimilarDomain(domain1, domain2) {
    const len1 = domain1.length;
    const len2 = domain2.length;
    
    // Length similarity
    if (Math.abs(len1 - len2) > 3) return false;
    
    // Character similarity
    const commonChars = this.getCommonCharacters(domain1, domain2);
    const similarity = commonChars / Math.max(len1, len2);
    
    return similarity > 0.6;
  }

  getCommonCharacters(str1, str2) {
    const chars1 = str1.split('');
    const chars2 = str2.split('');
    let common = 0;
    
    chars1.forEach(char => {
      const index = chars2.indexOf(char);
      if (index !== -1) {
        common++;
        chars2.splice(index, 1);
      }
    });
    
    return common;
  }

  isEasyToSpell(domain) {
    const hardPatterns = [/[qwxz]/, /[^a-z]/, /(.)\1{2,}/];
    return !hardPatterns.some(pattern => pattern.test(domain));
  }

  isEasyToPronounce(domain) {
    const consonantClusters = /[bcdfghjklmnpqrstvwxyz]{3,}/;
    const vowelPatterns = /[aeiou]{3,}/;
    return !consonantClusters.test(domain) && !vowelPatterns.test(domain);
  }

  isMemorable(domain) {
    const memorablePatterns = [/^[a-z]{2,}[aeiou][a-z]{2,}$/, /^[a-z]+[0-9]+$/, /^[a-z]+[a-z]$/];
    return memorablePatterns.some(pattern => pattern.test(domain));
  }

  hasCommercialAppeal(domain) {
    const commercialWords = ['biz', 'pro', 'corp', 'inc', 'ltd', 'co', 'net', 'online', 'digital'];
    return commercialWords.some(word => domain.includes(word));
  }

  soundsBrandable(domain) {
    return domain.length >= 4 && domain.length <= 10 && 
           /^[a-z]+$/.test(domain) && 
           !domain.includes('the') && 
           !domain.includes('and');
  }

  isUnique(domain) {
    const common = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who'];
    return !common.some(word => domain.includes(word));
  }

  extractKeywords(domain) {
    // Simple keyword extraction - in production, use more sophisticated NLP
    const keywords = [];
    const techWords = ['tech', 'app', 'cloud', 'data', 'ai', 'software', 'digital', 'platform', 'api', 'dev'];
    const businessWords = ['biz', 'pro', 'corp', 'inc', 'ltd', 'co', 'net', 'online'];
    const allWords = [...techWords, ...businessWords];
    
    allWords.forEach(word => {
      if (domain.includes(word)) {
        keywords.push(word);
      }
    });
    
    return keywords;
  }

  hasCommercialIntent(domain) {
    const commercialWords = ['buy', 'sell', 'shop', 'store', 'market', 'commerce', 'trade', 'business'];
    return commercialWords.some(word => domain.includes(word));
  }

  hasSearchVolumePotential(domain) {
    // Mock implementation - in production, use keyword research APIs
    return Math.random() > 0.5;
  }

  hasBrandPotential(domain) {
    return this.soundsBrandable(domain) && this.isMemorable(domain);
  }

  hasCommonWords(domain) {
    const common = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can'];
    return common.some(word => domain.includes(word));
  }

  isGeneric(domain) {
    const generic = ['company', 'business', 'service', 'solution', 'system', 'platform'];
    return generic.some(word => domain.includes(word));
  }

  getKeywordValue(keyword) {
    // Mock keyword values - in production, use keyword research APIs
    const values = {
      'tech': 50,
      'app': 40,
      'cloud': 60,
      'data': 55,
      'ai': 70,
      'software': 45,
      'digital': 35,
      'platform': 50,
      'api': 45,
      'dev': 40
    };
    
    return values[keyword] || 20;
  }
}

export default DomainValuationEngine;
