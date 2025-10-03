import { UNIVERSAL_CATEGORIES } from './universalCategories.js';

class CategoryCombinator {
  generateHybridCategories() {
    const hybrids = [];
    const categories = Object.values(UNIVERSAL_CATEGORIES);
    
    // Cross-pollinate categories for unique combinations
    for (let i = 0; i < categories.length; i++) {
      for (let j = i + 1; j < categories.length; j++) {
        const cat1 = categories[i];
        const cat2 = categories[j];
        
        // Only combine if it makes sense
        if (this.makesSenseToCombine(cat1, cat2)) {
          hybrids.push({
            name: `${cat1.name} + ${cat2.name}`,
            primary: cat1,
            secondary: cat2,
            description: `${cat1.name} meets ${cat2.name}`,
            examples: this.generateHybridExamples(cat1, cat2),
            keywords: [...cat1.keywords, ...cat2.keywords]
          });
        }
      }
    }
    
    return hybrids;
  }

  makesSenseToCombine(cat1, cat2) {
    const incompatiblePairs = [
      ['Finance', 'Gaming'], // Usually don't combine well
      ['Health', 'Finance'],
      ['Science', 'Fashion'],
      ['Special Interests', 'Finance'],
      ['Special Interests', 'Health']
    ];
    
    return !incompatiblePairs.some(pair => 
      (pair.includes(cat1.name) && pair.includes(cat2.name))
    );
  }

  generateHybridExamples(cat1, cat2) {
    const examples = [];
    
    // Sport + Tech = SportTech
    if (cat1.name.includes('Sports') && cat2.name.includes('Tech')) {
      examples.push('SoccerAnalytics', 'BasketballAI', 'FitnessTech', 'EsportsPlatform');
    }
    
    // Food + Tech = FoodTech  
    if (cat1.name.includes('Food') && cat2.name.includes('Tech')) {
      examples.push('RecipeAI', 'FoodDelivery', 'SmartKitchen', 'NutritionTracker');
    }
    
    // Travel + Community = TravelCommunity
    if (cat1.name.includes('Travel') && cat2.name.includes('Community')) {
      examples.push('TravelBuddies', 'AdventureNetwork', 'DigitalNomadHub');
    }
    
    // Health + Tech = HealthTech
    if (cat1.name.includes('Health') && cat2.name.includes('Tech')) {
      examples.push('HealthMonitor', 'WellnessApp', 'FitnessTracker', 'Telemedicine');
    }
    
    // Finance + Tech = FinTech
    if (cat1.name.includes('Finance') && cat2.name.includes('Tech')) {
      examples.push('PayFlow', 'InvestAI', 'CryptoWallet', 'BankingApp');
    }
    
    // Education + Tech = EdTech
    if (cat1.name.includes('Education') && cat2.name.includes('Tech')) {
      examples.push('LearnAI', 'SkillTracker', 'CoursePlatform', 'StudyApp');
    }
    
    // Sports + Community = SportsCommunity
    if (cat1.name.includes('Sports') && cat2.name.includes('Community')) {
      examples.push('FanHub', 'TeamConnect', 'SportsForum', 'AthleteNetwork');
    }
    
    // Creative + Tech = CreativeTech
    if (cat1.name.includes('Creative') && cat2.name.includes('Tech')) {
      examples.push('DesignAI', 'ArtPlatform', 'CreativeTools', 'MediaStudio');
    }
    
    // Lifestyle + Tech = LifestyleTech
    if (cat1.name.includes('Lifestyle') && cat2.name.includes('Tech')) {
      examples.push('LifeTracker', 'HomeAI', 'StyleApp', 'WellnessTech');
    }
    
    // Entertainment + Community = EntertainmentCommunity
    if (cat1.name.includes('Entertainment') && cat2.name.includes('Community')) {
      examples.push('FanBase', 'StreamHub', 'GamingCommunity', 'MediaNetwork');
    }
    
    return examples;
  }

  getTopHybrids(limit = 10) {
    const allHybrids = this.generateHybridCategories();
    
    // Score hybrids based on commercial potential
    const scoredHybrids = allHybrids.map(hybrid => ({
      ...hybrid,
      score: this.calculateHybridScore(hybrid)
    }));
    
    return scoredHybrids
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  calculateHybridScore(hybrid) {
    let score = 0;
    
    // Tech combinations score higher
    if (hybrid.primary.name.includes('Tech') || hybrid.secondary.name.includes('Tech')) {
      score += 30;
    }
    
    // Business-relevant combinations
    const businessCategories = ['Finance', 'E-Commerce', 'Tech Startups', 'Business'];
    if (businessCategories.includes(hybrid.primary.name) || businessCategories.includes(hybrid.secondary.name)) {
      score += 25;
    }
    
    // High-demand combinations
    const highDemandPairs = [
      ['Health', 'Tech'],
      ['Finance', 'Tech'],
      ['Education', 'Tech'],
      ['Sports', 'Community'],
      ['Travel', 'Community']
    ];
    
    const isHighDemand = highDemandPairs.some(pair => 
      (pair.includes(hybrid.primary.name) && pair.includes(hybrid.secondary.name)) ||
      (pair.includes(hybrid.secondary.name) && pair.includes(hybrid.primary.name))
    );
    
    if (isHighDemand) {
      score += 40;
    }
    
    return score;
  }
}

export default CategoryCombinator;
