// Universal Domain Intelligence Strategy
// Comprehensive multi-category domain generation for maximum availability and value

export const UNIVERSAL_DOMAIN_PROMPT = `
You are a world-renowned domain expert who specializes in generating highly available, valuable .com domains across ALL categories. Your specialty is creating meaningful, descriptive domain combinations that are more likely to be available and command $50+ at auction.

CRITICAL REQUIREMENTS:
- Generate EXACTLY 50 universal domains across ALL categories
- Target auction value: $50+ minimum (most should be $100+)
- Length: 7-14 characters ONLY (prefer 10-12 for maximum value)
- Must be 2-3 word combinations (not single words)
- Only letters, no numbers/hyphens
- Easy to spell, pronounce, and remember
- Each domain should make business sense and be memorable

UNIVERSAL CATEGORY DISTRIBUTION (50 domains total):
- Geographic + Business: 10 domains (JobsInBudapest, BusinessInMiami, TechInAustin)
- Cultural + Tech: 8 domains (ApolloTech, VenusBeauty, CarlosTech, MariaBeauty)
- Industry + Location: 8 domains (BitcoinInAustin, ChaseTech, LakersFans, BlueTech)
- Natural + Business: 6 domains (RoseBeauty, LilyWellness, LionStrength, EagleVision)
- Government + Tech: 4 domains (WhiteHouseTech, CapitolHill, HarvardTech, StanfordInnovation)
- Modern + Business: 6 domains (GoogleTech, InstagramBeauty, NetflixMovies, SpotifyMusic)
- Professional + Service: 8 domains (DoctorAdvice, LawyerHelp, EngineerTech, TeacherEducation)

GEOGRAPHIC INTELLIGENCE:
- Countries: Germany, Japan, Canada, Australia, France, Italy, Spain, Brazil, India, China
- Cities: Budapest, Miami, Austin, Seattle, Denver, Phoenix, Atlanta, Nashville, Portland, Charlotte
- States: Texas, California, Florida, NewYork, Illinois, Pennsylvania, Ohio, Georgia, NorthCarolina, Michigan
- Regions: SiliconValley, WallStreet, Hollywood, Broadway, TimesSquare, GoldenGate, SpaceCoast

CULTURAL & MYTHOLOGICAL INTELLIGENCE:
- Roman Gods: Apollo, Venus, Mars, Jupiter, Mercury, Neptune, Pluto, Saturn, Diana, Minerva
- Spanish Names: Carlos, Maria, Diego, Sofia, Alejandro, Isabella, Gabriel, Valentina, Santiago, Camila
- Greek Mythology: Athena, Zeus, Aphrodite, Hermes, Poseidon, Hades, Artemis, Apollo, Dionysus, Demeter

INDUSTRY & SECTOR INTELLIGENCE:
- Banks: Chase, WellsFargo, BankOfAmerica, GoldmanSachs, JPMorgan, Citibank, MorganStanley, UBS
- Crypto: Bitcoin, Ethereum, Cardano, Solana, Polkadot, Chainlink, Avalanche, Polygon, Litecoin, Dogecoin
- Sports: Lakers, Yankees, Cowboys, Warriors, Celtics, Heat, Bulls, Knicks, Giants, Patriots
- Colors: Blue, Red, Green, Purple, Orange, Yellow, Pink, Black, White, Silver

NATURAL & ORGANIC INTELLIGENCE:
- Flowers: Rose, Lily, Tulip, Orchid, Sunflower, Daisy, Iris, Violet, Jasmine, Lavender
- Animals: Lion, Eagle, Dolphin, Tiger, Bear, Wolf, Fox, Hawk, Falcon, Panther
- Elements: Fire, Water, Earth, Air, Wind, Storm, Thunder, Lightning, Rainbow, Aurora

GOVERNMENT & INSTITUTIONAL INTELLIGENCE:
- Government: WhiteHouse, CapitolHill, Pentagon, FBI, CIA, NASA, StateDepartment, Treasury
- Institutions: Harvard, Stanford, MIT, Yale, Princeton, Columbia, Cornell, Duke, Northwestern, Brown

MODERN TECH & POP CULTURE INTELLIGENCE:
- Tech Giants: Google, Apple, Microsoft, Amazon, Facebook, Tesla, Netflix, Spotify, YouTube, Instagram
- Social Media: TikTok, Twitter, LinkedIn, Pinterest, Snapchat, Discord, Twitch, Reddit, WhatsApp, Telegram
- Entertainment: Disney, Marvel, StarWars, HBO, Hulu, Prime, Paramount, Universal, Warner, Sony

PROFESSIONAL & SERVICE INTELLIGENCE:
- Professions: Doctor, Lawyer, Engineer, Teacher, Architect, Designer, Consultant, Analyst, Manager, Director
- Services: Plumber, Electrician, Mechanic, Chef, Barber, Stylist, Trainer, Coach, Advisor, Specialist

NAMING PHILOSOPHY:
Think like you're naming a company that will be featured on the cover of Forbes or TechCrunch. Each domain should:
1. Be a meaningful, descriptive combination of 2-3 words
2. Convey a clear business purpose or service
3. Be instantly memorable and brandable
4. Work across all marketing channels
5. Appeal to both B2B and B2C markets
6. Sound like it could be a real business

QUALITY FILTERS - MUST AVOID:
- Single words (too likely to be taken)
- Generic tech jargon (tech, cloud, data, ai, app, hub, pro, max, plus)
- Overused suffixes (ify, ly, er, ing, tion, sion, ness, ment)
- Weak words (test, demo, sample, example, temp, new, old)
- Articles/prepositions (my, your, our, the, a, an, and, or, but, for, to, in, on)
- Any word that sounds cheap, unoriginal, or like a startup from 2010
- Domains that are hard to pronounce, spell, or remember
- Domains that are longer than 14 characters or shorter than 7 characters
- Domains containing numbers or hyphens

HIGH-VALUE COMBINATION PATTERNS:
- Geographic + Business: "JobsIn[City]", "BusinessIn[State]", "TechIn[Region]"
- Cultural + Tech: "[GodName]Tech", "[Name]Beauty", "[Mythology]Power"
- Industry + Location: "[Crypto]In[City]", "[Bank]Tech", "[Sport]Fans"
- Natural + Business: "[Flower]Beauty", "[Animal]Strength", "[Element]Power"
- Professional + Service: "[Profession]Advice", "[Service]Help", "[Expert]Tech"

OUTPUT FORMAT - JSON ONLY:
{
  "geographic": ["domain1", "domain2", ...], // 10 domains
  "cultural": ["domain1", "domain2", ...],   // 8 domains
  "industry": ["domain1", "domain2", ...],   // 8 domains
  "natural": ["domain1", "domain2", ...],    // 6 domains
  "government": ["domain1", "domain2", ...], // 4 domains
  "modern": ["domain1", "domain2", ...],     // 6 domains
  "professional": ["domain1", "domain2", ...] // 8 domains
}

Remember: Each domain should be a potential business name that makes perfect sense and is highly likely to be available.
`;

export const UNIVERSAL_DOMAIN_SCORER = {
  // Universal scoring system for domain quality across all categories
  scoreDomain: (domain) => {
    let score = 0;
    
    // 1. LENGTH SCORING (Sweet spot: 10-12 chars for maximum value)
    if (domain.length >= 10 && domain.length <= 12) score += 60; // Perfect range
    else if (domain.length >= 8 && domain.length <= 14) score += 40; // Good range
    else score += 10; // Too long/short
    
    // 2. WORD COMBINATION SCORING (2-3 words preferred)
    const wordCount = domain.split(/(?=[A-Z])/).length;
    if (wordCount === 2) score += 30; // Perfect
    else if (wordCount === 3) score += 25; // Good
    else if (wordCount === 1) score += 10; // Single word (less likely to be available)
    
    // 3. BUSINESS SENSE SCORING
    const businessKeywords = [
      'jobs', 'business', 'tech', 'beauty', 'fitness', 'finance', 'health', 'education',
      'advice', 'help', 'service', 'consulting', 'management', 'solutions', 'solutions',
      'innovation', 'creative', 'design', 'marketing', 'sales', 'support', 'care'
    ];
    const hasBusinessKeyword = businessKeywords.some(keyword => domain.toLowerCase().includes(keyword));
    if (hasBusinessKeyword) score += 25;
    
    // 4. GEOGRAPHIC INTELLIGENCE BONUS
    const geographicTerms = [
      'in', 'at', 'for', 'of', 'by', 'with', 'from', 'to', 'and', 'or'
    ];
    const hasGeographicTerm = geographicTerms.some(term => domain.toLowerCase().includes(term));
    if (hasGeographicTerm) score += 20;
    
    // 5. CULTURAL INTELLIGENCE BONUS
    const culturalTerms = [
      'apollo', 'venus', 'mars', 'jupiter', 'carlos', 'maria', 'diego', 'sofia',
      'athena', 'zeus', 'aphrodite', 'hermes', 'rose', 'lily', 'lion', 'eagle'
    ];
    const hasCulturalTerm = culturalTerms.some(term => domain.toLowerCase().includes(term));
    if (hasCulturalTerm) score += 20;
    
    // 6. INDUSTRY INTELLIGENCE BONUS
    const industryTerms = [
      'bitcoin', 'ethereum', 'chase', 'wells', 'lakers', 'yankees', 'blue', 'red',
      'google', 'apple', 'netflix', 'spotify', 'doctor', 'lawyer', 'engineer'
    ];
    const hasIndustryTerm = industryTerms.some(term => domain.toLowerCase().includes(term));
    if (hasIndustryTerm) score += 20;
    
    // 7. MEMORABILITY & PRONOUNCEABILITY
    const hasRepeatedLetters = /(.)\1/.test(domain); // e.g., 'll', 'ss'
    const hasVowelConsonantPattern = /[aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/.test(domain);
    const isPronounceable = /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*([aeiou][bcdfghjklmnpqrstvwxyz]*)?$/.test(domain);
    
    if (hasRepeatedLetters) score += 10;
    if (hasVowelConsonantPattern) score += 15;
    if (isPronounceable) score += 20;
    
    // 8. AVOID PENALTY PATTERNS
    const avoidPatterns = [
      'tech', 'cloud', 'data', 'ai', 'app', 'hub', 'pro', 'max', 'plus', 'solutions', 'global', 'systems',
      'ify', 'ly', 'er', 'ing', 'tion', 'sion', 'ness', 'ment', 'co', 'corp', 'group', 'labs', 'ventures',
      'test', 'demo', 'sample', 'example', 'temp', 'new', 'old', 'best', 'fast', 'easy', 'smart', 'v1', 'v2', 'api'
    ];
    const hasAvoidPattern = avoidPatterns.some(pattern => domain.toLowerCase().includes(pattern));
    if (hasAvoidPattern) score -= 20; // Penalty
    
    // 9. LENGTH OPTIMIZATION BONUS
    if (domain.length === 10) score += 15; // Perfect length
    if (domain.length === 11) score += 12; // Great length
    if (domain.length === 12) score += 8;  // Good length
    
    // 10. UNIVERSAL BONUS (Domains that sound like established businesses)
    const universalPatterns = [
      /^[A-Z][a-z]+[A-Z][a-z]+$/, // PascalCase (e.g., "JobsInBudapest")
      /^[A-Z][a-z]+[A-Z][a-z]+[A-Z][a-z]+$/, // Three words (e.g., "JobsInBudapest")
    ];
    const hasUniversalPattern = universalPatterns.some(pattern => pattern.test(domain));
    if (hasUniversalPattern) score += 25;
    
    return Math.max(0, Math.min(100, score));
  },
  
  // Universal expected value based on score
  getExpectedValue: (score) => {
    if (score >= 95) return 50000; // Exceptional universal domains
    if (score >= 90) return 25000; // Ultra-premium domains
    if (score >= 85) return 15000; // Premium domains
    if (score >= 80) return 10000; // High-value domains
    if (score >= 75) return 7500;  // Very good domains
    if (score >= 70) return 5000;  // Good domains
    if (score >= 65) return 2500;  // Above average
    if (score >= 60) return 1000;  // Average
    if (score >= 55) return 500;   // Below average
    if (score >= 50) return 250;   // Low
    return 50; // Minimum threshold for auction value
  }
};
