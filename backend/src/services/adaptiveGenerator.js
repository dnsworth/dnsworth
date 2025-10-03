import { UNIVERSAL_CATEGORIES } from './universalCategories.js';
import CategoryCombinator from './categoryCombinator.js';
import CONTEXT_AWARE_PROMPTS from './contextAwarePrompts.js';

class AdaptiveDomainGenerator {
  constructor(openaiService) {
    this.openaiService = openaiService;
    this.categoryPerformance = new Map(); // Track which categories perform best
    this.userInterests = new Map(); // Track user preferences
    this.generationHistory = []; // Track generation patterns
  }

  async generateUniversalDomains() {
    console.log('🌍 GENERATING UNIVERSAL DOMAIN COVERAGE...');
    
    const allDomains = [];
    const categories = this.selectOptimalCategories();
    
    for (const category of categories) {
      console.log(`🎯 Generating ${category.name} domains...`);
      
      const categoryDomains = await this.generateForCategory(category);
      allDomains.push(...categoryDomains);
      
      // Learn from performance
      this.trackCategoryPerformance(category, categoryDomains);
      
      // Rate limiting between categories
      await this.delay(1000);
    }
    
    // Generate hybrid domains (category combinations)
    console.log('🔗 Generating hybrid domain combinations...');
    const hybridDomains = await this.generateHybridDomains();
    allDomains.push(...hybridDomains);
    
    // Generate expert-level domains
    console.log('🎓 Generating expert-level domains...');
    const expertDomains = await this.generateExpertDomains();
    allDomains.push(...expertDomains);
    
    return this.rankAndFilter(allDomains);
  }

  selectOptimalCategories() {
    // Select mix of high-performing and exploratory categories
    const highPerformers = this.getTopPerformingCategories(5);
    const randomExploratory = this.getRandomCategories(3);
    const userFavorites = this.getUserFavoriteCategories(2);
    
    return [...new Set([...highPerformers, ...randomExploratory, ...userFavorites])];
  }

  async generateForCategory(category) {
    const prompts = [];
    
    // Main category prompt
    prompts.push(CONTEXT_AWARE_PROMPTS.generateForCategory(category.name));
    
    // Subcategory prompts
    if (category.subcategories) {
      const relevantSubs = this.selectRelevantSubcategories(category);
      for (const sub of relevantSubs) {
        prompts.push(CONTEXT_AWARE_PROMPTS.generateForCategory(category.name, sub));
      }
    }
    
    // Generate from all prompts
    const allDomains = [];
    for (const prompt of prompts) {
      const domains = await this.generateFromPrompt(prompt);
      allDomains.push(...domains.map(name => ({
        name,
        category: category.name,
        subcategory: this.extractSubcategoryFromPrompt(prompt, category),
        score: this.calculateCategoryScore(name, category),
        generatedAt: new Date()
      })));
      
      await this.delay(500); // Rate limiting
    }
    
    return allDomains;
  }

  async generateHybridDomains() {
    const combinator = new CategoryCombinator();
    const hybrids = combinator.getTopHybrids(5); // Top 5 hybrids
    
    const hybridDomains = [];
    
    for (const hybrid of hybrids) {
      const prompt = CONTEXT_AWARE_PROMPTS.generateHybridDomains(
        hybrid.primary.name, 
        hybrid.secondary.name
      );
      
      const domains = await this.generateFromPrompt(prompt);
      hybridDomains.push(...domains.map(name => ({
        name,
        category: `Hybrid: ${hybrid.primary.name} + ${hybrid.secondary.name}`,
        subcategory: null,
        score: this.calculateHybridScore(name, hybrid),
        generatedAt: new Date()
      })));
      
      await this.delay(500);
    }
    
    return hybridDomains;
  }

  async generateExpertDomains() {
    const expertPrompts = CONTEXT_AWARE_PROMPTS.getExpertPrompts();
    const expertDomains = [];
    
    for (const expertPrompt of expertPrompts) {
      const domains = await this.generateFromPrompt(expertPrompt.prompt);
      expertDomains.push(...domains.map(name => ({
        name,
        category: `Expert: ${expertPrompt.name}`,
        subcategory: null,
        score: this.calculateExpertScore(name, expertPrompt),
        generatedAt: new Date()
      })));
      
      await this.delay(500);
    }
    
    return expertDomains;
  }

  async generateFromPrompt(prompt) {
    try {
      // Delegate to the OpenAI-capable service's prompt generator
      const domains = await this.openaiService.generateFromPrompt(prompt);
      return Array.isArray(domains) ? domains : (domains?.domains || []);
    } catch (error) {
      console.error('Error generating from prompt:', error);
      return [];
    }
  }

  calculateCategoryScore(domain, category) {
    let score = 100;
    
    // Category-specific scoring
    switch(category.name) {
      case 'Tech Startups':
        score += this.rateTechStartup(domain);
        break;
      case 'Sports':
        score += this.rateSportsDomain(domain);
        break;
      case 'E-Commerce':
        score += this.rateEcommerceDomain(domain);
        break;
      case 'Food & Drink':
        score += this.rateFoodDomain(domain);
        break;
      case 'Health & Wellness':
        score += this.rateHealthDomain(domain);
        break;
      case 'Finance':
        score += this.rateFinanceDomain(domain);
        break;
      case 'Education':
        score += this.rateEducationDomain(domain);
        break;
      case 'Entertainment':
        score += this.rateEntertainmentDomain(domain);
        break;
      case 'Travel':
        score += this.rateTravelDomain(domain);
        break;
      case 'Community':
        score += this.rateCommunityDomain(domain);
        break;
    }
    
    // General scoring factors
    score += this.calculateGeneralScore(domain);
    
    return Math.min(score, 200); // Cap at 200
  }

  calculateGeneralScore(domain) {
    let score = 0;
    
    // Length scoring (6-10 chars is optimal)
    if (domain.length >= 6 && domain.length <= 10) {
      score += 20;
    } else if (domain.length >= 4 && domain.length <= 12) {
      score += 10;
    }
    
    // Memorability factors
    if (this.isEasyToSpell(domain)) score += 15;
    if (this.isEasyToPronounce(domain)) score += 15;
    if (this.isMemorable(domain)) score += 20;
    
    // Commercial appeal
    if (this.hasCommercialAppeal(domain)) score += 25;
    if (this.soundsBrandable(domain)) score += 20;
    
    return score;
  }

  rateTechStartup(domain) {
    let score = 0;
    const techWords = ['tech', 'app', 'cloud', 'data', 'ai', 'software', 'digital', 'platform', 'api', 'dev'];
    const hasTechTheme = techWords.some(word => domain.includes(word));
    
    if (hasTechTheme) score += 30;
    if (domain.length <= 8) score += 20;
    if (this.soundsScalable(domain)) score += 25;
    if (this.soundsProfessional(domain)) score += 20;
    
    return score;
  }

  rateSportsDomain(domain) {
    let score = 0;
    const sportsWords = ['sport', 'ball', 'game', 'fit', 'athlete', 'field', 'court', 'arena'];
    const hasSportsTheme = sportsWords.some(word => domain.includes(word));
    
    if (hasSportsTheme) score += 30;
    if (domain.length <= 8) score += 20;
    if (this.isEnergeticName(domain)) score += 25;
    
    return score;
  }

  rateEcommerceDomain(domain) {
    let score = 0;
    const ecommerceWords = ['shop', 'store', 'market', 'buy', 'sell', 'trade', 'commerce', 'retail', 'cart', 'checkout'];
    const hasEcommerceTheme = ecommerceWords.some(word => domain.includes(word));
    
    if (hasEcommerceTheme) score += 30;
    if (domain.length <= 10) score += 20;
    if (this.soundsCommercial(domain)) score += 25;
    
    return score;
  }

  rateFoodDomain(domain) {
    let score = 0;
    const foodWords = ['food', 'eat', 'taste', 'recipe', 'cook', 'kitchen', 'fresh', 'organic'];
    const hasFoodTheme = foodWords.some(word => domain.includes(word));
    
    if (hasFoodTheme) score += 30;
    if (this.soundsDelicious(domain)) score += 25;
    if (domain.length <= 10) score += 20;
    
    return score;
  }

  rateHealthDomain(domain) {
    let score = 0;
    const healthWords = ['health', 'fit', 'well', 'care', 'therapy', 'medical', 'clinic', 'wellness'];
    const hasHealthTheme = healthWords.some(word => domain.includes(word));
    
    if (hasHealthTheme) score += 30;
    if (this.soundsTrustworthy(domain)) score += 25;
    if (domain.length <= 10) score += 20;
    
    return score;
  }

  rateFinanceDomain(domain) {
    let score = 0;
    const financeWords = ['finance', 'money', 'invest', 'trade', 'wealth', 'capital', 'fund', 'bank'];
    const hasFinanceTheme = financeWords.some(word => domain.includes(word));
    
    if (hasFinanceTheme) score += 30;
    if (this.soundsProfessional(domain)) score += 25;
    if (this.soundsTrustworthy(domain)) score += 20;
    
    return score;
  }

  rateEducationDomain(domain) {
    let score = 0;
    const educationWords = ['learn', 'teach', 'education', 'course', 'study', 'school', 'academy', 'knowledge'];
    const hasEducationTheme = educationWords.some(word => domain.includes(word));
    
    if (hasEducationTheme) score += 30;
    if (this.soundsEducational(domain)) score += 25;
    if (domain.length <= 12) score += 20;
    
    return score;
  }

  rateEntertainmentDomain(domain) {
    let score = 0;
    const entertainmentWords = ['game', 'play', 'fun', 'entertain', 'stream', 'media', 'content', 'show'];
    const hasEntertainmentTheme = entertainmentWords.some(word => domain.includes(word));
    
    if (hasEntertainmentTheme) score += 30;
    if (this.soundsFun(domain)) score += 25;
    if (domain.length <= 10) score += 20;
    
    return score;
  }

  rateTravelDomain(domain) {
    let score = 0;
    const travelWords = ['travel', 'trip', 'journey', 'adventure', 'explore', 'voyage', 'wander', 'nomad'];
    const hasTravelTheme = travelWords.some(word => domain.includes(word));
    
    if (hasTravelTheme) score += 30;
    if (this.soundsAdventurous(domain)) score += 25;
    if (domain.length <= 10) score += 20;
    
    return score;
  }

  rateCommunityDomain(domain) {
    let score = 0;
    const communityWords = ['community', 'social', 'connect', 'network', 'group', 'forum', 'chat', 'meet'];
    const hasCommunityTheme = communityWords.some(word => domain.includes(word));
    
    if (hasCommunityTheme) score += 30;
    if (this.soundsSocial(domain)) score += 25;
    if (domain.length <= 10) score += 20;
    
    return score;
  }

  // Helper methods for scoring
  isEnergeticName(domain) {
    const energeticPatterns = [/^[a-z]*[aeiou]{2,}/, /[xz]/, /[^aeiou]{3}/];
    return energeticPatterns.some(pattern => pattern.test(domain));
  }

  soundsDelicious(domain) {
    const deliciousWords = ['sweet', 'fresh', 'crisp', 'juicy', 'savory', 'spicy', 'creamy'];
    return deliciousWords.some(word => domain.includes(word));
  }

  soundsScalable(domain) {
    const scalableWords = ['scale', 'grow', 'expand', 'global', 'world', 'universe'];
    return scalableWords.some(word => domain.includes(word));
  }

  soundsProfessional(domain) {
    const professionalWords = ['pro', 'expert', 'premium', 'elite', 'advanced', 'enterprise'];
    return professionalWords.some(word => domain.includes(word));
  }

  soundsTrustworthy(domain) {
    const trustworthyWords = ['trust', 'secure', 'safe', 'reliable', 'stable', 'solid'];
    return trustworthyWords.some(word => domain.includes(word));
  }

  soundsEducational(domain) {
    const educationalWords = ['academy', 'institute', 'university', 'college', 'school', 'learn'];
    return educationalWords.some(word => domain.includes(word));
  }

  soundsFun(domain) {
    const funWords = ['fun', 'play', 'game', 'joy', 'happy', 'laugh', 'smile'];
    return funWords.some(word => domain.includes(word));
  }

  soundsAdventurous(domain) {
    const adventurousWords = ['adventure', 'explore', 'discover', 'journey', 'voyage', 'expedition'];
    return adventurousWords.some(word => domain.includes(word));
  }

  soundsSocial(domain) {
    const socialWords = ['social', 'connect', 'meet', 'chat', 'share', 'community', 'network'];
    return socialWords.some(word => domain.includes(word));
  }

  soundsCommercial(domain) {
    const commercialWords = ['biz', 'pro', 'corp', 'inc', 'ltd', 'co', 'group', 'global', 'world', 'international'];
    return commercialWords.some(word => domain.includes(word));
  }

  isEasyToSpell(domain) {
    // Check for common misspelling patterns
    const hardPatterns = [/[qwxz]/, /[^a-z]/, /(.)\1{2,}/];
    return !hardPatterns.some(pattern => pattern.test(domain));
  }

  isEasyToPronounce(domain) {
    // Check for consonant clusters and vowel patterns
    const consonantClusters = /[bcdfghjklmnpqrstvwxyz]{3,}/;
    const vowelPatterns = /[aeiou]{3,}/;
    return !consonantClusters.test(domain) && !vowelPatterns.test(domain);
  }

  isMemorable(domain) {
    // Check for memorable patterns
    const memorablePatterns = [/^[a-z]{2,}[aeiou][a-z]{2,}$/, /^[a-z]+[0-9]+$/, /^[a-z]+[a-z]$/];
    return memorablePatterns.some(pattern => pattern.test(domain));
  }

  hasCommercialAppeal(domain) {
    const commercialWords = ['biz', 'pro', 'corp', 'inc', 'ltd', 'co', 'net', 'online', 'digital'];
    return commercialWords.some(word => domain.includes(word));
  }

  soundsBrandable(domain) {
    // Check for brandable characteristics
    return domain.length >= 4 && domain.length <= 10 && 
           /^[a-z]+$/.test(domain) && 
           !domain.includes('the') && 
           !domain.includes('and');
  }

  // Utility methods
  selectRelevantSubcategories(category) {
    if (!category.subcategories) return [];
    return category.subcategories.slice(0, 2); // Select top 2 subcategories
  }

  extractSubcategoryFromPrompt(prompt, category) {
    if (!category.subcategories) return null;
    const found = category.subcategories.find(sub => prompt.includes(sub));
    return found || null;
  }

  calculateHybridScore(domain, hybrid) {
    let score = 100;
    score += this.calculateCategoryScore(domain, hybrid.primary);
    score += this.calculateCategoryScore(domain, hybrid.secondary);
    return Math.min(score, 300); // Cap at 300 for hybrids
  }

  calculateExpertScore(domain, expertPrompt) {
    let score = 150; // Base score for expert domains
    score += this.calculateGeneralScore(domain);
    
    if (expertPrompt.name.includes('VC-READY')) {
      score += this.rateTechStartup(domain);
    } else if (expertPrompt.name.includes('PREMIUM')) {
      score += this.ratePremiumDomain(domain);
    } else if (expertPrompt.name.includes('ENTERPRISE')) {
      score += this.rateEnterpriseDomain(domain);
    }
    
    return Math.min(score, 250);
  }

  ratePremiumDomain(domain) {
    let score = 0;
    if (domain.length <= 6) score += 30;
    if (this.isOneWord(domain)) score += 25;
    if (this.soundsPremium(domain)) score += 20;
    return score;
  }

  rateEnterpriseDomain(domain) {
    let score = 0;
    const enterpriseWords = ['solutions', 'systems', 'labs', 'technologies', 'platforms', 'enterprise'];
    if (enterpriseWords.some(word => domain.includes(word))) score += 30;
    if (this.soundsProfessional(domain)) score += 25;
    return score;
  }

  isOneWord(domain) {
    return !domain.includes('-') && !domain.includes('_') && !domain.includes('.');
  }

  soundsPremium(domain) {
    const premiumWords = ['premium', 'elite', 'luxury', 'exclusive', 'gold', 'platinum'];
    return premiumWords.some(word => domain.includes(word));
  }

  getTopPerformingCategories(limit) {
    const sorted = Array.from(this.categoryPerformance.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);
    
    return sorted.map(([categoryName]) => 
      Object.values(UNIVERSAL_CATEGORIES).find(cat => cat.name === categoryName)
    ).filter(Boolean);
  }

  getRandomCategories(limit) {
    const categories = Object.values(UNIVERSAL_CATEGORIES);
    const shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  getUserFavoriteCategories(limit) {
    // This would be implemented based on user data
    return this.getRandomCategories(limit);
  }

  trackCategoryPerformance(category, domains) {
    const currentScore = this.categoryPerformance.get(category.name) || 0;
    const newScore = domains.reduce((sum, domain) => sum + domain.score, 0) / domains.length;
    this.categoryPerformance.set(category.name, (currentScore + newScore) / 2);
  }

  rankAndFilter(domains) {
    // Remove duplicates
    const uniqueDomains = domains.filter((domain, index, self) => 
      index === self.findIndex(d => d.name === domain.name)
    );
    
    // Sort by score
    const ranked = uniqueDomains.sort((a, b) => b.score - a.score);
    
    // Return top domains
    return ranked.slice(0, 100);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default AdaptiveDomainGenerator;
