// Ultra-Premium Domain Generator
// Generates truly high-value domains with $500+ auction values

import { ULTRA_PREMIUM_PROMPT, ULTRA_PREMIUM_SCORER } from './ultraPremiumStrategy.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class UltraPremiumGenerator {
  constructor() {
    this.openai = null;
    this.qualityThreshold = 80; // Higher threshold for ultra-premium domains
    this.maxRetries = 3;
  }

  getOpenAI() {
    if (!this.openai) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
      }
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return this.openai;
  }

  async generateUltraPremiumDomains() {
    let bestDomains = [];
    for (let attempts = 1; attempts <= this.maxRetries; attempts++) {
      try {
        console.log(`📝 Attempt ${attempts}/${this.maxRetries} - Generating ultra-premium domains...`);
        const openai = this.getOpenAI();
        const response = await openai.chat.completions.create({
          model: "gpt-4", // Using GPT-4 for highest quality
          messages: [{ role: "user", content: ULTRA_PREMIUM_PROMPT }],
          max_tokens: 4000,
          temperature: 0.7 // Balanced creativity for ultra-premium names
        });

        console.log('🔍 Raw AI response length:', response.choices[0].message.content.length);
        console.log('🔍 Raw AI response preview:', response.choices[0].message.content.substring(0, 300) + '...');
        
        const domains = this.parseAndFilterResponse(response.choices[0].message.content);
        
        if (domains.length > 0) {
          bestDomains = [...bestDomains, ...domains];
          console.log(`✅ Generated ${domains.length} ultra-premium domains (total: ${bestDomains.length})`);
        }
      } catch (error) {
        console.error(`❌ Attempt ${attempts} failed:`, error.message);
      }
    }
    
    // Sort by quality score and take the best 150 (maximum volume for availability)
    const sortedDomains = bestDomains
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 150);
    
    console.log(`🎯 Final result: ${sortedDomains.length} ultra-premium domains generated`);
    console.log(`📊 Quality distribution:`, this.getQualityDistribution(sortedDomains));
    
    return sortedDomains.map(d => d.domain);
  }

  parseAndFilterResponse(rawResponse) {
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in AI response.");
      }
      
      const data = JSON.parse(jsonMatch[0]);
      console.log('📊 Successfully parsed JSON response');
      
      // Flatten all categories and filter by quality
      const allDomains = [];
      const allGeneratedDomains = Object.values(data).flat();
      console.log('🔍 All generated domains:', allGeneratedDomains.slice(0, 15));
      
      allGeneratedDomains.forEach(domain => {
        if (this.isValidDomain(domain)) {
          // Clean the domain for processing
          const cleanDomain = domain.toLowerCase().replace(/\.com$/, '');
          const qualityScore = ULTRA_PREMIUM_SCORER.scoreDomain(cleanDomain);
          const expectedValue = ULTRA_PREMIUM_SCORER.getExpectedValue(qualityScore);
          
          console.log(`🔍 Domain: ${cleanDomain}, Score: ${qualityScore}, Threshold: ${this.qualityThreshold}, Expected: $${expectedValue}`);
          
          if (qualityScore >= this.qualityThreshold) {
            allDomains.push({
              domain: cleanDomain,
              qualityScore,
              expectedValue,
              category: this.categorizeDomain(cleanDomain)
            });
          }
        } else {
          console.log(`❌ Invalid domain: ${domain}`);
        }
      });
      
      console.log(`🔍 Filtered ${allDomains.length} ultra-premium domains from ${Object.values(data).flat().length} total`);
      return allDomains;
      
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      return [];
    }
  }

  isValidDomain(domain) {
    if (!domain || typeof domain !== 'string') return false;
    
    // Clean the domain (remove .com, convert to lowercase)
    const cleanDomain = domain.toLowerCase().replace(/\.com$/, '');
    
    // Basic validation
    if (cleanDomain.length < 6 || cleanDomain.length > 12) return false; // Ultra-premium length
    if (!/^[a-z]+$/.test(cleanDomain)) return false;
    
    // Avoid common low-value patterns
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus',
      'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old',
      'pivot', 'spar', 'whirl', 'glow', 'spark', 'craze', 'swap', 'pulse', 'trend', 'style', 'shop', 'buy', 'sell', 'get', 'go'
    ];
    
    return !avoidPatterns.some(pattern => cleanDomain.includes(pattern));
  }

  categorizeDomain(domain) {
    // Simple categorization based on domain characteristics
    if (domain.includes('pay') || domain.includes('bank') || domain.includes('cash') || domain.includes('coin') || domain.includes('fund')) {
      return 'fintech';
    } else if (domain.includes('sync') || domain.includes('flow') || domain.includes('base') || domain.includes('grid') || domain.includes('core')) {
      return 'saas';
    } else if (domain.includes('shop') || domain.includes('buy') || domain.includes('sell') || domain.includes('market')) {
      return 'ecommerce';
    } else if (domain.includes('health') || domain.includes('well') || domain.includes('fit') || domain.includes('med')) {
      return 'health';
    } else if (domain.includes('art') || domain.includes('design') || domain.includes('creative') || domain.includes('visual')) {
      return 'creative';
    } else {
      return 'lifestyle';
    }
  }

  getQualityDistribution(domains) {
    const distribution = {
      '95+': 0,
      '90-94': 0,
      '85-89': 0,
      '80-84': 0,
      '75-79': 0,
      '70-74': 0,
      'below_70': 0
    };
    
    domains.forEach(domain => {
      const score = domain.qualityScore;
      if (score >= 95) distribution['95+']++;
      else if (score >= 90) distribution['90-94']++;
      else if (score >= 85) distribution['85-89']++;
      else if (score >= 80) distribution['80-84']++;
      else if (score >= 75) distribution['75-79']++;
      else if (score >= 70) distribution['70-74']++;
      else distribution['below_70']++;
    });
    
    return distribution;
  }
}

export default UltraPremiumGenerator;
