import OpenAI from 'openai';

class UniversalPremiumGenerator {
  constructor() {
    this.openai = null;
  }

  getOpenAI() {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return this.openai;
  }

  async generatePremiumDomains() {
    const prompt = this.getStructuredMasterPrompt();
    
    console.log('🚀 Making SINGLE OpenAI call for 150 structured premium domains...');
    
    const response = await this.getOpenAI().chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,  // Increased for 150 domains
      temperature: 0.7   // Slightly lower for more consistency
    });

    console.log('🔍 Raw AI response:', response.choices[0].message.content.substring(0, 500));
    
    const domains = this.parseStructuredResponse(response.choices[0].message.content);
    
    console.log(`✅ Generated ${domains.length} structured premium domains`);
    return domains;
  }

  getStructuredMasterPrompt() {
    return `
You are a world-class brand naming expert. Generate EXACTLY 150 premium, brandable .com domain names.

CRITICAL REQUIREMENTS:
- ONLY the domain name part (NO ".com" suffix)
- 6-12 characters each
- Only letters, no numbers/hyphens
- Must sound like REAL businesses that could raise $10M+ funding
- Easy to spell, pronounce, and remember
- Strong commercial appeal

STRICT CATEGORY QUOTAS (12 domains per category):
- Tech & Startups: 12 domains (examples: stripe, slack, zoom, figma, linear)
- E-commerce & Retail: 12 domains (examples: shopify, etsy, farfetch)
- Entertainment & Gaming: 12 domains (examples: twitch, spotify, netflix)
- Sports & Fitness: 12 domains (examples: peloton, strava, fitbit)
- Food & Beverage: 12 domains (examples: doordash, ubereats, hellofresh)
- Finance & Investing: 12 domains (examples: robinhood, coinbase, betterment)
- Health & Wellness: 12 domains (examples: calm, headspace, noom)
- Education & Learning: 12 domains (examples: coursera, udemy, duolingo)
- Travel & Adventure: 12 domains (examples: airbnb, booking, hopper)
- Community & Social: 12 domains (examples: linkedin, meetup, discord)
- Lifestyle & Home: 12 domains (examples: wayfair, houzz, pinterest)
- Creative & Arts: 12 domains (examples: behance, dribbble, vsco)
- Science & Tech: 12 domains (examples: spacex, tesla, github)

QUALITY FILTERS - AVOID THESE PATTERNS:
- No "x", "ify", "ly", "pro", "hub" suffixes
- No generic tech jargon ("tech", "cloud", "data")
- No AI-sounding spam names
- Must sound like human-created business names

OUTPUT FORMAT - JSON ONLY:
{
  "tech": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "ecommerce": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "entertainment": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "sports": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "food": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "finance": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "health": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "education": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "travel": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "community": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "lifestyle": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "creative": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"],
  "science": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12"]
}
`;
  }

  parseStructuredResponse(text) {
    try {
      // Try to parse as JSON first
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        console.log('📊 Successfully parsed JSON response');
        
        // Flatten all categories into one array
        const allDomains = Object.values(data).flat();
        
        // Filter and validate
        const validDomains = allDomains
          .map(domain => domain.toLowerCase().replace(/[^a-z]/g, ''))
          .filter(domain => this.isHighQualityDomain(domain));
        
        console.log(`📈 Category breakdown: ${Object.keys(data).map(cat => `${cat}:${data[cat].length}`).join(', ')}`);
        return validDomains.slice(0, 150);
      }
      
      // Fallback to original parsing if JSON fails
      console.log('⚠️ JSON parsing failed, falling back to text parsing');
      return this.parseDomainsFallback(text);
      
    } catch (error) {
      console.error('❌ JSON parsing error, using fallback:', error.message);
      return this.parseDomainsFallback(text);
    }
  }

  parseDomainsFallback(text) {
    return text.split('\n')
      .map(line => {
        let domain = line.trim()
          .toLowerCase()
          .replace(/^\d+\.\s*/, '')
          .replace(/\s*\.com\s*$/i, '')
          .replace(/[^a-z]/g, '');
        return domain;
      })
      .filter(domain => this.isHighQualityDomain(domain))
      .slice(0, 150);
  }

  isHighQualityDomain(domain) {
    if (!domain || domain.length < 6 || domain.length > 12) return false;
    if (!/^[a-z]+$/.test(domain)) return false;
    
    // Quality filters
    const badPatterns = [
      /[0-9]/,                          // No numbers
      /(test|demo|example)/i,           // No test words
      /(x|ify|ly|pro|hub|tech|cloud|data)$/, // No spam suffixes
      /([a-z])\1{2,}/,                  // No repeated letters
      /(my|the|best|top|free|cheap)/i   // No weak prefixes
    ];
    
    if (badPatterns.some(pattern => pattern.test(domain))) return false;
    
    // Positive indicators
    const goodIndicators = [
      domain.length >= 6 && domain.length <= 10,
      /[aeiou]/.test(domain),           // Has vowels
      !/[xzqjv]{2,}/.test(domain),      // Not too complex
      !/(sad|bad|mad|die|kill)/i.test(domain) // Positive sound
    ];
    
    return goodIndicators.filter(Boolean).length >= 3;
  }

  analyzeCategoryDistribution(domains) {
    const categories = {
      tech: domains.filter(d => /(ai|saas|fin|tech|app)/.test(d)),
      ecommerce: domains.filter(d => /(shop|store|market|buy|cart)/.test(d)),
      finance: domains.filter(d => /(bank|wealth|capital|invest|trade)/.test(d)),
      health: domains.filter(d => /(health|well|fit|care|mind|body)/.test(d)),
      creative: domains.filter(d => /(art|design|creative|studio|craft)/.test(d)),
      other: domains.filter(d => !/(tech|shop|wealth|health|art)/.test(d))
    };
    
    console.log('📊 Final Category Distribution:');
    Object.entries(categories).forEach(([category, list]) => {
      console.log(`   ${category}: ${list.length} domains`);
    });
    
    return categories;
  }
}

export default UniversalPremiumGenerator;
