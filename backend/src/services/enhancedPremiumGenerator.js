import OpenAI from 'openai';
import { PREMIUM_DOMAIN_PROMPT, DOMAIN_QUALITY_SCORER } from './premiumDomainStrategy.js';

class EnhancedPremiumGenerator {
  constructor() {
    this.openai = null;
    this.qualityThreshold = 70; // Minimum quality score (premium focus)
    this.maxRetries = 3;
  }

  getOpenAI() {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return this.openai;
  }

  async generatePremiumDomains() {
    console.log('🚀 Generating premium domains with enhanced strategy...');
    
    let attempts = 0;
    let bestDomains = [];
    
    while (attempts < this.maxRetries && bestDomains.length < 50) {
      attempts++;
      console.log(`📝 Attempt ${attempts}/${this.maxRetries} - Generating premium domains...`);
      
      try {
        const response = await this.getOpenAI().chat.completions.create({
          model: "gpt-3.5-turbo", // Use GPT-3.5 Turbo for cost efficiency
          messages: [{ role: "user", content: PREMIUM_DOMAIN_PROMPT }],
          max_tokens: 3000,
          temperature: 0.8 // Higher creativity for premium names
        });

        console.log('🔍 Raw AI response length:', response.choices[0].message.content.length);
        console.log('🔍 Raw AI response preview:', response.choices[0].message.content.substring(0, 200) + '...');
        
        const domains = this.parseAndFilterResponse(response.choices[0].message.content);
        
        if (domains.length > 0) {
          bestDomains = [...bestDomains, ...domains];
          console.log(`✅ Generated ${domains.length} premium domains (total: ${bestDomains.length})`);
        }
        
        // If we have enough high-quality domains, break
        if (bestDomains.length >= 50) {
          break;
        }
        
      } catch (error) {
        console.error(`❌ Attempt ${attempts} failed:`, error.message);
      }
    }
    
    // Sort by quality score and take the best 150 (maximum volume for availability)
    const sortedDomains = bestDomains
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 150);
    
    console.log(`🎯 Final result: ${sortedDomains.length} premium domains generated`);
    console.log(`📊 Quality distribution:`, this.getQualityDistribution(sortedDomains));
    
    return sortedDomains.map(d => d.domain);
  }

  parseAndFilterResponse(text) {
    try {
      // Try to parse as JSON first
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.log('❌ No JSON found in response');
        return [];
      }
      
      const data = JSON.parse(jsonMatch[0]);
      console.log('📊 Successfully parsed JSON response');
      
      // Flatten all categories and filter by quality
      const allDomains = [];
      const allGeneratedDomains = Object.values(data).flat();
      console.log('🔍 All generated domains:', allGeneratedDomains.slice(0, 10));
      
      allGeneratedDomains.forEach(domain => {
        if (this.isValidDomain(domain)) {
          // Clean the domain for processing
          const cleanDomain = domain.toLowerCase().replace(/\.com$/, '');
          const qualityScore = DOMAIN_QUALITY_SCORER.scoreDomain(cleanDomain);
          const expectedValue = DOMAIN_QUALITY_SCORER.getExpectedValue(qualityScore);
          
          console.log(`🔍 Domain: ${cleanDomain}, Score: ${qualityScore}, Threshold: ${this.qualityThreshold}`);
          
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
      
      console.log(`🔍 Filtered ${allDomains.length} high-quality domains from ${Object.values(data).flat().length} total`);
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
    if (cleanDomain.length < 4 || cleanDomain.length > 10) return false;
    if (!/^[a-z]+$/.test(cleanDomain)) return false;
    
    // Avoid common low-value patterns
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus',
      'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old'
    ];
    
    return !avoidPatterns.some(pattern => cleanDomain.includes(pattern));
  }

  categorizeDomain(domain) {
    const categories = {
      'fintech': ['pay', 'bank', 'invest', 'trade', 'wealth', 'capital', 'fund', 'credit', 'coin', 'cash', 'money'],
      'saas': ['sync', 'flow', 'base', 'grid', 'pulse', 'wave', 'core', 'edge', 'api', 'data', 'cloud'],
      'ecommerce': ['shop', 'store', 'market', 'trade', 'buy', 'sell', 'cart', 'deal', 'price'],
      'health': ['well', 'fit', 'zen', 'pure', 'vital', 'boost', 'peak', 'health', 'care'],
      'creative': ['art', 'design', 'craft', 'studio', 'lab', 'works', 'creative', 'visual'],
      'enterprise': ['pro', 'max', 'prime', 'elite', 'core', 'base', 'hub', 'enterprise'],
      'consumer': ['app', 'hub', 'lab', 'studio', 'works', 'space', 'social', 'connect']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => domain.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  getQualityDistribution(domains) {
    const distribution = {
      '90+': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      'below_60': 0
    };
    
    domains.forEach(d => {
      if (d.qualityScore >= 90) distribution['90+']++;
      else if (d.qualityScore >= 80) distribution['80-89']++;
      else if (d.qualityScore >= 70) distribution['70-79']++;
      else if (d.qualityScore >= 60) distribution['60-69']++;
      else distribution['below_60']++;
    });
    
    return distribution;
  }

  // Legacy method for backward compatibility
  analyzeCategoryDistribution(domains) {
    const categories = {};
    domains.forEach(domain => {
      const category = this.categorizeDomain(domain);
      categories[category] = (categories[category] || 0) + 1;
    });
    
    console.log('📊 Final Category Distribution:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} domains`);
    });
  }
}

export default EnhancedPremiumGenerator;
