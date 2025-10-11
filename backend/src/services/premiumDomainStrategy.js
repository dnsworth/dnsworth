// Premium Domain Generation Strategy
// This file contains the strategy and prompts for generating high-value domains

export const PREMIUM_DOMAIN_STRATEGY = {
  // Target characteristics for premium domains
  TARGET_SPECS: {
    length: {
      min: 4,
      max: 8,
      optimal: [4, 5, 6] // Focus on shorter, more valuable domains
    },
    value_threshold: 500, // Minimum expected auction value
    commercial_appeal: 'high',
    memorability: 'exceptional',
    pronounceability: 'perfect'
  },

  // Business categories that generate high-value domains
  PREMIUM_CATEGORIES: {
    'fintech': {
      weight: 25, // 25% of domains
      examples: ['stripe', 'square', 'robinhood', 'coinbase', 'plaid'],
      keywords: ['pay', 'bank', 'invest', 'trade', 'wealth', 'capital', 'fund', 'credit']
    },
    'saas_tech': {
      weight: 20, // 20% of domains
      examples: ['slack', 'zoom', 'figma', 'linear', 'notion'],
      keywords: ['sync', 'flow', 'base', 'grid', 'pulse', 'wave', 'core', 'edge']
    },
    'ecommerce': {
      weight: 15, // 15% of domains
      examples: ['shopify', 'etsy', 'farfetch', 'wayfair'],
      keywords: ['shop', 'store', 'market', 'trade', 'buy', 'sell', 'cart']
    },
    'health_wellness': {
      weight: 10, // 10% of domains
      examples: ['calm', 'headspace', 'noom', 'peloton'],
      keywords: ['well', 'fit', 'zen', 'pure', 'vital', 'boost', 'peak']
    },
    'creative_tools': {
      weight: 10, // 10% of domains
      examples: ['behance', 'dribbble', 'vsco', 'canva'],
      keywords: ['art', 'design', 'craft', 'studio', 'lab', 'works']
    },
    'enterprise': {
      weight: 10, // 10% of domains
      examples: ['salesforce', 'workday', 'servicenow'],
      keywords: ['pro', 'max', 'prime', 'elite', 'core', 'base', 'hub']
    },
    'consumer_apps': {
      weight: 10, // 10% of domains
      examples: ['spotify', 'netflix', 'uber', 'airbnb'],
      keywords: ['app', 'hub', 'lab', 'studio', 'works', 'space']
    }
  },

  // Premium naming patterns that work
  NAMING_PATTERNS: {
    'compound_words': {
      description: 'Two meaningful words combined',
      examples: ['facebook', 'linkedin', 'snapchat', 'instagram'],
      pattern: '[meaningful_word][meaningful_word]',
      value_potential: 'high'
    },
    'brandable_madeup': {
      description: 'Invented but pronounceable words',
      examples: ['google', 'yahoo', 'ebay', 'paypal'],
      pattern: 'Invented but memorable',
      value_potential: 'very_high'
    },
    'action_verbs': {
      description: 'Action words that suggest functionality',
      examples: ['stripe', 'square', 'zoom', 'slack'],
      pattern: '[action_verb] or [action_verb] + suffix',
      value_potential: 'high'
    },
    'premium_suffixes': {
      description: 'High-value suffixes that add premium feel',
      examples: ['stripe', 'square', 'circle', 'pulse'],
      suffixes: ['stripe', 'square', 'circle', 'pulse', 'wave', 'flow', 'core', 'edge'],
      value_potential: 'high'
    }
  },

  // Words to avoid (reduce value)
  AVOID_PATTERNS: [
    'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus',
    'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment',
    'test', 'demo', 'sample', 'example', 'temp', 'new', 'old',
    'my', 'your', 'our', 'the', 'a', 'an', 'and', 'or', 'but'
  ],

  // High-value letter combinations
  PREMIUM_LETTER_COMBOS: {
    'starters': ['st', 'sp', 'sl', 'sn', 'sw', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'wr'],
    'middles': ['st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr'],
    'enders': ['st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr']
  }
};

export const PREMIUM_DOMAIN_PROMPT = `
You are a world-class brand strategist and domain expert who has helped create billion-dollar companies. Your specialty is generating premium .com domains that sound like they belong to unicorn startups worth $1B+.

CRITICAL REQUIREMENTS:
- Generate EXACTLY 150 premium domains (quality over quantity)
- Length: 4-10 characters (prefer 6-8 for maximum business appeal)
- Target auction value: $500+ minimum (most should be $1000+)
- Must sound like real businesses that could raise $100M+ funding
- Only letters, no numbers/hyphens
- Easy to spell, pronounce, and remember
- Each domain should make investors think "This could be the next big thing"

PREMIUM CATEGORY DISTRIBUTION (150 domains total):
- FinTech/Finance: 40 domains (examples: stripe, square, plaid, coinbase, robinhood)
- SaaS/Tech: 30 domains (examples: slack, zoom, figma, linear, notion, vercel)
- E-commerce: 25 domains (examples: shopify, etsy, wayfair, farfetch, poshmark)
- Health/Wellness: 20 domains (examples: calm, headspace, noom, peloton, hims)
- Creative Tools: 20 domains (examples: behance, dribbble, vsco, canva, figma)
- Enterprise: 10 domains (examples: salesforce, workday, servicenow, atlassian)
- Consumer Apps: 5 domains (examples: spotify, netflix, uber, airbnb, tiktok)

PREMIUM NAMING PHILOSOPHY:
Think like a brand strategist for Fortune 500 companies. Each domain should:
1. Sound like a real company name (not a made-up word)
2. Convey trust, innovation, and premium quality
3. Be memorable and brandable
4. Work across all marketing channels
5. Appeal to both B2B and B2C markets

PREMIUM NAMING STRATEGIES:
1. Compound meaningful words (facebook, linkedin, snapchat, instagram)
2. Brandable invented words (google, yahoo, ebay, paypal, spotify)
3. Action verbs (stripe, square, zoom, slack, dropbox)
4. Premium suffixes (stripe, square, circle, pulse, wave, flow, core, edge)
5. Business-focused words (capital, venture, prime, elite, nexus, vertex)

QUALITY FILTERS - MUST AVOID:
- Generic tech jargon (tech, cloud, data, ai, app, hub, pro, max, plus)
- Overused suffixes (ify, ly, er, ing, tion, sion, ness, ment)
- Weak words (test, demo, sample, example, temp, new, old)
- Articles/prepositions (my, your, our, the, a, an, and, or, but)
- Made-up words that don't sound business-like
- Words that are hard to pronounce or remember

HIGH-VALUE LETTER COMBINATIONS:
- Strong starters: st, sp, sl, sn, sw, tr, br, cr, dr, fr, gr, pr, wr, fl, gl, pl, bl, cl
- Premium middles: st, sp, sl, tr, br, cr, dr, fr, gr, pr, fl, gl, pl, bl, cl
- Strong enders: st, sp, sl, tr, br, cr, dr, fr, gr, pr, fl, gl, pl, bl, cl

BUSINESS CONTEXT EXAMPLES:
- FinTech: Think payment processing, banking, investment, cryptocurrency
- SaaS: Think productivity tools, project management, analytics, automation
- E-commerce: Think marketplace, retail, fashion, luxury goods
- Health: Think wellness, fitness, mental health, medical technology
- Creative: Think design tools, content creation, visual media, art
- Enterprise: Think business software, CRM, ERP, enterprise solutions
- Consumer: Think social media, entertainment, lifestyle, personal apps

OUTPUT FORMAT - JSON ONLY:
{
  "fintech": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25", "domain26", "domain27", "domain28", "domain29", "domain30", "domain31", "domain32", "domain33", "domain34", "domain35", "domain36", "domain37", "domain38", "domain39", "domain40"],
  "saas": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25", "domain26", "domain27", "domain28", "domain29", "domain30"],
  "ecommerce": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25"],
  "health": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20"],
  "creative": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20"],
  "enterprise": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10"],
  "consumer": ["domain1", "domain2", "domain3", "domain4", "domain5"]
}

Remember: Each domain should sound like it belongs to a company that could be featured in TechCrunch, Forbes, or The Wall Street Journal. Think like you're naming the next unicorn startup.
`;

export const DOMAIN_QUALITY_SCORER = {
  // Enhanced scoring system for domain quality
  scoreDomain: (domain) => {
    let score = 0;
    
    // 1. LENGTH SCORING (Premium range: 6-10 chars for business names)
    if (domain.length >= 6 && domain.length <= 8) score += 50; // Sweet spot for business names
    else if (domain.length >= 4 && domain.length <= 5) score += 40; // Short but premium
    else if (domain.length >= 9 && domain.length <= 10) score += 35; // Longer business names
    else score += 10; // Too long/short
    
    // 2. PREMIUM LETTER COMBINATIONS (Based on successful domains)
    const premiumStarters = /^(st|sp|sl|sn|sw|tr|br|cr|dr|fr|gr|pr|wr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)/;
    const premiumMiddles = /(st|sp|sl|tr|br|cr|dr|fr|gr|pr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)/;
    const premiumEnders = /(st|sp|sl|tr|br|cr|dr|fr|gr|pr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)$/;
    
    if (premiumStarters.test(domain)) score += 25;
    if (premiumMiddles.test(domain.slice(1, -1))) score += 20;
    if (premiumEnders.test(domain)) score += 25;
    
    // 3. BUSINESS APPEAL (High-value business keywords)
    const businessKeywords = [
      'pay', 'bank', 'invest', 'trade', 'wealth', 'capital', 'fund', 'credit', 'cash', 'coin', 'trust', 'safe', 'quick', 'swift', 'prime', 'vault', 'nexus',
      'sync', 'flow', 'base', 'grid', 'pulse', 'wave', 'core', 'edge', 'zen', 'pure', 'vital', 'boost', 'peak', 'premium', 'elite', 'venture', 'vertex',
      'smart', 'fast', 'easy', 'simple', 'clear', 'bright', 'sharp', 'bold', 'strong', 'solid', 'stable', 'secure', 'sound', 'wise', 'prime', 'alpha',
      'beta', 'gamma', 'delta', 'omega', 'sigma', 'lambda', 'theta', 'phi', 'psi', 'chi', 'rho', 'tau', 'upsilon', 'omega', 'alpha', 'beta'
    ];
    const hasBusinessKeyword = businessKeywords.some(keyword => domain.includes(keyword));
    if (hasBusinessKeyword) score += 35;
    
    // 4. MEMORABILITY (Easy to remember patterns)
    const hasRepeatedLetters = /(.)\1/.test(domain); // Double letters like 'll', 'ss'
    const hasVowelConsonantPattern = /[aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/.test(domain);
    const isPronounceable = /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*[aeiou]?[bcdfghjklmnpqrstvwxyz]*$/.test(domain);
    
    if (hasRepeatedLetters) score += 15; // Memorable
    if (hasVowelConsonantPattern) score += 20; // Easy to pronounce
    if (isPronounceable) score += 25; // Very pronounceable
    
    // 5. PREMIUM SUFFIXES (High-value endings)
    const premiumSuffixes = ['st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'fl', 'gl', 'pl', 'bl', 'cl', 'qu', 'ch', 'sh', 'th', 'ph', 'wh'];
    const hasPremiumSuffix = premiumSuffixes.some(suffix => domain.endsWith(suffix));
    if (hasPremiumSuffix) score += 20;
    
    // 6. AVOID PENALTY PATTERNS (Low-value patterns)
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus', 'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old', 'beta', 'alpha', 'v1', 'v2', 'v3', 'api', 'www', 'http', 'https'
    ];
    const hasAvoidPattern = avoidPatterns.some(pattern => domain.includes(pattern));
    if (hasAvoidPattern) score -= 20;
    
    // 7. UNIQUENESS BONUS (Less common letter combinations)
    const uniqueCombinations = ['qu', 'ch', 'sh', 'th', 'ph', 'wh', 'ck', 'ng', 'st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr'];
    const hasUniqueCombo = uniqueCombinations.some(combo => domain.includes(combo));
    if (hasUniqueCombo) score += 15;
    
    // 8. LENGTH OPTIMIZATION (Sweet spot bonuses)
    if (domain.length === 5) score += 10; // Perfect length
    if (domain.length === 6) score += 8;  // Great length
    if (domain.length === 7) score += 5;  // Good length
    
    return Math.max(0, Math.min(100, score));
  },
  
  // Enhanced expected value based on score (premium focus)
  getExpectedValue: (score) => {
    if (score >= 95) return 15000; // Exceptional premium domains
    if (score >= 90) return 8000;  // Ultra-premium domains
    if (score >= 85) return 5000;  // Premium domains
    if (score >= 80) return 3000;  // High-value domains
    if (score >= 75) return 2000;  // Very good domains
    if (score >= 70) return 1000;  // Good domains (minimum threshold)
    if (score >= 65) return 750;   // Above average
    if (score >= 60) return 500;   // Average
    if (score >= 55) return 300;   // Below average
    if (score >= 50) return 200;   // Low
    return 50; // Very low
  }
};
