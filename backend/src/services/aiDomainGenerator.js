import { OpenAI } from 'openai';
import Redis from 'redis';
import AdaptiveDomainGenerator from './adaptiveGenerator.js';
import CategoryDetector from './categoryDetector.js';

class AIDomainGenerator {
  constructor() {
    // Initialize OpenAI only if API key is available
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey && 
        openaiKey !== 'your_openai_api_key_here' && 
        openaiKey.trim() !== '' &&
        openaiKey.length > 50) {
      this.openai = new OpenAI({ 
        apiKey: openaiKey 
      });
      console.log('✅ OpenAI API configured successfully');
    } else {
      this.openai = null;
      console.log('OpenAI API key not configured, using fallback generation');
    }
    
    // Initialize adaptive generator and category detector
    this.adaptiveGenerator = new AdaptiveDomainGenerator(this);
    this.categoryDetector = new CategoryDetector();
    
    // Redis client for caching
    this.redis = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    
    this.redis.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
    
    this.redis.connect();
    
    this.previouslyGenerated = new Set();
    this.trends = [
      'AI', 'machine learning', 'blockchain', 'metaverse', 
      'sustainability', 'remote work', 'web3', 'quantum computing',
      'fintech', 'healthtech', 'edtech', 'cleantech', 'agritech',
      'cybersecurity', 'data analytics', 'cloud computing', 'IoT'
    ];

    // Simple in-memory rate limiter (sliding 1h window)
    this.requestTimestamps = [];
    this.maxRequestsPerHour = parseInt(process.env.OPENAI_MAX_REQUESTS_PER_HOUR || (process.env.NODE_ENV === 'development' ? '2' : '10'), 10);
    this.batchSize = parseInt(process.env.OPENAI_BATCH_SIZE || (process.env.NODE_ENV === 'development' ? '10' : '100'), 10);
  }

  /**
   * Generate a large batch of fresh domains using AI - SINGLE CALL, EFFICIENT
   */
  async generateDomainsBatch() {
    try {
      if (!this.openai) {
        throw new Error('❌ OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
      }

      // Rate limit check
      const canProceed = this.canMakeOpenAIRequest();
      if (!canProceed.allowed) {
        const minutes = Math.max(1, Math.ceil(canProceed.retryMs / 60000));
        const err = new Error(`AI generation temporarily paused due to rate limits; retry after ${minutes} minutes`);
        err.statusCode = 429;
        err.retryAfterMinutes = minutes;
        throw err;
      }

      console.log('🌍 Generating FRESH AI domains (SINGLE EFFICIENT CALL)...');
      
      // Single efficient prompt for all domains
      const prompt = `Generate 200 high-quality, brandable domain names for tech startups and businesses. Requirements:
- 6-14 characters, easy to pronounce, memorable
- Mix of real words, portmanteaus, and invented words
- No hyphens or numbers
- Sound like successful tech companies
- Cover various industries: fintech, healthtech, edtech, ecommerce, SaaS, AI, blockchain
- IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
- One domain per line, no numbering or explanations

Examples: stripe, shopify, airbnb, uber, slack, zoom, notion, figma, linear, vercel`;

      const domains = await this.generateWithPrompt(prompt);
      this.recordOpenAIRequest();
      
      console.log(`✅ Generated ${domains.length} FRESH unique AI domains (1 API call)`);
      return domains.slice(0, Math.min(1000, this.batchSize));
      
    } catch (error) {
      console.error('Error in generateDomainsBatch:', error);
      throw error; // Don't use fallback, let it fail properly
    }
  }

  /**
   * Generate custom domains based on user input
   */
  async generateCustomDomains(keywords, style = 'tech', length = 'medium') {
    const prompt = this.buildCustomPrompt(keywords, style, length);
    
    try {
      const domains = await this.generateWithPrompt(prompt);
      return domains.filter(domain => 
        domain && domain.length >= 3 && domain.length <= 14
      );
    } catch (error) {
      console.error('Error generating custom domains:', error);
      throw error; // Don't return empty array, let it fail properly
    }
  }

  /**
   * Generate domains using the adaptive generator
   */
  async generateFromPrompt(prompt) {
    if (!this.openai) {
      throw new Error('❌ OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.8
      });

      const domains = this.parseDomainsFromResponse(response.choices[0].message.content);
      return domains;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  /**
   * Detect category for a domain
   */
  detectDomainCategory(domain) {
    return this.categoryDetector.detectCategory(domain);
  }

  /**
   * Get fresh prompts for domain generation
   */
  getFreshPrompts() {
    const currentTrends = this.getCurrentTrends();
    
    return [
      `Generate 200 brandable domain names for ${currentTrends[0]} trends. Requirements:
       - 6-14 characters, easy to pronounce, memorable
       - Mix of real words, portmanteaus, and invented words
       - No hyphens or numbers
       - Sound like successful tech startups
       - Current trend context: ${currentTrends.join(', ')}
       - Focus on: ${currentTrends[0]}, ${currentTrends[1]}, ${currentTrends[2]}
       - IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
       
       Return only the domain names, one per line, no numbering or explanations.`,

      `Create 150 premium domain names with these characteristics:
       - Sophisticated and trustworthy sounding
       - Great for SaaS, tech, or luxury brands
       - Use prefixes: neo, meta, quanta, zen, nova, apex, ultra, prime, elite
       - Use suffixes: ly, ify, io, tech, labs, hub, stack, flow, wave, core
       - 6-12 characters long
       - Professional and brandable
       - IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
       
       Return only the domain names, one per line.`,

      `Generate 100 creative domain names using:
       - Alliteration (PixelPioneer, CloudCraft, DataDrive)
       - Rhyming patterns (CodeMode, SwiftShift, TechCheck)
       - Short punchy names (Vivid, Zest, Quora-style)
       - Modern tech feel
       - 4-10 characters
       - IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
       
       Return only the domain names, one per line.`,

      `Create 100 domain names inspired by these concepts:
       - Future technology: AI, automation, robotics
       - Digital transformation: cloud, data, analytics
       - Modern business: startup, scale, growth
       - Innovation: breakthrough, discovery, invention
       - 5-12 characters, brandable and memorable
       - IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
       
       Return only the domain names, one per line.`
    ];
  }

  /**
   * Build custom prompt based on user input
   */
  buildCustomPrompt(keywords, style, length) {
    const lengthRange = {
      'short': '3-6 characters',
      'medium': '6-10 characters', 
      'long': '10-14 characters'
    };

    const styleInstructions = {
      'tech': 'tech-focused, modern, innovative sounding',
      'business': 'professional, trustworthy, corporate',
      'creative': 'artistic, unique, memorable',
      'luxury': 'premium, sophisticated, high-end'
    };

    return `Generate 50 brandable domain names based on these keywords: ${keywords.join(', ')}.
    
    Style: ${styleInstructions[style] || styleInstructions.tech}
    Length: ${lengthRange[length] || lengthRange.medium}
    
    Requirements:
    - Easy to pronounce and remember
    - No hyphens or numbers
    - Sound like successful brands
    - Incorporate the provided keywords naturally
    - Be creative and unique
    - IMPORTANT: Return ONLY the domain name part WITHOUT .com suffix
    
    Return only the domain names, one per line, no explanations.`;
  }

  /**
   * Generate domains using OpenAI
   */
  async generateWithPrompt(prompt) {
    if (!this.openai) {
      throw new Error('❌ OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9, // Higher creativity
        max_tokens: 1200
      });

      return this.parseDomainsFromResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error; // Don't use fallback, let it fail properly
    }
  }

  /**
   * Sliding-window limiter helpers
   */
  canMakeOpenAIRequest() {
    const now = Date.now();
    const cutoff = now - 60 * 60 * 1000; // last hour
    this.requestTimestamps = this.requestTimestamps.filter(ts => ts > cutoff);
    if (this.requestTimestamps.length >= this.maxRequestsPerHour) {
      const oldest = this.requestTimestamps[0];
      return { allowed: false, retryMs: (oldest + 60 * 60 * 1000) - now };
    }
    return { allowed: true, retryMs: 0 };
  }

  recordOpenAIRequest() {
    this.requestTimestamps.push(Date.now());
    console.log(`📊 OpenAI rate: ${this.requestTimestamps.length}/${this.maxRequestsPerHour} in the last hour`);
  }

  /**
   * Parse domains from AI response
   */
  parseDomainsFromResponse(text) {
    const domains = text.split('\n')
      .map(line => {
        // Clean up the line
        let domain = line.trim()
          .replace(/^\d+\.\s*/, '') // Remove numbering
          .replace(/[^a-zA-Z]/g, '') // Remove non-letters
          .toLowerCase();
        
        // CRITICAL FIX: Remove any trailing "com" that AI might add
        domain = domain.replace(/com$/g, ''); // Remove trailing 'com'
        domain = domain.replace(/\.com$/g, ''); // Remove trailing '.com'
        
        return domain;
      })
      .filter(domain => {
        // Filter valid domains
        return domain.length >= 3 && 
               domain.length <= 14 && 
               !this.previouslyGenerated.has(domain) &&
               /^[a-z]+$/.test(domain);
      });
    
    // Add to history to avoid duplicates
    domains.forEach(domain => this.previouslyGenerated.add(domain));
    
    return domains;
  }

  /**
   * Get current trending topics
   */
  getCurrentTrends() {
    // Shuffle and return 3 random trends
    return this.trends
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Calculate domain quality score
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
    
    // Uniqueness bonus
    if (this.isUnique(domain)) score += 10;
    
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
    const techWords = ['tech', 'cloud', 'data', 'code', 'app', 'api', 'ai', 'io', 'lab', 'soft', 'digital', 'cyber', 'quantum', 'neural'];
    return techWords.some(word => domain.includes(word));
  }
  
  isPronounceable(domain) {
    const vowelCount = (domain.match(/[aeiou]/gi) || []).length;
    return vowelCount >= domain.length * 0.3;
  }
  
  hasGoodFlow(domain) {
    // Check for consonant-vowel patterns
    const pattern = /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*$/i;
    return pattern.test(domain);
  }
  
  isUnique(domain) {
    // Check if domain has uncommon letter combinations
    const common = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'men', 'put', 'say', 'she', 'too', 'use'];
    return !common.some(word => domain.includes(word));
  }


  /**
   * Delay utility for rate limiting
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Close Redis connection
   */
  async close() {
    await this.redis.quit();
  }
}

export default AIDomainGenerator;
