class TrendService {
  constructor() {
    this.trends = new Map();
    this.lastUpdate = null;
    this.updateInterval = 3600000; // 1 hour
  }

  async getRealTimeTrends() {
    try {
      console.log('📈 Fetching real-time trends...');
      
      const trends = await Promise.allSettled([
        this.getGoogleTrends(),
        this.getProductHuntLaunches(),
        this.getVentureCapitalNews(),
        this.getTechTwitterTrends(),
        this.getEmergingTechKeywords()
      ]);

      const allTrends = [];
      trends.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          allTrends.push(...result.value);
        } else {
          console.warn(`Trend source ${index} failed:`, result.reason);
        }
      });

      // Process and categorize trends
      const processedTrends = this.processTrends(allTrends);
      
      // Store trends
      this.trends = new Map(processedTrends);
      this.lastUpdate = new Date();
      
      console.log(`✅ Loaded ${processedTrends.length} trends`);
      return processedTrends;
      
    } catch (error) {
      console.error('Error fetching trends:', error);
      return this.getFallbackTrends();
    }
  }

  async getGoogleTrends() {
    // Mock implementation - in production, use Google Trends API
    const mockTrends = [
      { keyword: 'AI automation', category: 'Tech Startups', score: 95 },
      { keyword: 'sustainable energy', category: 'Science & Tech', score: 88 },
      { keyword: 'remote work tools', category: 'Tech Startups', score: 92 },
      { keyword: 'cryptocurrency', category: 'Finance', score: 85 },
      { keyword: 'mental health apps', category: 'Health & Wellness', score: 90 },
      { keyword: 'electric vehicles', category: 'Science & Tech', score: 87 },
      { keyword: 'virtual reality', category: 'Entertainment', score: 83 },
      { keyword: 'blockchain technology', category: 'Tech Startups', score: 89 }
    ];
    
    return mockTrends;
  }

  async getProductHuntLaunches() {
    // Mock implementation - in production, use Product Hunt API
    const mockLaunches = [
      { name: 'AI Writing Assistant', category: 'Tech Startups', score: 94 },
      { name: 'Fitness Tracking App', category: 'Health & Wellness', score: 91 },
      { name: 'Sustainable Shopping', category: 'E-Commerce', score: 88 },
      { name: 'Language Learning', category: 'Education', score: 89 },
      { name: 'Remote Team Tools', category: 'Tech Startups', score: 93 },
      { name: 'Mental Health Platform', category: 'Health & Wellness', score: 92 },
      { name: 'Crypto Portfolio', category: 'Finance', score: 86 },
      { name: 'Creative Design Tool', category: 'Creative Arts', score: 87 }
    ];
    
    return mockLaunches;
  }

  async getVentureCapitalNews() {
    // Mock implementation - in production, use VC news APIs
    const mockVCNews = [
      { keyword: 'fintech startups', category: 'Finance', score: 96 },
      { keyword: 'healthtech innovation', category: 'Health & Wellness', score: 94 },
      { keyword: 'edtech platforms', category: 'Education', score: 92 },
      { keyword: 'cleantech solutions', category: 'Science & Tech', score: 93 },
      { keyword: 'cybersecurity tools', category: 'Tech Startups', score: 95 },
      { keyword: 'AI infrastructure', category: 'Tech Startups', score: 97 },
      { keyword: 'blockchain applications', category: 'Tech Startups', score: 88 },
      { keyword: 'sustainable technology', category: 'Science & Tech', score: 90 }
    ];
    
    return mockVCNews;
  }

  async getTechTwitterTrends() {
    // Mock implementation - in production, use Twitter API
    const mockTwitterTrends = [
      { keyword: 'Web3 development', category: 'Tech Startups', score: 89 },
      { keyword: 'machine learning', category: 'Tech Startups', score: 92 },
      { keyword: 'cloud computing', category: 'Tech Startups', score: 88 },
      { keyword: 'data analytics', category: 'Tech Startups', score: 90 },
      { keyword: 'quantum computing', category: 'Science & Tech', score: 85 },
      { keyword: 'IoT solutions', category: 'Tech Startups', score: 87 },
      { keyword: 'edge computing', category: 'Tech Startups', score: 86 },
      { keyword: '5G technology', category: 'Tech Startups', score: 84 }
    ];
    
    return mockTwitterTrends;
  }

  async getEmergingTechKeywords() {
    // Mock implementation - in production, use tech news APIs
    const mockEmergingTech = [
      { keyword: 'metaverse platforms', category: 'Entertainment', score: 91 },
      { keyword: 'augmented reality', category: 'Entertainment', score: 88 },
      { keyword: 'autonomous vehicles', category: 'Science & Tech', score: 89 },
      { keyword: 'robotic process automation', category: 'Tech Startups', score: 87 },
      { keyword: 'natural language processing', category: 'Tech Startups', score: 90 },
      { keyword: 'computer vision', category: 'Tech Startups', score: 88 },
      { keyword: 'predictive analytics', category: 'Tech Startups', score: 86 },
      { keyword: 'digital twins', category: 'Tech Startups', score: 84 }
    ];
    
    return mockEmergingTech;
  }

  processTrends(trends) {
    const processed = new Map();
    
    trends.forEach(trend => {
      const key = trend.keyword.toLowerCase();
      const existing = processed.get(key);
      
      if (existing) {
        // Combine scores and categories
        existing.score = Math.max(existing.score, trend.score);
        existing.categories = [...new Set([...existing.categories, trend.category])];
        existing.sources = [...new Set([...existing.sources, trend.source || 'unknown'])];
      } else {
        processed.set(key, {
          keyword: trend.keyword,
          category: trend.category,
          categories: [trend.category],
          score: trend.score,
          sources: [trend.source || 'unknown'],
          timestamp: new Date()
        });
      }
    });
    
    return Array.from(processed.entries()).map(([key, value]) => [key, value]);
  }

  getFallbackTrends() {
    return [
      ['ai automation', { keyword: 'AI automation', category: 'Tech Startups', score: 90, categories: ['Tech Startups'], sources: ['fallback'], timestamp: new Date() }],
      ['sustainable tech', { keyword: 'sustainable tech', category: 'Science & Tech', score: 85, categories: ['Science & Tech'], sources: ['fallback'], timestamp: new Date() }],
      ['remote work', { keyword: 'remote work', category: 'Tech Startups', score: 88, categories: ['Tech Startups'], sources: ['fallback'], timestamp: new Date() }],
      ['fintech', { keyword: 'fintech', category: 'Finance', score: 92, categories: ['Finance'], sources: ['fallback'], timestamp: new Date() }],
      ['healthtech', { keyword: 'healthtech', category: 'Health & Wellness', score: 89, categories: ['Health & Wellness'], sources: ['fallback'], timestamp: new Date() }]
    ];
  }

  getTrendsForCategory(category) {
    const categoryTrends = [];
    
    for (const [key, trend] of this.trends) {
      if (trend.categories.includes(category)) {
        categoryTrends.push(trend);
      }
    }
    
    return categoryTrends.sort((a, b) => b.score - a.score);
  }

  getTopTrends(limit = 10) {
    const allTrends = Array.from(this.trends.values());
    return allTrends
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  getTrendKeywords() {
    return Array.from(this.trends.keys());
  }

  isTrendFresh() {
    if (!this.lastUpdate) return false;
    return (Date.now() - this.lastUpdate.getTime()) < this.updateInterval;
  }

  async updateTrendsIfNeeded() {
    if (!this.isTrendFresh()) {
      await this.getRealTimeTrends();
    }
  }

  getTrendScore(keyword) {
    const trend = this.trends.get(keyword.toLowerCase());
    return trend ? trend.score : 0;
  }

  getTrendCategories(keyword) {
    const trend = this.trends.get(keyword.toLowerCase());
    return trend ? trend.categories : [];
  }
}

export default TrendService;
