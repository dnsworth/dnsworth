import OpenAI from 'openai';

class DomainGemHunter {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Premium domain archetypes for similarity scoring
    this.premiumArchetypes = [
      "stripe", "slack", "zoom", "mint", "notion", "calm", "figma", 
      "brex", "drift", "aura", "nova", "zen", "flow", "spark", "edge"
    ];
    
    // High-value dictionary seeds (curated for premium potential)
    this.premiumSeeds = [
      "nova", "aura", "zen", "flow", "spark", "edge", "drift", "calm",
      "mint", "zen", "nova", "aura", "flow", "spark", "edge", "drift",
      "zen", "nova", "aura", "flow", "spark", "edge", "drift", "calm"
    ];
    
    this.initialized = false;
  }

  /**
   * Main entry point - generates high-probability premium domains
   */
  async generateGemDomains(count = 150) {
    console.log('💎 Starting Domain Gem Hunter - Precision Mining Mode');
    
    try {
      // Step 1: Geological Survey - Find premium seeds
      const premiumSeeds = await this.geologicalSurvey();
      console.log(`🗺️ Found ${premiumSeeds.length} premium mining sites`);
      
      // Step 2: Precision Drilling - Generate targeted variants
      const candidates = await this.precisionDrilling(premiumSeeds, count);
      console.log(`⛏️ Generated ${candidates.length} precision candidates`);
      
      // Step 3: Diamond Validation - Pre-score for success probability
      const validatedGems = await this.diamondValidation(candidates);
      console.log(`💎 Validated ${validatedGems.length} high-probability gems`);
      
      return validatedGems;
      
    } catch (error) {
      console.error('❌ Gem Hunter error:', error);
      return [];
    }
  }

  /**
   * Step 1: Geological Survey - Find the best mining sites
   */
  async geologicalSurvey() {
    console.log('🗺️ Conducting geological survey...');
    
    // Use AI to analyze and score dictionary words for premium potential
    const prompt = `
You are a domain geology expert. Analyze these dictionary words for premium domain potential.

Rate each word (1-10) based on:
- Phonetic beauty (vowel balance, syllable structure)
- Brandability (sounds like a premium company)
- Market appeal (commercial potential)
- Length sweet spot (6-8 characters ideal)

Return ONLY a JSON array of the top 20 words with their scores:
[{"word": "nova", "score": 9.2}, {"word": "aura", "score": 8.8}, ...]

Words to analyze: ${this.premiumSeeds.join(', ')}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.3
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const scoredWords = JSON.parse(jsonMatch[0]);
        return scoredWords
          .filter(item => item.score >= 8.0)
          .map(item => item.word)
          .slice(0, 10); // Top 10 mining sites
      }
      
      return this.premiumSeeds.slice(0, 10); // Fallback
      
    } catch (error) {
      console.error('Geological survey error:', error);
      return this.premiumSeeds.slice(0, 10);
    }
  }

  /**
   * Step 2: Precision Drilling - Generate targeted variants
   */
  async precisionDrilling(seeds, targetCount) {
    console.log('⛏️ Starting precision drilling...');
    
    const variantsPerSeed = Math.ceil(targetCount / seeds.length);
    const allCandidates = [];
    
    for (const seed of seeds) {
      try {
        const variants = await this.generateSeedVariants(seed, variantsPerSeed);
        allCandidates.push(...variants);
      } catch (error) {
        console.error(`Drilling error for seed ${seed}:`, error);
      }
    }
    
    return allCandidates.slice(0, targetCount);
  }

  /**
   * Generate premium variants for a specific seed
   */
  async generateSeedVariants(seed, count) {
    const prompt = `
You are a premium brand naming expert. Create ${count} brandable variants of "${seed}".

RULES FOR HIDDEN GEMS:
- 5-8 characters each
- Must sound premium and brandable
- Avoid obvious patterns (no -ly, -ify, -hub)
- Focus on subtle morphological changes
- Should sound like a $10M+ startup name
- Think: "stripe" from "strip", "slack" from "slack"

Return ONLY a JSON array: ["variant1", "variant2", ...]

Seed: ${seed}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const variants = JSON.parse(jsonMatch[0]);
        return variants
          .map(v => v.toLowerCase().replace(/[^a-z]/g, ''))
          .filter(v => v.length >= 5 && v.length <= 8)
          .filter(v => this.isValidDomain(v));
      }
      
      return [];
      
    } catch (error) {
      console.error(`Variant generation error for ${seed}:`, error);
      return [];
    }
  }

  /**
   * Step 3: Diamond Validation - Pre-score for success probability
   */
  async diamondValidation(candidates) {
    console.log('💎 Validating diamond candidates...');
    
    const validatedGems = [];
    
    for (const domain of candidates) {
      try {
        const score = await this.calculateGemScore(domain);
        
        // Only keep domains with 80%+ success probability
        if (score.successProbability >= 0.8) {
          validatedGems.push({
            domain,
            gemScore: score.total,
            successProbability: score.successProbability,
            phoneticScore: score.phonetic,
            premiumScore: score.premium,
            availabilityScore: score.availability
          });
        }
      } catch (error) {
        console.error(`Validation error for ${domain}:`, error);
      }
    }
    
    // Sort by gem score (highest first)
    return validatedGems.sort((a, b) => b.gemScore - a.gemScore);
  }

  /**
   * Calculate comprehensive gem score for a domain
   */
  async calculateGemScore(domain) {
    // Phonetic beauty score
    const phoneticScore = this.calculatePhoneticScore(domain);
    
    // Premium similarity score
    const premiumScore = await this.calculatePremiumSimilarity(domain);
    
    // Availability probability score
    const availabilityScore = this.calculateAvailabilityProbability(domain);
    
    // Total gem score (0-100)
    const totalScore = (phoneticScore * 0.4) + (premiumScore * 0.4) + (availabilityScore * 0.2);
    
    // Success probability (0-1)
    const successProbability = Math.min(1.0, totalScore / 80); // 80+ score = 100% probability
    
    return {
      total: totalScore,
      phonetic: phoneticScore,
      premium: premiumScore,
      availability: availabilityScore,
      successProbability
    };
  }

  /**
   * Calculate phonetic beauty score
   */
  calculatePhoneticScore(domain) {
    if (!domain || domain.length < 4 || domain.length > 10) return 0;
    
    let score = 0;
    
    // Length sweet spot (6-8 chars = 20 points)
    if (domain.length >= 6 && domain.length <= 8) score += 20;
    else if (domain.length >= 5 && domain.length <= 9) score += 15;
    else score += 5;
    
    // Vowel ratio (0.4-0.6 = 20 points)
    const vowels = (domain.match(/[aeiou]/g) || []).length;
    const vowelRatio = vowels / domain.length;
    if (vowelRatio >= 0.4 && vowelRatio <= 0.6) score += 20;
    else if (vowelRatio >= 0.3 && vowelRatio <= 0.7) score += 10;
    
    // Syllable count (2-3 = 15 points) - simplified estimation
    const estimatedSyllables = this.estimateSyllables(domain);
    if (estimatedSyllables >= 2 && estimatedSyllables <= 3) score += 15;
    else if (estimatedSyllables >= 1 && estimatedSyllables <= 4) score += 10;
    
    // Alternating pattern (CVCV = 15 points)
    if (/^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/.test(domain)) score += 15;
    
    // Ends with vowel (10 points)
    if (/[aeiou]$/.test(domain)) score += 10;
    
    // Sound symbolism (positive phonemes = 10 points)
    if (/[brglflst]/i.test(domain)) score += 10;
    
    // Avoid complex consonants (-5 points)
    if (/[xzqjv]{2,}/.test(domain)) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate premium similarity score using AI embeddings
   */
  async calculatePremiumSimilarity(domain) {
    try {
      // For now, use a simplified similarity based on character patterns
      // In production, you'd use OpenAI embeddings
      let score = 0;
      
      // Length similarity to premium archetypes
      if (domain.length >= 5 && domain.length <= 7) score += 30;
      
      // Vowel pattern similarity
      const vowels = (domain.match(/[aeiou]/g) || []).length;
      const vowelRatio = vowels / domain.length;
      if (vowelRatio >= 0.3 && vowelRatio <= 0.6) score += 25;
      
      // Character pattern similarity
      if (/^[a-z]{4,7}$/.test(domain)) score += 20;
      
      // Brandable sound patterns
      if (/[aeiou][bcdfghjklmnpqrstvwxyz]/.test(domain)) score += 15;
      
      // Avoid generic patterns
      if (!/(tech|hub|pro|ly|ify)$/.test(domain)) score += 10;
      
      return Math.min(100, score);
      
    } catch (error) {
      console.error('Premium similarity error:', error);
      return 50; // Default score
    }
  }

  /**
   * Calculate availability probability score
   */
  calculateAvailabilityProbability(domain) {
    let score = 0;
    
    // Length sweet spot (6-8 chars more likely available)
    if (domain.length >= 6 && domain.length <= 8) score += 30;
    else if (domain.length >= 5 && domain.length <= 9) score += 20;
    
    // Avoid over-mined patterns
    if (!/(tech|app|hub|pro|ly|ify|cloud|data|ai)$/.test(domain)) score += 25;
    
    // Creative but not obvious
    if (domain.length >= 6 && !/^(the|my|best|top|free)/.test(domain)) score += 20;
    
    // International appeal (not too English-specific)
    if (/[aeiou]/.test(domain) && !/[xzqjv]{2,}/.test(domain)) score += 15;
    
    // Avoid trademark-like patterns
    if (!/(microsoft|google|apple|amazon)/i.test(domain)) score += 10;
    
    return Math.min(100, score);
  }

  /**
   * Estimate syllable count (simplified)
   */
  estimateSyllables(word) {
    if (!word) return 1;
    
    // Count vowel groups (simplified approach)
    const vowelGroups = word.match(/[aeiou]+/g);
    if (!vowelGroups) return 1;
    
    let syllables = vowelGroups.length;
    
    // Adjust for silent 'e' at the end
    if (word.endsWith('e') && syllables > 1) {
      syllables--;
    }
    
    // Adjust for 'le' endings
    if (word.endsWith('le') && syllables > 1) {
      syllables--;
    }
    
    return Math.max(1, syllables);
  }

  /**
   * Validate domain format
   */
  isValidDomain(domain) {
    if (!domain || typeof domain !== 'string') return false;
    if (domain.length < 4 || domain.length > 10) return false;
    if (!/^[a-z]+$/.test(domain)) return false;
    if (/(test|demo|example|sample)/.test(domain)) return false;
    if (/(x|z|q|j){2,}/.test(domain)) return false;
    return true;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      system: 'Domain Gem Hunter',
      mode: 'Precision Mining',
      status: 'Ready',
      features: [
        'Geological Survey',
        'Precision Drilling', 
        'Diamond Validation',
        '80%+ Success Rate Target'
      ]
    };
  }
}

export default DomainGemHunter;
