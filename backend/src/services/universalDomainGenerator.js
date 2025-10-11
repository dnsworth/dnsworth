import { UNIVERSAL_DOMAIN_PROMPT, UNIVERSAL_DOMAIN_SCORER } from './universalDomainStrategy.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class UniversalDomainGenerator {
  constructor() {
    this.openai = null;
    this.qualityThreshold = 60; // Lower threshold for universal domains
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

  async generateUniversalDomains() {
    try {
      console.log(`📝 Generating universal domains (single attempt to save tokens)...`);
      const openai = this.getOpenAI();
      const response = await openai.chat.completions.create({
        model: "gpt-4", // Using GPT-4 for highest quality
        messages: [{ role: "user", content: UNIVERSAL_DOMAIN_PROMPT }],
        max_tokens: 2000,
        temperature: 0.7 // Balanced creativity for universal names
      });

      console.log('🔍 Raw AI response length:', response.choices[0].message.content.length);
      console.log('🔍 Raw AI response preview:', response.choices[0].message.content.substring(0, 200) + '...');
      
      const domains = this.parseAndFilterResponse(response.choices[0].message.content);
      console.log(`✅ Generated ${domains.length} universal domains`);
      return domains;
    } catch (error) {
      console.error(`❌ Generation failed:`, error.message);
      return []; // Return empty array instead of retrying
    }
  }

  parseAndFilterResponse(rawResponse) {
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in AI response.");
      }
      
      const data = JSON.parse(jsonMatch[0]);
      console.log('📊 Successfully parsed JSON response');
      
      const allDomains = [];
      const allGeneratedDomains = Object.values(data).flat();
      console.log('🔍 All generated domains:', allGeneratedDomains.slice(0, 10));
      
      allGeneratedDomains.forEach(domain => {
        if (this.isValidDomain(domain)) {
          const cleanDomain = domain.toLowerCase().replace(/\.com$/, '');
          const qualityScore = UNIVERSAL_DOMAIN_SCORER.scoreDomain(cleanDomain);
          const expectedValue = UNIVERSAL_DOMAIN_SCORER.getExpectedValue(qualityScore);
          
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
      
      console.log(`🔍 Filtered ${allDomains.length} universal domains from ${Object.values(data).flat().length} total`);
      return allDomains;
      
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      return [];
    }
  }

  isValidDomain(domain) {
    if (!domain || typeof domain !== 'string') return false;
    
    const cleanDomain = domain.toLowerCase().replace(/\.com$/, '');
    
    // Enforce 7-14 character length
    if (cleanDomain.length < 7 || cleanDomain.length > 14) return false;
    
    // Only lowercase letters, no numbers/hyphens
    if (!/^[a-z]+$/.test(cleanDomain)) return false;
    
    // Must be 2-3 words (check for capital letters in original)
    const wordCount = domain.split(/(?=[A-Z])/).length;
    if (wordCount < 2 || wordCount > 3) return false;
    
    // Avoid common low-value patterns
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus', 'solutions', 'global', 'systems',
      'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment', 'co', 'corp', 'group', 'labs', 'ventures',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old', 'best', 'fast', 'easy', 'smart', 'v1', 'v2', 'api'
    ];
    
    return !avoidPatterns.some(pattern => cleanDomain.includes(pattern));
  }

  categorizeDomain(domain) {
    // Simple categorization based on domain content
    if (domain.includes('jobs') || domain.includes('business') || domain.includes('tech')) return 'geographic';
    if (domain.includes('apollo') || domain.includes('venus') || domain.includes('carlos') || domain.includes('maria')) return 'cultural';
    if (domain.includes('bitcoin') || domain.includes('chase') || domain.includes('lakers') || domain.includes('blue')) return 'industry';
    if (domain.includes('rose') || domain.includes('lily') || domain.includes('lion') || domain.includes('eagle')) return 'natural';
    if (domain.includes('whitehouse') || domain.includes('harvard') || domain.includes('stanford')) return 'government';
    if (domain.includes('google') || domain.includes('netflix') || domain.includes('spotify')) return 'modern';
    if (domain.includes('doctor') || domain.includes('lawyer') || domain.includes('engineer')) return 'professional';
    return 'universal';
  }

  getQualityDistribution(domains) {
    const distribution = {
      '95+': 0,
      '90-94': 0,
      '85-89': 0,
      '80-84': 0,
      '75-79': 0,
      '70-74': 0,
      '65-69': 0,
      '60-64': 0,
      'below_60': 0
    };

    domains.forEach(domain => {
      const score = domain.qualityScore;
      if (score >= 95) distribution['95+']++;
      else if (score >= 90) distribution['90-94']++;
      else if (score >= 85) distribution['85-89']++;
      else if (score >= 80) distribution['80-84']++;
      else if (score >= 75) distribution['75-79']++;
      else if (score >= 70) distribution['70-74']++;
      else if (score >= 65) distribution['65-69']++;
      else if (score >= 60) distribution['60-64']++;
      else distribution['below_60']++;
    });

    return distribution;
  }
}

export default UniversalDomainGenerator;
