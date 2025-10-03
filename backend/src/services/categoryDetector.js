import { UNIVERSAL_CATEGORIES } from './universalCategories.js';

class CategoryDetector {
  detectCategory(domain) {
    const scores = {};
    
    for (const [key, category] of Object.entries(UNIVERSAL_CATEGORIES)) {
      scores[key] = this.calculateDomainRelevance(domain, category);
    }
    
    // Find top 2 categories
    const sorted = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    
    return sorted.map(([category, score]) => ({
      category: UNIVERSAL_CATEGORIES[category].name,
      confidence: score,
      isPrimary: score > 50 // High confidence
    }));
  }

  calculateDomainRelevance(domain, category) {
    let score = 0;
    
    // Check category keywords
    const keywords = this.getCategoryKeywords(category);
    keywords.forEach(keyword => {
      if (domain.toLowerCase().includes(keyword.toLowerCase())) {
        score += 20;
      }
    });
    
    // Check semantic similarity
    score += this.calculateSemanticSimilarity(domain, category);
    
    // Check domain patterns
    score += this.calculatePatternScore(domain, category);
    
    return Math.min(score, 100);
  }

  getCategoryKeywords(category) {
    return category.keywords || [];
  }

  calculateSemanticSimilarity(domain, category) {
    let score = 0;
    
    // Check for semantic patterns based on category
    switch(category.name) {
      case 'Tech Startups':
        score += this.checkTechPatterns(domain);
        break;
      case 'Sports':
        score += this.checkSportsPatterns(domain);
        break;
      case 'Food & Drink':
        score += this.checkFoodPatterns(domain);
        break;
      case 'Health & Wellness':
        score += this.checkHealthPatterns(domain);
        break;
      case 'Finance':
        score += this.checkFinancePatterns(domain);
        break;
      case 'Education':
        score += this.checkEducationPatterns(domain);
        break;
      case 'Entertainment':
        score += this.checkEntertainmentPatterns(domain);
        break;
      case 'Travel':
        score += this.checkTravelPatterns(domain);
        break;
      case 'Community':
        score += this.checkCommunityPatterns(domain);
        break;
      case 'E-Commerce':
        score += this.checkEcommercePatterns(domain);
        break;
      case 'Creative Arts':
        score += this.checkCreativePatterns(domain);
        break;
      case 'Lifestyle':
        score += this.checkLifestylePatterns(domain);
        break;
      case 'Science & Tech':
        score += this.checkSciencePatterns(domain);
        break;
      case 'Hobbies':
        score += this.checkHobbyPatterns(domain);
        break;
      case 'Special Interests':
        score += this.checkSpecialPatterns(domain);
        break;
    }
    
    return score;
  }

  checkTechPatterns(domain) {
    let score = 0;
    const techPatterns = [
      /^[a-z]+(ai|tech|app|cloud|data|api|dev|lab|hub|io)$/i,
      /^[a-z]+(soft|ware|sys|tems)$/i,
      /^[a-z]+(digital|platform|service)$/i
    ];
    
    if (techPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for tech-sounding combinations
    if (domain.includes('ai') || domain.includes('tech') || domain.includes('app')) {
      score += 20;
    }
    
    return score;
  }

  checkSportsPatterns(domain) {
    let score = 0;
    const sportsPatterns = [
      /^[a-z]+(sport|ball|game|fit|athlete)$/i,
      /^[a-z]+(team|field|court|arena)$/i,
      /^[a-z]+(play|compete|win)$/i
    ];
    
    if (sportsPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for energetic sounding names
    if (this.soundsEnergetic(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkFoodPatterns(domain) {
    let score = 0;
    const foodPatterns = [
      /^[a-z]+(food|eat|taste|recipe|cook)$/i,
      /^[a-z]+(kitchen|fresh|organic)$/i,
      /^[a-z]+(drink|brew|juice)$/i
    ];
    
    if (foodPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for appetizing sounding names
    if (this.soundsAppetizing(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkHealthPatterns(domain) {
    let score = 0;
    const healthPatterns = [
      /^[a-z]+(health|fit|well|care)$/i,
      /^[a-z]+(therapy|medical|clinic)$/i,
      /^[a-z]+(wellness|heal|cure)$/i
    ];
    
    if (healthPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for trustworthy sounding names
    if (this.soundsTrustworthy(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkFinancePatterns(domain) {
    let score = 0;
    const financePatterns = [
      /^[a-z]+(finance|money|invest|trade)$/i,
      /^[a-z]+(wealth|capital|fund|bank)$/i,
      /^[a-z]+(pay|wallet|coin)$/i
    ];
    
    if (financePatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for professional sounding names
    if (this.soundsProfessional(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkEducationPatterns(domain) {
    let score = 0;
    const educationPatterns = [
      /^[a-z]+(learn|teach|education|course)$/i,
      /^[a-z]+(study|school|academy)$/i,
      /^[a-z]+(knowledge|skill|training)$/i
    ];
    
    if (educationPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for educational sounding names
    if (this.soundsEducational(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkEntertainmentPatterns(domain) {
    let score = 0;
    const entertainmentPatterns = [
      /^[a-z]+(game|play|fun|entertain)$/i,
      /^[a-z]+(stream|media|content)$/i,
      /^[a-z]+(show|watch|view)$/i
    ];
    
    if (entertainmentPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for fun sounding names
    if (this.soundsFun(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkTravelPatterns(domain) {
    let score = 0;
    const travelPatterns = [
      /^[a-z]+(travel|trip|journey|adventure)$/i,
      /^[a-z]+(explore|voyage|wander)$/i,
      /^[a-z]+(nomad|roam|discover)$/i
    ];
    
    if (travelPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for adventurous sounding names
    if (this.soundsAdventurous(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkCommunityPatterns(domain) {
    let score = 0;
    const communityPatterns = [
      /^[a-z]+(community|social|connect)$/i,
      /^[a-z]+(network|group|forum)$/i,
      /^[a-z]+(chat|meet|share)$/i
    ];
    
    if (communityPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for social sounding names
    if (this.soundsSocial(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkEcommercePatterns(domain) {
    let score = 0;
    const ecommercePatterns = [
      /^[a-z]+(shop|store|market|buy)$/i,
      /^[a-z]+(sell|commerce|retail)$/i,
      /^[a-z]+(brand|product|goods)$/i
    ];
    
    if (ecommercePatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for commercial sounding names
    if (this.soundsCommercial(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkCreativePatterns(domain) {
    let score = 0;
    const creativePatterns = [
      /^[a-z]+(art|design|creative|photo)$/i,
      /^[a-z]+(music|film|craft|beauty)$/i,
      /^[a-z]+(style|aesthetic|visual)$/i
    ];
    
    if (creativePatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for creative sounding names
    if (this.soundsCreative(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkLifestylePatterns(domain) {
    let score = 0;
    const lifestylePatterns = [
      /^[a-z]+(life|home|family|lifestyle)$/i,
      /^[a-z]+(style|beauty|fashion)$/i,
      /^[a-z]+(garden|pet|parent)$/i
    ];
    
    if (lifestylePatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for lifestyle sounding names
    if (this.soundsLifestyle(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkSciencePatterns(domain) {
    let score = 0;
    const sciencePatterns = [
      /^[a-z]+(science|tech|research|lab)$/i,
      /^[a-z]+(data|innovation|discover)$/i,
      /^[a-z]+(experiment|study|analysis)$/i
    ];
    
    if (sciencePatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for scientific sounding names
    if (this.soundsScientific(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkHobbyPatterns(domain) {
    let score = 0;
    const hobbyPatterns = [
      /^[a-z]+(hobby|collect|diy|craft)$/i,
      /^[a-z]+(passion|interest|leisure)$/i,
      /^[a-z]+(fun|enjoy|relax)$/i
    ];
    
    if (hobbyPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for hobby sounding names
    if (this.soundsHobby(domain)) {
      score += 15;
    }
    
    return score;
  }

  checkSpecialPatterns(domain) {
    let score = 0;
    const specialPatterns = [
      /^[a-z]+(mystery|fantasy|history)$/i,
      /^[a-z]+(special|unique|rare)$/i,
      /^[a-z]+(exclusive|niche|secret)$/i
    ];
    
    if (specialPatterns.some(pattern => pattern.test(domain))) {
      score += 30;
    }
    
    // Check for special sounding names
    if (this.soundsSpecial(domain)) {
      score += 15;
    }
    
    return score;
  }

  calculatePatternScore(domain, category) {
    let score = 0;
    
    // Length patterns
    if (domain.length >= 4 && domain.length <= 8) {
      score += 10;
    }
    
    // Character patterns
    if (/^[a-z]+$/.test(domain)) {
      score += 5;
    }
    
    // Syllable patterns
    const syllableCount = this.countSyllables(domain);
    if (syllableCount >= 2 && syllableCount <= 4) {
      score += 10;
    }
    
    return score;
  }

  countSyllables(word) {
    return word.toLowerCase().replace(/[^aeiou]/g, '').length;
  }

  // Helper methods for semantic analysis
  soundsEnergetic(domain) {
    const energeticWords = ['fast', 'quick', 'speed', 'power', 'energy', 'boost', 'rush'];
    return energeticWords.some(word => domain.includes(word));
  }

  soundsAppetizing(domain) {
    const appetizingWords = ['sweet', 'fresh', 'crisp', 'juicy', 'savory', 'spicy', 'creamy'];
    return appetizingWords.some(word => domain.includes(word));
  }

  soundsTrustworthy(domain) {
    const trustworthyWords = ['trust', 'secure', 'safe', 'reliable', 'stable', 'solid'];
    return trustworthyWords.some(word => domain.includes(word));
  }

  soundsProfessional(domain) {
    const professionalWords = ['pro', 'expert', 'premium', 'elite', 'advanced', 'enterprise'];
    return professionalWords.some(word => domain.includes(word));
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
    const commercialWords = ['biz', 'pro', 'corp', 'inc', 'ltd', 'co', 'net', 'online', 'digital'];
    return commercialWords.some(word => domain.includes(word));
  }

  soundsCreative(domain) {
    const creativeWords = ['art', 'design', 'creative', 'imagine', 'inspire', 'beautiful', 'aesthetic'];
    return creativeWords.some(word => domain.includes(word));
  }

  soundsLifestyle(domain) {
    const lifestyleWords = ['life', 'home', 'family', 'lifestyle', 'style', 'beauty', 'fashion'];
    return lifestyleWords.some(word => domain.includes(word));
  }

  soundsScientific(domain) {
    const scientificWords = ['science', 'research', 'lab', 'data', 'analysis', 'study', 'experiment'];
    return scientificWords.some(word => domain.includes(word));
  }

  soundsHobby(domain) {
    const hobbyWords = ['hobby', 'collect', 'diy', 'craft', 'passion', 'interest', 'leisure'];
    return hobbyWords.some(word => domain.includes(word));
  }

  soundsSpecial(domain) {
    const specialWords = ['special', 'unique', 'rare', 'exclusive', 'niche', 'secret', 'mystery'];
    return specialWords.some(word => domain.includes(word));
  }
}

export default CategoryDetector;
