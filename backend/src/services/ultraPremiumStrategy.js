// Ultra-Premium Domain Generation Strategy
// Focus on generating truly high-value domains with $500+ auction values

export const ULTRA_PREMIUM_PROMPT = `
You are a world-renowned domain expert and brand strategist who has helped create billion-dollar companies like Google, Facebook, Amazon, and Tesla. Your specialty is identifying and generating ultra-premium .com domains that command $200-$100,000+ at auction.

CRITICAL REQUIREMENTS:
- Generate EXACTLY 150 ultra-premium domains
- Target auction value: $200+ minimum (most should be $1,000+)
- Length: 6-12 characters ONLY (prefer 7-10 for maximum premium value)
- Must sound like established billion-dollar companies
- Only letters, no numbers/hyphens
- Easy to spell, pronounce, and remember
- Each domain should make investors think "This could be the next unicorn"

ULTRA-PREMIUM CATEGORY DISTRIBUTION (150 domains total):
- FinTech/Finance: 50 domains (examples: stripe, square, plaid, coinbase, robinhood, paypal, venmo, cashapp, chime, sofi)
- SaaS/Tech: 40 domains (examples: slack, zoom, figma, linear, notion, vercel, github, docker, kubernetes, terraform)
- E-commerce: 30 domains (examples: shopify, etsy, wayfair, farfetch, poshmark, mercari, depop, grailed, stockx, goat)
- Health/Wellness: 20 domains (examples: calm, headspace, noom, peloton, hims, hers, roman, ro, lemonade, oscar)
- Creative Tools: 10 domains (examples: behance, dribbble, vsco, canva, figma, sketch, framer, webflow, bubble, zapier)

ULTRA-PREMIUM NAMING PHILOSOPHY:
Think like you're naming the next Fortune 500 company. Each domain should:
1. Sound like an established, successful business
2. Convey trust, innovation, and premium quality
3. Be instantly memorable and brandable
4. Work across all marketing channels
5. Appeal to both B2B and B2C markets
6. Sound like it could raise $100M+ in Series A

ULTRA-PREMIUM NAMING STRATEGIES:
1. Compound meaningful words (facebook, linkedin, snapchat, instagram, whatsapp, netflix, spotify, airbnb, uber, tiktok)
2. Brandable invented words (google, yahoo, ebay, paypal, spotify, slack, zoom, figma, linear, notion)
3. Action verbs (stripe, square, zoom, slack, dropbox, shopify, etsy, wayfair, farfetch, poshmark)
4. Premium suffixes (stripe, square, circle, pulse, wave, flow, core, edge, apex, vertex, nexus, prime)
5. Business-focused words (capital, venture, prime, elite, nexus, vertex, apex, summit, peak, crown)
6. Short memorable brands (uber, zoom, slack, figma, linear, notion, vercel, github, docker, kubernetes)
7. Professional sounding names (stripe, square, plaid, coinbase, robinhood, paypal, venmo, cashapp, chime, sofi)

QUALITY FILTERS - MUST AVOID:
- Generic tech jargon (tech, cloud, data, ai, app, hub, pro, max, plus)
- Overused suffixes (ify, ly, er, ing, tion, sion, ness, ment)
- Weak words (test, demo, sample, example, temp, new, old)
- Articles/prepositions (my, your, our, the, a, an, and, or, but)
- Made-up words that don't sound business-like
- Words that are hard to pronounce or remember
- Generic combinations (techhub, cloudapp, datapro, aihub)

HIGH-VALUE LETTER COMBINATIONS:
- Strong starters: st, sp, sl, sn, sw, tr, br, cr, dr, fr, gr, pr, wr, fl, gl, pl, bl, cl, qu, ch, sh, th, ph, wh
- Premium middles: st, sp, sl, tr, br, cr, dr, fr, gr, pr, fl, gl, pl, bl, cl, qu, ch, sh, th, ph, wh
- Strong enders: st, sp, sl, tr, br, cr, dr, fr, gr, pr, fl, gl, pl, bl, cl, qu, ch, sh, th, ph, wh

BUSINESS CONTEXT EXAMPLES:
- FinTech: Think payment processing, banking, investment, cryptocurrency, insurance, lending
- SaaS: Think productivity tools, project management, analytics, automation, collaboration
- E-commerce: Think marketplace, retail, fashion, luxury goods, resale, dropshipping
- Health: Think wellness, fitness, mental health, medical technology, telemedicine
- Creative: Think design tools, content creation, visual media, art, photography

OUTPUT FORMAT - JSON ONLY:
{
  "fintech": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25", "domain26", "domain27", "domain28", "domain29", "domain30", "domain31", "domain32", "domain33", "domain34", "domain35", "domain36", "domain37", "domain38", "domain39", "domain40", "domain41", "domain42", "domain43", "domain44", "domain45", "domain46", "domain47", "domain48", "domain49", "domain50"],
  "saas": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25", "domain26", "domain27", "domain28", "domain29", "domain30", "domain31", "domain32", "domain33", "domain34", "domain35", "domain36", "domain37", "domain38", "domain39", "domain40"],
  "ecommerce": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20", "domain21", "domain22", "domain23", "domain24", "domain25", "domain26", "domain27", "domain28", "domain29", "domain30"],
  "health": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10", "domain11", "domain12", "domain13", "domain14", "domain15", "domain16", "domain17", "domain18", "domain19", "domain20"],
  "creative": ["domain1", "domain2", "domain3", "domain4", "domain5", "domain6", "domain7", "domain8", "domain9", "domain10"]
}

Remember: Each domain should sound like it belongs to a company that could be featured in TechCrunch, Forbes, or The Wall Street Journal. Think like you're naming the next unicorn startup that will be worth $1B+.
`;

export const ULTRA_PREMIUM_SCORER = {
  // Ultra-premium scoring system for domain quality
  scoreDomain: (domain) => {
    let score = 0;
    
  // 1. LENGTH SCORING (Premium range: 7-10 chars for maximum value)
  if (domain.length >= 7 && domain.length <= 10) score += 60; // Sweet spot for premium domains
  else if (domain.length >= 6 && domain.length <= 12) score += 40; // Good range
  else score += 10; // Too long/short
    
    // 2. ULTRA-PREMIUM LETTER COMBINATIONS (Based on successful domains)
    const ultraPremiumStarters = /^(st|sp|sl|sn|sw|tr|br|cr|dr|fr|gr|pr|wr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)/;
    const ultraPremiumMiddles = /(st|sp|sl|tr|br|cr|dr|fr|gr|pr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)/;
    const ultraPremiumEnders = /(st|sp|sl|tr|br|cr|dr|fr|gr|pr|fl|gl|pl|bl|cl|qu|ch|sh|th|ph|wh)$/;
    
    if (ultraPremiumStarters.test(domain)) score += 30;
    if (ultraPremiumMiddles.test(domain.slice(1, -1))) score += 25;
    if (ultraPremiumEnders.test(domain)) score += 30;
    
    // 3. ULTRA-PREMIUM BUSINESS APPEAL (High-value business keywords)
    const ultraBusinessKeywords = [
      'pay', 'bank', 'invest', 'trade', 'wealth', 'capital', 'fund', 'credit', 'cash', 'coin', 'trust', 'safe', 'quick', 'swift', 'prime', 'vault', 'nexus',
      'sync', 'flow', 'base', 'grid', 'pulse', 'wave', 'core', 'edge', 'zen', 'pure', 'vital', 'boost', 'peak', 'premium', 'elite', 'venture', 'vertex',
      'smart', 'fast', 'easy', 'simple', 'clear', 'bright', 'sharp', 'bold', 'strong', 'solid', 'stable', 'secure', 'sound', 'wise', 'prime', 'alpha',
      'beta', 'gamma', 'delta', 'omega', 'sigma', 'lambda', 'theta', 'phi', 'psi', 'chi', 'rho', 'tau', 'upsilon', 'omega', 'alpha', 'beta',
      'stripe', 'square', 'circle', 'pulse', 'wave', 'flow', 'core', 'edge', 'apex', 'vertex', 'nexus', 'prime', 'elite', 'crown', 'summit', 'peak'
    ];
    const hasUltraBusinessKeyword = ultraBusinessKeywords.some(keyword => domain.includes(keyword));
    if (hasUltraBusinessKeyword) score += 40;
    
    // 4. MEMORABILITY (Easy to remember patterns)
    const hasRepeatedLetters = /(.)\1/.test(domain); // Double letters like 'll', 'ss'
    const hasVowelConsonantPattern = /[aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/.test(domain);
    const isPronounceable = /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*[aeiou]?[bcdfghjklmnpqrstvwxyz]*$/.test(domain);
    
    if (hasRepeatedLetters) score += 20; // Memorable
    if (hasVowelConsonantPattern) score += 25; // Easy to pronounce
    if (isPronounceable) score += 30; // Very pronounceable
    
    // 5. ULTRA-PREMIUM SUFFIXES (High-value endings)
    const ultraPremiumSuffixes = ['st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'fl', 'gl', 'pl', 'bl', 'cl', 'qu', 'ch', 'sh', 'th', 'ph', 'wh'];
    const hasUltraPremiumSuffix = ultraPremiumSuffixes.some(suffix => domain.endsWith(suffix));
    if (hasUltraPremiumSuffix) score += 25;
    
    // 6. AVOID PENALTY PATTERNS (Low-value patterns)
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus', 'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old', 'beta', 'alpha', 'v1', 'v2', 'v3', 'api', 'www', 'http', 'https',
      'pivot', 'spar', 'whirl', 'glow', 'spark', 'craze', 'swap', 'pulse', 'trend', 'style', 'shop', 'buy', 'sell', 'get', 'go'
    ];
    const hasAvoidPattern = avoidPatterns.some(pattern => domain.includes(pattern));
    if (hasAvoidPattern) score -= 30;
    
    // 7. UNIQUENESS BONUS (Less common letter combinations)
    const uniqueCombinations = ['qu', 'ch', 'sh', 'th', 'ph', 'wh', 'ck', 'ng', 'st', 'sp', 'sl', 'tr', 'br', 'cr', 'dr', 'fr', 'gr', 'pr'];
    const hasUniqueCombo = uniqueCombinations.some(combo => domain.includes(combo));
    if (hasUniqueCombo) score += 20;
    
  // 8. LENGTH OPTIMIZATION (Sweet spot bonuses)
  if (domain.length === 7) score += 15; // Perfect length
  if (domain.length === 8) score += 12;  // Great length
  if (domain.length === 9) score += 8;  // Good length
    
    // 9. ULTRA-PREMIUM BONUS (Domains that sound like established companies)
    const ultraPremiumPatterns = [
      /^[a-z]{7,10}$/, // 7-10 character domains
      /^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]/, // CVCVC pattern
      /^[aeiou][bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/, // VCVCV pattern
    ];
    const hasUltraPremiumPattern = ultraPremiumPatterns.some(pattern => pattern.test(domain));
    if (hasUltraPremiumPattern) score += 25;
    
    return Math.max(0, Math.min(100, score));
  },
  
  // Ultra-premium expected value based on score
  getExpectedValue: (score) => {
    if (score >= 95) return 100000; // Exceptional ultra-premium domains
    if (score >= 90) return 50000;  // Ultra-premium domains
    if (score >= 85) return 25000;  // Premium domains
    if (score >= 80) return 15000;  // High-value domains
    if (score >= 75) return 10000;  // Very good domains
    if (score >= 70) return 5000;   // Good domains
    if (score >= 65) return 2500;   // Above average
    if (score >= 60) return 1000;   // Average
    if (score >= 55) return 500;    // Below average
    if (score >= 50) return 250;    // Low
    return 200; // Minimum threshold for auction value
  }
};
