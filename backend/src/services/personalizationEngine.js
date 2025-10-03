class PersonalizationEngine {
  constructor() {
    this.userProfiles = new Map();
    this.preferences = new Map();
    this.browsingHistory = new Map();
    this.registrationHistory = new Map();
  }

  async getPersonalizedDomains(userId, allDomains) {
    try {
      const userProfile = await this.getUserProfile(userId);
      const preferences = await this.getUserPreferences(userId);
      const browsingHistory = await this.getUserHistory(userId);
      
      console.log(`🎯 Personalizing domains for user ${userId}...`);
      
      const personalizedDomains = allDomains
        .map(domain => ({
          ...domain,
          relevance: this.calculateRelevance(domain, userProfile),
          score: this.calculatePersonalizedScore(domain, preferences, browsingHistory)
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 50); // Return top 50 personalized domains
      
      return personalizedDomains;
    } catch (error) {
      console.error('Error personalizing domains:', error);
      return allDomains.slice(0, 50); // Fallback to top 50
    }
  }

  async getUserProfile(userId) {
    if (this.userProfiles.has(userId)) {
      return this.userProfiles.get(userId);
    }

    // Mock user profile - in production, fetch from database
    const profile = {
      userId,
      industry: this.getRandomIndustry(),
      businessType: this.getRandomBusinessType(),
      experience: this.getRandomExperience(),
      interests: this.getRandomInterests(),
      budget: this.getRandomBudget(),
      preferences: this.getRandomPreferences(),
      createdAt: new Date()
    };

    this.userProfiles.set(userId, profile);
    return profile;
  }

  async getUserPreferences(userId) {
    if (this.preferences.has(userId)) {
      return this.preferences.get(userId);
    }

    // Mock preferences - in production, fetch from database
    const preferences = {
      userId,
      domainLength: this.getRandomLengthPreference(),
      style: this.getRandomStylePreference(),
      categories: this.getRandomCategoryPreferences(),
      priceRange: this.getRandomPricePreference(),
      features: this.getRandomFeaturePreferences(),
      updatedAt: new Date()
    };

    this.preferences.set(userId, preferences);
    return preferences;
  }

  async getUserHistory(userId) {
    if (this.browsingHistory.has(userId)) {
      return this.browsingHistory.get(userId);
    }

    // Mock browsing history - in production, fetch from database
    const history = {
      userId,
      viewedDomains: this.getRandomViewedDomains(),
      searchedCategories: this.getRandomSearchedCategories(),
      clickedDomains: this.getRandomClickedDomains(),
      registeredDomains: this.getRandomRegisteredDomains(),
      lastActivity: new Date()
    };

    this.browsingHistory.set(userId, history);
    return history;
  }

  calculateRelevance(domain, userProfile) {
    let relevance = 0;

    // Industry relevance
    if (this.matchesIndustry(domain, userProfile.industry)) {
      relevance += 40;
    }

    // Business type relevance
    if (this.matchesBusinessType(domain, userProfile.businessType)) {
      relevance += 30;
    }

    // Experience level relevance
    if (this.matchesExperienceLevel(domain, userProfile.experience)) {
      relevance += 20;
    }

    // Interest relevance
    if (this.matchesInterests(domain, userProfile.interests)) {
      relevance += 25;
    }

    // Budget relevance
    if (this.matchesBudget(domain, userProfile.budget)) {
      relevance += 15;
    }

    return Math.min(relevance, 100);
  }

  calculatePersonalizedScore(domain, preferences, history) {
    let score = domain.score || 50;

    // Length preference
    if (this.matchesLengthPreference(domain, preferences.domainLength)) {
      score += 20;
    }

    // Style preference
    if (this.matchesStylePreference(domain, preferences.style)) {
      score += 25;
    }

    // Category preference
    if (this.matchesCategoryPreference(domain, preferences.categories)) {
      score += 30;
    }

    // Price preference
    if (this.matchesPricePreference(domain, preferences.priceRange)) {
      score += 15;
    }

    // Feature preference
    if (this.matchesFeaturePreference(domain, preferences.features)) {
      score += 10;
    }

    // History-based scoring
    if (this.matchesBrowsingHistory(domain, history)) {
      score += 20;
    }

    return Math.min(score, 200);
  }

  // Industry matching
  matchesIndustry(domain, industry) {
    const industryKeywords = {
      'tech': ['tech', 'app', 'cloud', 'data', 'ai', 'software', 'digital', 'platform'],
      'finance': ['finance', 'money', 'invest', 'trade', 'wealth', 'capital', 'fund', 'bank'],
      'health': ['health', 'fit', 'well', 'care', 'therapy', 'medical', 'clinic', 'wellness'],
      'education': ['learn', 'teach', 'education', 'course', 'study', 'school', 'academy'],
      'entertainment': ['game', 'play', 'fun', 'entertain', 'stream', 'media', 'content'],
      'ecommerce': ['shop', 'store', 'market', 'buy', 'sell', 'commerce', 'retail'],
      'sports': ['sport', 'ball', 'game', 'fit', 'athlete', 'team', 'field'],
      'food': ['food', 'eat', 'taste', 'recipe', 'cook', 'kitchen', 'fresh'],
      'travel': ['travel', 'trip', 'journey', 'adventure', 'explore', 'voyage'],
      'lifestyle': ['life', 'home', 'family', 'lifestyle', 'style', 'beauty']
    };

    const keywords = industryKeywords[industry] || [];
    return keywords.some(keyword => domain.name.includes(keyword));
  }

  // Business type matching
  matchesBusinessType(domain, businessType) {
    const businessKeywords = {
      'startup': ['tech', 'app', 'cloud', 'data', 'ai', 'platform', 'hub', 'lab'],
      'enterprise': ['solutions', 'systems', 'enterprise', 'corporate', 'business'],
      'ecommerce': ['shop', 'store', 'market', 'buy', 'sell', 'commerce'],
      'saas': ['app', 'platform', 'software', 'tool', 'service', 'cloud'],
      'consulting': ['consulting', 'advisory', 'expert', 'pro', 'solutions'],
      'agency': ['agency', 'creative', 'design', 'marketing', 'digital'],
      'nonprofit': ['foundation', 'charity', 'community', 'help', 'support']
    };

    const keywords = businessKeywords[businessType] || [];
    return keywords.some(keyword => domain.name.includes(keyword));
  }

  // Experience level matching
  matchesExperienceLevel(domain, experience) {
    if (experience === 'beginner') {
      return domain.name.length <= 10 && this.isEasyToSpell(domain.name);
    } else if (experience === 'intermediate') {
      return domain.name.length <= 12;
    } else if (experience === 'expert') {
      return true; // Experts can handle any domain
    }
    return false;
  }

  // Interest matching
  matchesInterests(domain, interests) {
    return interests.some(interest => 
      domain.name.includes(interest.toLowerCase()) ||
      domain.category?.toLowerCase().includes(interest.toLowerCase())
    );
  }

  // Budget matching
  matchesBudget(domain, budget) {
    const estimatedValue = domain.estimatedValue || 500;
    
    if (budget === 'low' && estimatedValue <= 1000) return true;
    if (budget === 'medium' && estimatedValue <= 5000) return true;
    if (budget === 'high' && estimatedValue <= 20000) return true;
    if (budget === 'premium') return true;
    
    return false;
  }

  // Length preference matching
  matchesLengthPreference(domain, lengthPreference) {
    const domainLength = domain.name.length;
    
    if (lengthPreference === 'short' && domainLength <= 6) return true;
    if (lengthPreference === 'medium' && domainLength >= 7 && domainLength <= 10) return true;
    if (lengthPreference === 'long' && domainLength >= 11) return true;
    
    return false;
  }

  // Style preference matching
  matchesStylePreference(domain, style) {
    const stylePatterns = {
      'tech': ['tech', 'app', 'cloud', 'data', 'ai', 'software', 'digital'],
      'professional': ['pro', 'expert', 'solutions', 'systems', 'enterprise'],
      'creative': ['creative', 'design', 'art', 'studio', 'works', 'lab'],
      'luxury': ['premium', 'elite', 'luxury', 'exclusive', 'gold', 'platinum'],
      'casual': ['fun', 'play', 'easy', 'simple', 'quick', 'fast']
    };

    const patterns = stylePatterns[style] || [];
    return patterns.some(pattern => domain.name.includes(pattern));
  }

  // Category preference matching
  matchesCategoryPreference(domain, categories) {
    return categories.some(category => 
      domain.category?.toLowerCase().includes(category.toLowerCase()) ||
      domain.subcategory?.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Price preference matching
  matchesPricePreference(domain, priceRange) {
    const estimatedValue = domain.estimatedValue || 500;
    
    if (priceRange === 'budget' && estimatedValue <= 500) return true;
    if (priceRange === 'moderate' && estimatedValue <= 2000) return true;
    if (priceRange === 'premium' && estimatedValue <= 10000) return true;
    if (priceRange === 'luxury' && estimatedValue > 10000) return true;
    
    return false;
  }

  // Feature preference matching
  matchesFeaturePreference(domain, features) {
    return features.some(feature => {
      switch (feature) {
        case 'brandable':
          return this.soundsBrandable(domain.name);
        case 'memorable':
          return this.isMemorable(domain.name);
        case 'short':
          return domain.name.length <= 8;
        case 'keyword-rich':
          return this.hasKeywords(domain.name);
        case 'trending':
          return domain.trendScore > 50;
        default:
          return false;
      }
    });
  }

  // Browsing history matching
  matchesBrowsingHistory(domain, history) {
    // Check if user has viewed similar domains
    const similarDomains = history.viewedDomains.filter(viewed => 
      this.isSimilarDomain(domain.name, viewed)
    );
    
    if (similarDomains.length > 0) {
      return true;
    }

    // Check if user has searched for similar categories
    const categoryMatch = history.searchedCategories.some(category =>
      domain.category?.toLowerCase().includes(category.toLowerCase())
    );

    return categoryMatch;
  }

  // Helper methods
  isEasyToSpell(domain) {
    const hardPatterns = [/[qwxz]/, /[^a-z]/, /(.)\1{2,}/];
    return !hardPatterns.some(pattern => pattern.test(domain));
  }

  isMemorable(domain) {
    const memorablePatterns = [/^[a-z]{2,}[aeiou][a-z]{2,}$/, /^[a-z]+[0-9]+$/, /^[a-z]+[a-z]$/];
    return memorablePatterns.some(pattern => pattern.test(domain));
  }

  soundsBrandable(domain) {
    return domain.length >= 4 && domain.length <= 10 && 
           /^[a-z]+$/.test(domain) && 
           !domain.includes('the') && 
           !domain.includes('and');
  }

  hasKeywords(domain) {
    const keywords = ['tech', 'app', 'cloud', 'data', 'ai', 'software', 'digital', 'platform'];
    return keywords.some(keyword => domain.includes(keyword));
  }

  isSimilarDomain(domain1, domain2) {
    const len1 = domain1.length;
    const len2 = domain2.length;
    
    if (Math.abs(len1 - len2) > 3) return false;
    
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

  // Mock data generators
  getRandomIndustry() {
    const industries = ['tech', 'finance', 'health', 'education', 'entertainment', 'ecommerce', 'sports', 'food', 'travel', 'lifestyle'];
    return industries[Math.floor(Math.random() * industries.length)];
  }

  getRandomBusinessType() {
    const types = ['startup', 'enterprise', 'ecommerce', 'saas', 'consulting', 'agency', 'nonprofit'];
    return types[Math.floor(Math.random() * types.length)];
  }

  getRandomExperience() {
    const levels = ['beginner', 'intermediate', 'expert'];
    return levels[Math.floor(Math.random() * levels.length)];
  }

  getRandomInterests() {
    const interests = ['ai', 'blockchain', 'sustainability', 'health', 'education', 'gaming', 'fitness', 'travel', 'food', 'fashion'];
    return interests.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  getRandomBudget() {
    const budgets = ['low', 'medium', 'high', 'premium'];
    return budgets[Math.floor(Math.random() * budgets.length)];
  }

  getRandomPreferences() {
    return {
      domainLength: ['short', 'medium', 'long'][Math.floor(Math.random() * 3)],
      style: ['tech', 'professional', 'creative', 'luxury', 'casual'][Math.floor(Math.random() * 5)],
      categories: ['Tech Startups', 'Finance', 'Health & Wellness', 'Education'][Math.floor(Math.random() * 4)],
      priceRange: ['budget', 'moderate', 'premium', 'luxury'][Math.floor(Math.random() * 4)],
      features: ['brandable', 'memorable', 'short', 'keyword-rich', 'trending'][Math.floor(Math.random() * 5)]
    };
  }

  getRandomLengthPreference() {
    return ['short', 'medium', 'long'][Math.floor(Math.random() * 3)];
  }

  getRandomStylePreference() {
    return ['tech', 'professional', 'creative', 'luxury', 'casual'][Math.floor(Math.random() * 5)];
  }

  getRandomCategoryPreferences() {
    return ['Tech Startups', 'Finance', 'Health & Wellness', 'Education'].slice(0, 2);
  }

  getRandomPricePreference() {
    return ['budget', 'moderate', 'premium', 'luxury'][Math.floor(Math.random() * 4)];
  }

  getRandomFeaturePreferences() {
    return ['brandable', 'memorable', 'short', 'keyword-rich', 'trending'].slice(0, 3);
  }

  getRandomViewedDomains() {
    const domains = ['techflow', 'datapulse', 'cloudbase', 'appstream', 'devhub'];
    return domains.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  getRandomSearchedCategories() {
    const categories = ['Tech Startups', 'Finance', 'Health & Wellness', 'Education'];
    return categories.slice(0, Math.floor(Math.random() * 2) + 1);
  }

  getRandomClickedDomains() {
    const domains = ['techflow', 'datapulse', 'cloudbase'];
    return domains.slice(0, Math.floor(Math.random() * 2) + 1);
  }

  getRandomRegisteredDomains() {
    const domains = ['techflow', 'datapulse'];
    return domains.slice(0, Math.floor(Math.random() * 2));
  }
}

export default PersonalizationEngine;
