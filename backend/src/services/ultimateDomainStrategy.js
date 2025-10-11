// ULTIMATE GEM DOMAIN STRATEGY 2025
// Timeless, Brandable Domains with Maximum Auction Value
// HumbleWorth Annihilation Protocol

export const GEM_DOMAIN_PROMPT = `
# ULTIMATE GEM DOMAIN GENERATION PROTOCOL
# TIMELESS BRANDABLE DOMAINS ONLY

You are GEM-GPT, the world's most sophisticated brandable domain generator. You create domains that sound like they've existed for decades - timeless, premium, and highly valuable.

## CRITICAL MISSION:
Generate EXACTLY 150 brandable, timeless .com domains that:
- Sound like established luxury brands
- Have immediate auction value of $60+
- Feel like they could be Fortune 500 company names
- Are memorable, pronounceable, and spellable
- 2-3 syllables maximum
- 6-12 characters ideal

## 🚫 STRICT PROHIBITIONS (HumbleWorth Avoids These):

### BANNED PATTERNS:
❌ Trendy suffixes: ly, fy, io, ai, app, tech, dev, hq, hub, base, lab, stack, gen
❌ Hyphens or numbers
❌ Descriptive keyword combinations (TaskFlow, TimeTrack, PayManager)
❌ "Get"/"Go"/"Try" prefixes
❌ Misspelled dictionary words
❌ Doubled letters or awkward phonetics
❌ Overly techy or startup-sounding names
❌ Geographic mismatches
❌ Mythology or obscure references

### REJECTION CRITERIA:
- Sounds like a SaaS startup
- Feels temporary or trendy  
- Difficult to pronounce or spell
- Too descriptive of a service
- Sounds artificial or manufactured

## ✅ GEM DOMAIN PATTERNS (What Actually Sells):

### PATTERN 1: Surname-Style (Most Valuable)
- Sound like established family names or places
- Examples: HumbleWorth, Kensington, Ashworth, Crestwood, Fairhaven, Kingsley, Remington, Ashford, Crestmont, Ellington

### PATTERN 2: Evocative & Abstract  
- Feel like luxury brands or high-end products
- Examples: AuraVista, Solara, Veridia, Lumina, Corvale, Zentari, Elara, Seraphine, Oberon, Valerius

### PATTERN 3: Natural & Elemental
- Inspired by nature, elements, minerals
- Examples: Riverstone, Suncrest, Oakhaven, Pinecrest, Seabrook, Ironwood, Goldcrest, Silverlake, CrystalView, Amberwood

### PATTERN 4: Timeless Business
- Sound like they've been in business for 100 years
- Examples: Crestworth, NobleGate, PrimeTrust, RoyalMark, Imperial, Sovereign, LegacyGroup, Heritage, Tradition, Dynasty

## 🎯 AUCTION VALUE OPTIMIZATION:

### HIGH-VALUE CHARACTERISTICS:
✅ 2 syllables (sometimes 3)
✅ Starts/ends with soft, round sounds  
✅ Feels familiar yet unique
✅ Could be a luxury brand, bank, or law firm
✅ Phonetically simple
✅ Visually balanced

### VALUE MULTIPLIERS:
- Surname-style: 3x value
- Luxury-evoking: 2.5x value  
- Natural/Elemental: 2x value
- Timeless Business: 3x value

## CATEGORY BREAKDOWN (150 Domains):

### TIER 1: Surname Gems (50 domains)
- British-sounding surnames: Ashworth, Kensington, Harrington
- American-establishment: Remington, Ellington, Kingsley  
- European elegance: Montegue, Beaumont, Devereaux

### TIER 2: Luxury Brands (35 domains)
- High-end feel: Seraphine, Valerius, Oberon, Aurelian
- Premium sound: Luxtera, Noblecrest, Regalport, Imperial
- Sophisticated: Corinthe, Venetia, Florentine, Romanoff

### TIER 3: Natural Elements (35 domains)
- Precious materials: Goldcrest, Silverlake, CrystalView
- Nature-inspired: Riverstone, Suncrest, Oakhaven, Pinecrest
- Elemental: AuraVista, Solara, Veridia, Lumina

### TIER 4: Timeless Business (30 domains)
- Established corporations: Crestworth, PrimeTrust, RoyalMark
- Legacy names: Heritage, Tradition, Dynasty, Legacy
- Trust-evoking: TrueNorth, Steadfast, Constant, Evermore

## WORD BANK (Approved Roots):

### Surname Roots:
worth, wood, field, stone, ton, ley, ford, bridge, brook, stream, crest, ridge, view, point, port, gate, mark, trust, group, holdings, partners, capital, ventures, enterprises, properties, management, advisory, consultants, associates, incorporated

### Luxury Roots:
aura, lux, noble, royal, imperial, sovereign, regal, premium, elite, prime, select, preferred, exclusive, private, reserve, signature, legacy, heritage, tradition, dynasty, empire, crown, jewel, pearl, diamond, gold, silver, platinum, crystal, amber

### Natural Roots:
river, stone, brook, field, meadow, grove, forest, wood, oak, pine, cedar, maple, sun, moon, star, sky, cloud, air, fire, water, earth, mountain, valley, hill, ridge, crest, peak, summit, base, shore, beach, bay, harbor, port, island, isle

### Timeless Roots:
true, steady, constant, ever, always, forever, eternal, perpetual, enduring, lasting, strong, firm, solid, stable, secure, safe, trusted, proven, established, recognized, respected, admired, valued, prized, cherished, beloved, favored, preferred, chosen, selected

## GENERATION RULES:

### PHONETIC EXCELLENCE:
- Soft consonants preferred (m, n, l, r)
- Avoid harsh sounds (x, z, k in excess)
- Balanced vowel distribution
- Natural rhythm and flow

### VISUAL APPEAL:
- Even letter distribution
- Ascenders/descenders balanced
- No awkward letter combinations
- Pleasing to read and write

### MEMORABILITY:
- Instantly recognizable
- Easy to recall after hearing once
- Natural spelling intuition
- Positive emotional association

## OUTPUT FORMAT:

Return EXACTLY 150 domains in this numbered format:
1. Ashworth
2. Kensington
3. Riverstone
4. Seraphine
...
150. Crestworth

## QUALITY ASSURANCE:

Before returning each domain, ask:
1. "Would a luxury brand pay $500+ for this?"
2. "Does this sound like it's been a company for 50+ years?"
3. "Is it instantly memorable and spellable?"
4. "Does it avoid all prohibited patterns?"

## EXECUTION:
Generate 150 timeless gem domains that will dominate auctions and make HumbleWorth's portfolio look amateurish. Focus on AUCTION VALUE above all else.
`;

export const GEM_DOMAIN_VALIDATOR = {
  // Military-grade gem domain validation
  validateDomain: (domain) => {
    if (!domain || typeof domain !== 'string') return false;
    
    // Length validation (6-12 characters ideal)
    if (domain.length < 6 || domain.length > 14) return false;
    
    // Character validation (letters only, proper capitalization)
    if (!/^[A-Z][a-z]+$/.test(domain)) return false;
    
    // Syllable count validation (2-3 syllables ideal)
    const syllableCount = this.countSyllables(domain);
    if (syllableCount < 2 || syllableCount > 4) return false;
    
    // Banned pattern validation
    if (this.hasBannedPatterns(domain)) return false;
    
    // Phonetic quality validation
    const phoneticScore = this.calculatePhoneticScore(domain);
    if (phoneticScore < 0.7) return false;
    
    // Brandability validation
    const brandability = this.calculateBrandability(domain);
    if (brandability < 0.8) return false;
    
    // Auction value estimation
    const auctionValue = this.estimateAuctionValue(domain);
    if (auctionValue < 60) return false;
    
    return true;
  },

  // Count syllables for optimal length
  countSyllables: (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  },

  // Check for banned patterns
  hasBannedPatterns: (domain) => {
    const bannedSuffixes = [/ly$/i, /fy$/i, /io$/i, /ai$/i, /app$/i, /tech$/i, /dev$/i, /hq$/i, /hub$/i, /base$/i, /lab$/i, /stack$/i, /gen$/i];
    const bannedPrefixes = [/^get/i, /^go/i, /^try/i];
    const descriptivePatterns = [/task/i, /flow/i, /time/i, /track/i, /pay/i, /manage/i, /cloud/i, /data/i, /smart/i, /quick/i, /fast/i];
    
    if (bannedSuffixes.some(pattern => pattern.test(domain))) return true;
    if (bannedPrefixes.some(pattern => pattern.test(domain))) return true;
    if (descriptivePatterns.some(pattern => pattern.test(domain))) return true;
    if (/[0-9-]/.test(domain)) return true;
    if (/(.)\1\1/.test(domain)) return true; // Triple letters
    
    return false;
  },

  // Calculate phonetic quality
  calculatePhoneticScore: (domain) => {
    let score = 0.5;
    const domainLower = domain.toLowerCase();
    
    // Soft consonants bonus
    const softConsonants = /[mnlr]/g;
    const softMatches = domainLower.match(softConsonants);
    if (softMatches) score += (softMatches.length / domainLower.length) * 0.3;
    
    // Harsh consonants penalty
    const harshConsonants = /[xzqk]/g;
    const harshMatches = domainLower.match(harshConsonants);
    if (harshMatches) score -= (harshMatches.length / domainLower.length) * 0.2;
    
    // Vowel distribution bonus
    const vowels = /[aeiou]/g;
    const vowelMatches = domainLower.match(vowels);
    if (vowelMatches) {
      const vowelRatio = vowelMatches.length / domainLower.length;
      if (vowelRatio >= 0.3 && vowelRatio <= 0.5) score += 0.2;
    }
    
    // Natural rhythm bonus
    if (/^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/i.test(domain)) {
      score += 0.1;
    }
    
    return Math.max(0, Math.min(1, score));
  },

  // Calculate brandability score
  calculateBrandability: (domain) => {
    let score = 0.5;
    
    // Surname-style bonus
    if (this.isSurnameStyle(domain)) score += 0.3;
    
    // Luxury-evoking bonus
    if (this.isLuxuryStyle(domain)) score += 0.2;
    
    // Natural-element bonus
    if (this.isNaturalStyle(domain)) score += 0.2;
    
    // Timeless-business bonus
    if (this.isTimelessBusiness(domain)) score += 0.3;
    
    // Memorability bonus
    if (domain.length >= 8 && domain.length <= 10) score += 0.1;
    
    // Pronunciation bonus
    if (this.isEasyToPronounce(domain)) score += 0.1;
    
    return Math.min(1, score);
  },

  // Style classifiers
  isSurnameStyle: (domain) => {
    const surnamePatterns = [/worth$/i, /wood$/i, /field$/i, /ton$/i, /ley$/i, /ford$/i, /bridge$/i, /brook$/i, /crest$/i, /view$/i, /point$/i, /port$/i, /gate$/i, /mark$/i];
    return surnamePatterns.some(pattern => pattern.test(domain));
  },

  isLuxuryStyle: (domain) => {
    const luxuryWords = ['lux', 'noble', 'royal', 'imperial', 'sovereign', 'regal', 'premium', 'elite', 'prime', 'exclusive', 'signature', 'legacy', 'heritage', 'dynasty', 'crown', 'jewel', 'pearl', 'diamond', 'gold', 'silver', 'platinum', 'crystal', 'amber'];
    return luxuryWords.some(word => domain.toLowerCase().includes(word));
  },

  isNaturalStyle: (domain) => {
    const naturalWords = ['river', 'stone', 'brook', 'field', 'meadow', 'grove', 'forest', 'wood', 'oak', 'pine', 'cedar', 'maple', 'sun', 'moon', 'star', 'sky', 'cloud', 'mountain', 'valley', 'hill', 'ridge', 'crest', 'peak', 'summit', 'shore', 'beach', 'bay', 'harbor', 'island'];
    return naturalWords.some(word => domain.toLowerCase().includes(word));
  },

  isTimelessBusiness: (domain) => {
    const businessWords = ['trust', 'group', 'holdings', 'partners', 'capital', 'ventures', 'enterprises', 'properties', 'management', 'advisory', 'consultants', 'associates', 'incorporated'];
    return businessWords.some(word => domain.toLowerCase().includes(word));
  },

  isEasyToPronounce: (domain) => {
    const difficultPatterns = [/x[^aeiou]/i, /z[^aeiou]/i, /q[^u]/i, /[bcdfghjklmnpqrstvwxyz]{3,}/i];
    return !difficultPatterns.some(pattern => pattern.test(domain));
  },

  // Auction value estimation (CRITICAL)
  estimateAuctionValue: (domain) => {
    let baseValue = 300;
    
    // Style multipliers
    if (this.isSurnameStyle(domain)) baseValue *= 3.0;
    if (this.isLuxuryStyle(domain)) baseValue *= 2.5;
    if (this.isTimelessBusiness(domain)) baseValue *= 2.0;
    if (this.isNaturalStyle(domain)) baseValue *= 1.8;
    
    // Length optimization
    if (domain.length >= 8 && domain.length <= 10) baseValue *= 1.5;
    
    // Phonetic excellence bonus
    const phoneticScore = this.calculatePhoneticScore(domain);
    if (phoneticScore > 0.9) baseValue *= 1.4;
    else if (phoneticScore > 0.8) baseValue *= 1.2;
    
    // Brandability bonus
    const brandability = this.calculateBrandability(domain);
    if (brandability > 0.9) baseValue *= 1.6;
    else if (brandability > 0.8) baseValue *= 1.3;
    
    // Premium suffix bonus
    const premiumSuffixes = [/worth$/i, /crest$/i, /wood$/i, /stone$/i, /field$/i, /trust$/i, /mark$/i];
    if (premiumSuffixes.some(suffix => suffix.test(domain))) {
      baseValue *= 1.4;
    }
    
    return Math.round(Math.max(60, baseValue));
  }
};
