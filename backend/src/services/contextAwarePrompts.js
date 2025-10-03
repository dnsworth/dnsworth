const CONTEXT_AWARE_PROMPTS = {
  generateForCategory: (category, subcategory = null) => {
    const basePrompts = {
      // 🎯 BUSINESS DOMAINS
      'Tech Startups': `Generate 30 innovative .com domains for ${subcategory || 'tech startups'} that could become the next unicorn. Focus on scalability, modern tech trends, and venture capital appeal. Requirements:
- Sounds like a company that could raise $1M+ seed round
- Professional, tech-forward, scalable sounding
- 6-12 characters, .com only
- No obscure words or hard-to-spell names
- Examples of successful patterns: Stripe, Slack, Zoom, Airbnb, Uber
- Current high-funding trends: AI infrastructure, dev tools, climate tech, web3 infrastructure`,

      // 🛍️ E-COMMERCE DOMAINS
      'E-Commerce': `Create 25 .com domains for ${subcategory || 'e-commerce'} businesses. Focus on trust, reliability, and product-specific appeal. Requirements:
- Include both brandable names and descriptive names
- Sound trustworthy for online transactions
- Easy to remember and type
- 4-10 characters preferred
- Examples: Shopify, Amazon, Etsy, eBay patterns`,

      // ⚽ SPORTS DOMAINS
      'Sports': `Generate 20 .com domains for ${subcategory || 'sports'} enthusiasts, teams, or media. Requirements:
- Include fan communities, training platforms, sports news, and equipment brands
- Energetic and engaging names
- Appeal to sports fans and athletes
- 5-12 characters
- Examples: ESPN, Nike, Under Armour patterns`,

      // 🎮 GAMING DOMAINS
      'Entertainment': subcategory === 'Gaming' ? 
        `Create 25 .com domains for gaming communities, esports, game development, or gaming content. Requirements:
- Focus on energetic, engaging names that appeal to gamers
- Include competitive gaming, streaming, and community aspects
- 4-10 characters
- Examples: Twitch, Discord, Steam patterns` :
        `Generate 20 .com domains for ${subcategory || 'entertainment'} content, streaming, or media companies. Requirements:
- Focus on entertainment, media, and content creation
- Appeal to creators and audiences
- 5-12 characters`,

      // 🍔 FOOD DOMAINS
      'Food & Drink': `Create 20 .com domains for ${subcategory || 'food-related'} businesses. Requirements:
- Include restaurants, food blogs, recipe sites, food delivery, and specialty foods
- Sound appetizing and memorable
- 4-10 characters
- Examples: DoorDash, Grubhub, Food Network patterns`,

      // 🏡 LIFESTYLE DOMAINS
      'Lifestyle': `Generate 25 .com domains for ${subcategory || 'lifestyle'} brands, blogs, or services. Requirements:
- Focus on personal development, home, family, and daily living
- Appeal to lifestyle enthusiasts
- 5-12 characters
- Examples: Pinterest, Houzz, Apartment Therapy patterns`,

      // 💰 FINANCE DOMAINS
      'Finance': `Create 20 professional .com domains for ${subcategory || 'finance'} services, investing, or personal finance. Requirements:
- Focus on trust, security, and growth
- Sound professional and credible
- 4-10 characters
- Examples: PayPal, Square, Robinhood patterns`,

      // 🎓 EDUCATION DOMAINS
      'Education': `Generate 25 .com domains for ${subcategory || 'education'} platforms, online courses, or learning communities. Requirements:
- Focus on knowledge, growth, and skill development
- Sound educational and trustworthy
- 5-12 characters
- Examples: Coursera, Udemy, Khan Academy patterns`,

      // 🌱 HEALTH DOMAINS
      'Health & Wellness': `Create 20 .com domains for ${subcategory || 'health and wellness'} services, products, or content. Requirements:
- Focus on vitality, wellbeing, and self-improvement
- Sound healthy and trustworthy
- 4-10 characters
- Examples: Peloton, Headspace, Calm patterns`,

      // 🚀 SCIENCE DOMAINS
      'Science & Tech': `Generate 20 .com domains for ${subcategory || 'science'} education, research, or media. Requirements:
- Focus on curiosity, discovery, and innovation
- Sound scientific and credible
- 5-12 characters
- Examples: NASA, MIT, Scientific American patterns`,

      // 🌍 TRAVEL DOMAINS
      'Travel': `Create 25 .com domains for ${subcategory || 'travel'} services, blogs, or communities. Requirements:
- Focus on adventure, exploration, and cultural experiences
- Appeal to travelers and adventurers
- 5-12 characters
- Examples: Airbnb, Booking.com, TripAdvisor patterns`,

      // 👥 COMMUNITY DOMAINS
      'Community': `Generate 20 .com domains for ${subcategory || 'online communities'}, social networks, or interest groups. Requirements:
- Focus on connection, sharing, and engagement
- Sound social and welcoming
- 4-10 characters
- Examples: Facebook, Twitter, LinkedIn patterns`,

      // 🎨 CREATIVE DOMAINS
      'Creative Arts': `Create 20 .com domains for ${subcategory || 'creative arts'} platforms, services, or communities. Requirements:
- Focus on creativity, artistry, and expression
- Appeal to artists and creative professionals
- 5-12 characters
- Examples: Behance, Dribbble, DeviantArt patterns`,

      // 🎪 HOBBY DOMAINS
      'Hobbies': `Generate 20 .com domains for ${subcategory || 'hobby'} communities, resources, or services. Requirements:
- Focus on passion, interest, and leisure
- Appeal to hobby enthusiasts
- 5-12 characters
- Examples: Reddit, Instructables, Ravelry patterns`,

      // 🎁 SPECIAL INTERESTS
      'Special Interests': `Create 15 .com domains for ${subcategory || 'special interest'} communities and resources. Requirements:
- Focus on niche interests and specialized communities
- Appeal to specific interest groups
- 5-12 characters
- Examples: Stack Overflow, GitHub, Hacker News patterns`
    };
    
    return basePrompts[category] || `Generate 20 creative .com domains for ${category} related projects, businesses, or communities.`;
  },

  // 🎪 CREATIVE COMBINATION PROMPTS
  generateHybridDomains: (category1, category2) => {
    const hybridPatterns = {
      'Sports+Tech Startups': `Generate 15 innovative .com domains that combine sports with technology. Requirements:
- Examples: sports analytics, fitness tech, esports platforms, smart equipment
- Sound like tech companies in the sports space
- 5-12 characters
- Examples: Strava, Fitbit, Peloton patterns`,
      
      'Food & Drink+Tech Startups': `Create 15 .com domains for food technology startups. Requirements:
- Examples: recipe apps, food delivery tech, smart kitchen devices, nutrition tracking
- Sound like tech companies in the food space
- 5-12 characters
- Examples: DoorDash, Grubhub, Blue Apron patterns`,
      
      'Health & Wellness+Tech Startups': `Generate 15 .com domains for health technology companies. Requirements:
- Examples: telemedicine, health monitoring, wellness apps, medical devices
- Sound like tech companies in the health space
- 5-12 characters
- Examples: Teladoc, 23andMe, Headspace patterns`,
      
      'Finance+Tech Startups': `Create 15 .com domains for financial technology (FinTech). Requirements:
- Examples: digital banking, investment apps, payment systems, crypto platforms
- Sound like tech companies in the finance space
- 5-12 characters
- Examples: Stripe, Square, Robinhood patterns`,
      
      'Education+Tech Startups': `Generate 15 .com domains for education technology (EdTech). Requirements:
- Examples: online learning platforms, educational apps, skill development tools
- Sound like tech companies in the education space
- 5-12 characters
- Examples: Coursera, Udemy, Duolingo patterns`,
      
      'Travel+Community': `Create 15 .com domains that combine travel with social community. Requirements:
- Examples: travel networking, group adventures, local experiences sharing
- Sound like community platforms for travelers
- 5-12 characters
- Examples: Couchsurfing, Meetup, Airbnb patterns`,
      
      'Sports+Community': `Generate 15 .com domains for sports fan communities and networking. Requirements:
- Examples: fan platforms, team communities, sports discussion forums
- Sound like community platforms for sports fans
- 5-12 characters
- Examples: ESPN, Bleacher Report, The Athletic patterns`
    };
    
    const key = `${category1}+${category2}`;
    return hybridPatterns[key] || `Generate 15 creative .com domains that combine ${category1} with ${category2}. Create unique, brandable names for this niche intersection.`;
  },

  // 🚀 EXPERT-LEVEL PROMPTS
  getExpertPrompts: () => [
    {
      name: "VC-READY STARTUP NAMES",
      prompt: `Generate 50 domain names that Silicon Valley VCs would fund. Requirements:
- Sounds like a company that could raise $1M+ seed round
- Professional, tech-forward, scalable sounding
- 6-12 characters, .com only
- No obscure words or hard-to-spell names
- Examples of successful patterns: Stripe, Slack, Zoom, Airbnb, Uber
- Current high-funding trends: AI infrastructure, dev tools, climate tech, web3 infrastructure`
    },
    {
      name: "PREMIUM ONE-WORD DOMAINS", 
      prompt: `Generate 30 premium one-word .com domains that could sell for $5,000+. Requirements:
- Single dictionary words or obvious portmanteaus
- High commercial intent and brand value
- 4-8 characters preferred
- Easy to trademark and build brand around
- Positive connotations and memorable`
    },
    {
      name: "ENTERPRISE B2B DOMAINS",
      prompt: `Generate 40 enterprise-grade domain names for B2B SaaS companies. Requirements:
- Trustworthy and corporate sounding
- Suitable for $50K+ ACV businesses
- Includes words like: solutions, systems, labs, technologies, platforms
- Professional and credible for enterprise sales`
    },
    {
      name: "BRANDABLE CONSUMER DOMAINS",
      prompt: `Generate 35 brandable domain names for consumer-facing businesses. Requirements:
- Easy to remember and pronounce
- Suitable for marketing and advertising
- 4-10 characters
- Memorable and catchy
- Examples: Apple, Google, Tesla, Netflix patterns`
    },
    {
      name: "NICHE MARKETPLACE DOMAINS",
      prompt: `Generate 30 domain names for niche marketplace platforms. Requirements:
- Sound like platforms connecting buyers and sellers
- Include marketplace-specific keywords
- 5-12 characters
- Examples: Etsy, Fiverr, Upwork, Thumbtack patterns`
    }
  ]
};

export default CONTEXT_AWARE_PROMPTS;
