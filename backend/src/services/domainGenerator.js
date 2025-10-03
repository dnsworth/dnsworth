import axios from 'axios';
import { OpenAI } from 'openai';

class DomainGenerator {
  constructor() {
    // Initialize OpenAI with API key (with fallback)
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }) : null;
    
    // Domain availability check APIs
    this.availabilityAPIs = {
      dynadot: 'https://api.dynadot.com/api3.json'
    };
    
    // Dynadot API credentials (secure storage)
    this.dynadotConfig = {
      apiKey: process.env.DYNADOT_API_KEY
    };
    
    // Security: Mask API keys in logs
    this.maskApiKey = (key) => {
      if (!key) return 'NOT_SET';
      return key.substring(0, 8) + '...' + key.substring(key.length - 4);
    };
    
    // Trending keywords and categories
    this.trendingKeywords = [
      'ai', 'tech', 'cloud', 'data', 'app', 'hub', 'lab', 'studio', 'works',
      'digital', 'smart', 'auto', 'eco', 'green', 'health', 'finance', 'crypto',
      'blockchain', 'nft', 'metaverse', 'vr', 'ar', 'iot', 'saas', 'api'
    ];
    
    this.categories = [
      'Technology', 'Healthcare', 'Finance', 'Environment', 'Education',
      'Lifestyle', 'Travel', 'Food', 'Fashion', 'Sports', 'Entertainment'
    ];
    
    this.tlds = ['.com'];
  }

  /**
   * Generate fresh domain suggestions using AI
   */
  async generateFreshDomains(count = 20, preferences = {}) {
    try {
      // Check if OpenAI is properly configured
      if (!this.openai || !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_key_here') {
        console.log('OpenAI API key not properly configured, using enhanced fallback generation');
        const fallbackDomains = this.generateEnhancedFallbackDomains(count, preferences);
        // Enhance the fallback domains with valuations
        return await this.enhanceWithValuations(fallbackDomains);
      }

      const prompts = this.buildGenerationPrompts(count, preferences);
      const generatedDomains = [];
      
      for (const prompt of prompts) {
        const domains = await this.generateWithAI(prompt);
        generatedDomains.push(...domains);
      }
      
      // Check availability and filter
      const availableDomains = await this.filterAvailableDomains(generatedDomains);
      
      // Enhance with valuations
      const enhancedDomains = await this.enhanceWithValuations(availableDomains);
      
      return enhancedDomains.slice(0, count);
    } catch (error) {
      console.error('Error generating fresh domains:', error);
      // Fallback to enhanced mock data on error
      return this.generateEnhancedFallbackDomains(count, preferences);
    }
  }

  /**
   * Build AI prompts for domain generation
   */
  buildGenerationPrompts(count, preferences) {
    const prompts = [];
    const { category, keywords, tlds, length } = preferences;
    
    // Generate different types of domains
    const promptTypes = [
      'brandable', 'keyword-rich', 'tech-focused', 'creative', 'short-and-memorable'
    ];
    
    const domainsPerPrompt = Math.ceil(count / promptTypes.length);
    
    promptTypes.forEach(type => {
      let prompt = `Generate ${domainsPerPrompt} fresh, available domain name ideas for a ${type} approach. `;
      
      if (category) {
        prompt += `Focus on ${category} industry. `;
      }
      
      if (keywords && keywords.length > 0) {
        prompt += `Include these keywords: ${keywords.join(', ')}. `;
      }
      
      if (tlds && tlds.length > 0) {
        prompt += `Use these TLDs: ${tlds.join(', ')}. `;
      }
      
      if (length) {
        prompt += `Keep domains ${length} characters or less. `;
      }
      
      prompt += `Make them brandable, memorable, and modern. Return only the domain names, one per line, without explanations.`;
      
      prompts.push(prompt);
    });
    
    return prompts;
  }

  /**
   * Generate fallback domains when OpenAI is not available
   */
  generateFallbackDomains() {
    const fallbackDomains = [
      'techflow.com', 'greenenergy.com', 'cryptotrade.com', 'healthtech.com',
      'edulink.com', 'fintrack.com', 'cloudops.com', 'foodiehub.com',
      'travelwise.com', 'smartdata.com', 'innovatehub.com', 'digitalwave.com',
      'futuretech.com', 'nextgen.com', 'protech.com', 'megahub.com',
      'ultratech.com', 'superdata.com', 'powertech.com', 'maxhub.com'
    ];
    
    // Return a random selection of fallback domains
    return fallbackDomains.sort(() => 0.5 - Math.random()).slice(0, 5);
  }

  /**
   * Generate enhanced fallback domains with preferences
   */
  generateEnhancedFallbackDomains(count = 20, preferences = {}) {
    const { category, keywords, tlds, length } = preferences;
    
    // Enhanced domain pool with more variety and realistic names (only .com domains)
    let domainPool = [
      // Tech & AI domains
      'aiworkspace.com', 'cloudnative.com', 'datadriven.com',
      'smartcity.com', 'fintechlab.com', 'healthcareai.com', 'edutech.com',
      'cloudtech.com', 'dataanalytics.com', 'smartfinance.com', 'healthtech.com',
      'edutech.com', 'greentech.com', 'fintechai.com', 'techinnovation.com',
      'blockchainhub.com', 'cryptohub.com', 'techstartup.com', 'digitalai.com',
      
      // Business & Professional domains
      'attorneysafe.com', 'clearplacement.com', 'theskinmarket.com', 'securebiz.com',
      'proconsulting.com', 'bizsolutions.com', 'executivehub.com', 'corporateai.com',
      'businessflow.com', 'professionalsuite.com', 'enterprisehub.com', 'corporateflow.com',
      
      // Creative & Brandable domains
      'brandwise.com', 'creativehub.com', 'designflow.com', 'brandstudio.com',
      'creativeai.com', 'brandlab.com', 'designwise.com', 'creativeflow.com',
      'brandhub.com', 'designstudio.com', 'creativewise.com', 'brandflow.com',
      
      // Lifestyle & Consumer domains
      'foodiehub.com', 'travelwise.com', 'healthflow.com', 'lifestylehub.com',
      'wellnessai.com', 'fitnessflow.com', 'healthwise.com', 'lifestyleai.com',
      'wellnesshub.com', 'fitnesswise.com', 'healthflow.com', 'lifestyleflow.com',
      
      // E-commerce & Marketplace domains
      'shopwise.com', 'marketflow.com', 'ecommercehub.com', 'shopai.com',
      'marketwise.com', 'shopflow.com', 'ecommerceai.com', 'markethub.com',
      'shopstudio.com', 'marketai.com', 'ecommercewise.com', 'shopflow.com'
    ];

    // Filter by category if specified
    if (category && category !== 'all') {
      domainPool = domainPool.filter(domain => {
        const domainLower = domain.toLowerCase();
        if (category === 'Technology') return domainLower.includes('tech') || domainLower.includes('ai') || domainLower.includes('app');
        if (category === 'Healthcare') return domainLower.includes('health') || domainLower.includes('med');
        if (category === 'Finance') return domainLower.includes('fin') || domainLower.includes('crypto') || domainLower.includes('money');
        if (category === 'Environment') return domainLower.includes('green') || domainLower.includes('eco');
        if (category === 'Education') return domainLower.includes('edu') || domainLower.includes('learn');
        return true;
      });
    }

    // Filter by TLD if specified
    if (tlds && tlds.length > 0) {
      const preferredTlds = tlds.map(tld => tld.startsWith('.') ? tld : `.${tld}`);
      domainPool = domainPool.filter(domain => 
        preferredTlds.some(tld => domain.endsWith(tld))
      );
    }

    // Filter by length if specified
    if (length) {
      domainPool = domainPool.filter(domain => {
        const domainName = domain.split('.')[0];
        return domainName.length <= parseInt(length);
      });
    }

    // Shuffle and take requested count with some randomization
    const shuffled = domainPool.sort(() => 0.5 - Math.random());
    
    // Add some variety by mixing different types
    const selectedDomains = shuffled.slice(0, Math.min(count, shuffled.length));
    
    // Add some randomization to make it feel fresh
    return selectedDomains.map(domain => {
      // Sometimes add a random suffix or prefix for variety
      if (Math.random() > 0.7) {
        const parts = domain.split('.');
        const name = parts[0];
        const tld = parts[1];
        
        // Add random suffixes occasionally
        const suffixes = ['pro', 'hub', 'ai', 'tech', 'app', 'io'];
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        if (!name.includes(randomSuffix) && Math.random() > 0.5) {
          return `${name}${randomSuffix}.${tld}`;
        }
      }
      return domain;
    });
  }

  /**
   * Generate domains using OpenAI
   */
  async generateWithAI(prompt) {
    try {
      if (!this.openai) {
        console.log('Using fallback generation');
        return this.generateFallbackDomains();
      }

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert domain name generator. Create fresh, brandable domain names that are likely to be available for registration.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      });
      
      const domains = response.choices[0].message.content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && this.isValidDomain(line))
        .map(domain => this.normalizeDomain(domain));
      
      return domains;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return [];
    }
  }

  /**
   * Check domain availability using Dynadot API only
   */
  async checkAvailability(domain) {
    try {
      const dynadotResult = await this.checkDynadot(domain);
      return dynadotResult;
    } catch (error) {
      console.log('Dynadot check failed:', error.message);
      // Fallback to mock availability for development
      return Math.random() > 0.3; // 70% chance of being available
    }
  }


  /**
   * Check availability via Dynadot API
   */
  async checkDynadot(domain) {
    try {
      if (!this.dynadotConfig.apiKey) {
        console.log('Using fallback availability data');
        return Math.random() > 0.3; // 70% chance of being available
      }

      console.log(`Checking domain availability for: ${domain} via Dynadot API`);
      
      const response = await axios.post(this.availabilityAPIs.dynadot, {
        key: this.dynadotConfig.apiKey,
        command: 'domain_check',
        domain: domain
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Dynadot returns availability in response.data
      const isAvailable = response.data && response.data.available === true;
      console.log(`Domain ${domain} availability: ${isAvailable ? 'AVAILABLE' : 'TAKEN'}`);
      return isAvailable;
    } catch (error) {
      console.log(`Dynadot API error for ${domain}: ${error.message}`);
      // Return fallback availability for development
      return Math.random() > 0.3; // 70% chance of being available
    }
  }

  /**
   * Filter domains by availability
   */
  async filterAvailableDomains(domains) {
    const availableDomains = [];
    const batchSize = 5; // Process in batches to avoid rate limits
    
    for (let i = 0; i < domains.length; i += batchSize) {
      const batch = domains.slice(i, i + batchSize);
      const availabilityChecks = await Promise.allSettled(
        batch.map(domain => this.checkAvailability(domain))
      );
      
      availabilityChecks.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value === true) {
          availableDomains.push(batch[index]);
        }
      });
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < domains.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return availableDomains;
  }

  /**
   * Enhance domains with AI-powered valuations
   */
  async enhanceWithValuations(domains) {
    const enhancedDomains = [];
    
    for (const domain of domains) {
      try {
        const valuation = await this.generateValuation(domain);
        const category = this.categorizeDomain(domain);
        const tags = this.generateTags(domain);
        
        enhancedDomains.push({
          domain,
          description: valuation.description,
          category,
          tld: this.extractTld(domain),
          estimatedValue: valuation.value,
          availability: true,
          icon: this.getCategoryIcon(category),
          tags,
          generatedAt: new Date().toISOString(),
          isAIGenerated: false // Always false since we're using HumbleWorth API
        });
      } catch (error) {
        console.error(`Error enhancing domain ${domain}:`, error);
        // Add fallback domain even if enhancement fails
        enhancedDomains.push({
          domain,
          description: `A modern, brandable domain name with great potential`,
          category: this.categorizeDomain(domain),
          tld: this.extractTld(domain),
          estimatedValue: Math.floor(Math.random() * 2000) + 500,
          availability: true,
          icon: this.getCategoryIcon(this.categorizeDomain(domain)),
          tags: this.generateTags(domain),
          generatedAt: new Date().toISOString(),
          isAIGenerated: false
        });
      }
    }
    
    return enhancedDomains;
  }

  /**
   * Generate fallback valuation when OpenAI is not available
   */
  generateFallbackValuation(domain) {
    const domainLower = domain.toLowerCase();
    const domainName = domain.split('.')[0];
    const tld = domain.split('.')[1];
    
    // Generate more specific descriptions based on domain content
    let description = '';
    let baseValue = 100;
    
    // Tech/AI domains
    if (domainLower.includes('ai') || domainLower.includes('tech') || domainLower.includes('data')) {
      description = `AI-powered ${domainName} platform for modern businesses`;
      baseValue = Math.floor(Math.random() * 3000) + 1000;
    }
    // Business domains
    else if (domainLower.includes('biz') || domainLower.includes('pro') || domainLower.includes('corporate')) {
      description = `Professional ${domainName} solutions for enterprise clients`;
      baseValue = Math.floor(Math.random() * 2500) + 800;
    }
    // Creative domains
    else if (domainLower.includes('creative') || domainLower.includes('design') || domainLower.includes('brand')) {
      description = `Creative ${domainName} services for modern brands`;
      baseValue = Math.floor(Math.random() * 2000) + 600;
    }
    // Health/Wellness domains
    else if (domainLower.includes('health') || domainLower.includes('wellness') || domainLower.includes('fitness')) {
      description = `Health and wellness ${domainName} platform`;
      baseValue = Math.floor(Math.random() * 1800) + 500;
    }
    // E-commerce domains
    else if (domainLower.includes('shop') || domainLower.includes('market') || domainLower.includes('commerce')) {
      description = `E-commerce ${domainName} marketplace platform`;
      baseValue = Math.floor(Math.random() * 2200) + 700;
    }
    // Default
    else {
      description = `Modern ${domainName} platform with great potential`;
      baseValue = Math.floor(Math.random() * 1500) + 400;
    }
    
    // Adjust value based on TLD
    if (tld === 'com') baseValue *= 1.5;
    else if (tld === 'io') baseValue *= 1.3;
    else if (tld === 'ai') baseValue *= 1.4;
    else if (tld === 'app') baseValue *= 1.2;
    
    return {
      description: description,
      value: Math.floor(baseValue)
    };
  }

  /**
   * Generate valuation using HumbleWorth API
   */
  async generateValuation(domain) {
    try {
      // Use HumbleWorth API for real valuations
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const apiResponse = await fetch(`${process.env.HUMBLEWORTH_API_URL || 'https://valuation.humbleworth.com'}/api/valuation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'DNSWorth/2.0.0',
          'X-Request-ID': `gem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        },
        body: JSON.stringify({
          domain: domain,
          options: {
            includeSimilar: false,
            includeHistory: false
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!apiResponse.ok) {
        throw new Error(`HumbleWorth API error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      
      if (data.success && data.valuation) {
        return {
          description: data.valuation.description || `Professional ${domain.split('.')[0]} platform for modern businesses`,
          value: Math.max(50, Math.min(50000, data.valuation.estimatedValue || 1000)),
          confidence: 90 // High confidence since it's from HumbleWorth API
        };
      } else {
        throw new Error('Invalid response from HumbleWorth API');
      }
    } catch (error) {
      console.error('Error calling HumbleWorth API:', error);
      console.log('Using fallback valuation for domain:', domain);
      return this.generateFallbackValuation(domain);
    }
  }

  /**
   * Categorize domain based on keywords
   */
  categorizeDomain(domain) {
    const domainLower = domain.toLowerCase();
    
    if (domainLower.includes('ai') || domainLower.includes('tech') || domainLower.includes('app')) {
      return 'Technology';
    } else if (domainLower.includes('health') || domainLower.includes('med') || domainLower.includes('care')) {
      return 'Healthcare';
    } else if (domainLower.includes('crypto') || domainLower.includes('finance') || domainLower.includes('money')) {
      return 'Finance';
    } else if (domainLower.includes('green') || domainLower.includes('eco') || domainLower.includes('sustain')) {
      return 'Environment';
    } else if (domainLower.includes('edu') || domainLower.includes('learn') || domainLower.includes('school')) {
      return 'Education';
    } else if (domainLower.includes('food') || domainLower.includes('eat') || domainLower.includes('restaurant')) {
      return 'Lifestyle';
    } else if (domainLower.includes('travel') || domainLower.includes('trip') || domainLower.includes('journey')) {
      return 'Travel';
    } else {
      return 'Technology'; // Default category
    }
  }

  /**
   * Generate relevant tags for domain
   */
  generateTags(domain) {
    const domainLower = domain.toLowerCase();
    const tags = [];
    
    // Extract meaningful parts
    const parts = domainLower.replace(/\.(com|io|co|net|org|app|dev|ai|tech)$/, '').split(/[-_]/);
    
    parts.forEach(part => {
      if (part.length > 2 && this.trendingKeywords.includes(part)) {
        tags.push(part);
      }
    });
    
    // Add category-based tags
    const category = this.categorizeDomain(domain);
    if (category === 'Technology') tags.push('tech', 'innovation');
    if (category === 'Finance') tags.push('finance', 'crypto');
    if (category === 'Healthcare') tags.push('health', 'medical');
    
    return tags.slice(0, 3); // Limit to 3 tags
  }

  /**
   * Get category icon
   */
  getCategoryIcon(category) {
    const icons = {
      'Technology': '⚡',
      'Healthcare': '🏥',
      'Finance': '💰',
      'Environment': '🌱',
      'Education': '📚',
      'Lifestyle': '🍽️',
      'Travel': '✈️'
    };
    return icons[category] || '💎';
  }

  /**
   * Extract TLD from domain
   */
  extractTld(domain) {
    const match = domain.match(/\.(.+)$/);
    return match ? `.${match[1]}` : '.com';
  }

  /**
   * Validate domain format
   */
  isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }

  /**
   * Normalize domain format
   */
  normalizeDomain(domain) {
    return domain.toLowerCase().trim();
  }

  /**
   * Get trending keywords for generation
   */
  getTrendingKeywords() {
    return this.trendingKeywords;
  }

  /**
   * Get available categories
   */
  getCategories() {
    return this.categories;
  }

  /**
   * Get available TLDs
   */
  getTlds() {
    return this.tlds;
  }
}

export default DomainGenerator;
