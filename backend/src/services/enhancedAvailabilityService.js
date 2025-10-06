import axios from 'axios';
// import Redis from 'redis'; // DISABLED

class EnhancedDynadotService {
  constructor() {
    this.apiKey = process.env.DYNADOT_API_KEY;
    this.baseURL = 'https://api.dynadot.com/restful/v1/domains';
    
    // Check if API key is properly configured
    if (this.apiKey && this.apiKey !== 'your_dynadot_api_key_here' && this.apiKey.trim() !== '' && this.apiKey.length > 20) {
      console.log('✅ Dynadot API configured successfully');
    } else {
      console.warn('❌ Dynadot API key not configured. Set DYNADOT_API_KEY.');
    }
    
    // Redis DISABLED - using in-memory fallback
    this.redis = {
      get: () => Promise.resolve(null),
      set: () => Promise.resolve('OK'),
      del: () => Promise.resolve(1),
      connect: () => Promise.resolve(),
      disconnect: () => Promise.resolve()
    };
  }

  /**
   * Check bulk availability - ALWAYS REAL-TIME, NO CACHING
   * Following Dynadot best practices: batch queries up to 500, throttle requests, graceful backoff
   */
  async checkBulkAvailability(domains) {
    if (!domains || domains.length === 0) return [];
    
    console.log(`🔄 Checking FRESH availability for ${domains.length} domains (NO CACHE)`);
    
    // Process in batches of 5 (Dynadot Regular account limit)
    const chunks = this.chunkArray(domains, 5);
    const results = [];
    
    console.log(`Processing ${domains.length} domains in ${chunks.length} batches (up to 5 per batch)`);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing batch ${i + 1}/${chunks.length} (${chunk.length} domains)`);
      
      const available = await this.checkDomainChunkWithBackoff(chunk);
      results.push(...available);
      
      // Throttle requests - add 2 second delay between batches for rate limit safety
      if (i < chunks.length - 1) {
        console.log('⏳ Throttling: waiting 2s before next batch...');
        await this.delay(2000);
      }
    }
    
    console.log(`✅ Found ${results.length} FRESH available domains out of ${domains.length}`);
    return results;
  }

  /**
   * Check a single chunk of domains using CORRECT RESTful BULK_SEARCH
   */
  async checkDomainChunk(domains) {
    if (!this.apiKey || this.apiKey === 'your_dynadot_api_key_here') {
      throw new Error('❌ API configuration error. Please contact support.');
    }

    console.log('🔍 Calling Dynadot RESTful BULK_SEARCH for domains:', domains.slice(0, 3).join(', '), '...');
    
    try {
      // Ensure domains are in full .com format for Dynadot API
      const domainsWithCom = domains.map(domain => {
        if (!domain.includes('.')) {
          return `${domain}.com`;
        }
        return domain;
      });
      const domainList = domainsWithCom.join(',');
      
      const response = await axios.get(
        'https://api.dynadot.com/restful/v1/domains/bulk_search',
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          params: {
            domain_name_list: domainList
          },
          timeout: 15000
        }
      );

      console.log('📡 Dynadot BULK_SEARCH Response:', response.data);

      // Handle successful responses (200, '200', or 'Success')
      if (response.data.code === '200' || response.data.code === 200 || response.data.message === 'Success') {
        console.log('✅ Dynadot API call successful, parsing response...');
        return this.parseBulkResponse(response.data, domains);
      }
      
      // Handle error responses
      console.error('❌ Dynadot API Error:', response.data);
      throw new Error(`Dynadot error: ${response.data?.message || 'unknown'}`);

    } catch (error) {
      console.error('🚨 Dynadot BULK_SEARCH Failed:', error.response?.data || error.message);
      throw error; // Let the backoff handler deal with it
    }
  }

  /**
   * Check domain chunk with exponential backoff for rate limiting
   */
  async checkDomainChunkWithBackoff(domains, retryCount = 0) {
    const maxRetries = 3;
    const baseDelay = 30000; // 30 seconds base delay
    
    try {
      return await this.checkDomainChunk(domains);
    } catch (error) {
      // Check if it's a rate limiting error
      if (error.response?.data?.error?.description === 'Too many failed attempts') {
        if (retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff: 30s, 60s, 120s
          console.log(`⏰ Rate limited! Auto-backoff: waiting ${delay/1000}s before retry ${retryCount + 1}/${maxRetries}...`);
          await this.delay(delay);
          return await this.checkDomainChunkWithBackoff(domains, retryCount + 1);
        } else {
          console.log('❌ Max retries reached. Giving up on this batch.');
          throw new Error('Dynadot API rate limited - max retries exceeded');
        }
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }

  /**
   * Parse BULK_SEARCH response from Dynadot
   */
  parseBulkResponse(response, originalDomains) {
    const availableDomains = [];
    
    console.log('🔍 Parsing Dynadot response:', JSON.stringify(response, null, 2));
    
    // Handle different response formats
    let domainResults = [];
    
    if (response.data && response.data.domain_result_list) {
      domainResults = response.data.domain_result_list;
    } else if (response.domain_result_list) {
      domainResults = response.domain_result_list;
    } else if (Array.isArray(response)) {
      domainResults = response;
    }
    
    console.log(`🔍 Found ${domainResults.length} domain results to parse`);
    
    domainResults.forEach((result, index) => {
      console.log(`🔍 Processing result ${index + 1}:`, result);
      
      // Handle different result formats
      let domainName = '';
      let isAvailable = false;
      let price = 'N/A';
      let currency = 'USD';
      
      if (result.domain_name) {
        domainName = result.domain_name;
        // Ensure domain has .com extension if it doesn't already
        if (!domainName.includes('.')) {
          domainName = `${domainName}.com`;
        }
      } else if (result.domain) {
        domainName = result.domain;
        if (!domainName.includes('.')) {
          domainName = `${domainName}.com`;
        }
      } else if (result.name) {
        domainName = result.name;
        if (!domainName.includes('.')) {
          domainName = `${domainName}.com`;
        }
      }
      
      if (result.available === 'yes' || result.available === 'Yes' || result.available === true || result.available === 1) {
        isAvailable = true;
      } else if (result.available === 'no' || result.available === 'No' || result.available === false || result.available === 0) {
        isAvailable = false;
      } else if (result.status === 'available') {
        isAvailable = true;
      } else if (result.status === 'registered') {
        isAvailable = false;
      }
      
      if (result.price) {
        price = result.price;
      }
      if (result.currency) {
        currency = result.currency;
      }
      
      console.log(`🔍 Domain: ${domainName}, Available: ${isAvailable}, Price: ${price}`);
      
      if (isAvailable && domainName) {
        // Ensure domain has .com extension
        if (!domainName.includes('.')) {
          domainName = `${domainName}.com`;
        }
        
        availableDomains.push({
          domain: domainName,
          available: true,
          price: price,
          currency: currency
        });
      }
    });
    
    console.log(`✅ Found ${availableDomains.length} available domains from bulk search`);
    return availableDomains;
  }

  /**
   * Parse Dynadot API response
   */
  parseDynadotResponse(response, originalDomains) {
    const available = [];
    
    // Parse Dynadot's specific response format
    originalDomains.forEach((domain, index) => {
      const searchKey = `search${index}`;
      if (response[searchKey] && response[searchKey].available === 'yes') {
        available.push({
          domain: domain,
          tld: '.com',
          available: true,
          price: this.estimatePrice(domain),
          checkedAt: new Date().toISOString()
        });
      }
    });
    
    return available;
  }


  /**
   * Estimate domain price based on characteristics
   */
  estimatePrice(domain) {
    // Ensure domain is a string
    const domainName = typeof domain === 'string' ? domain : String(domain || '');
    
    let basePrice = 12.99; // Base .com registration price
    
    // Premium pricing for short domains
    if (domainName.length <= 4) basePrice += 50;
    else if (domainName.length <= 6) basePrice += 20;
    else if (domainName.length <= 8) basePrice += 10;
    
    // Premium pricing for tech keywords
    const techKeywords = ['ai', 'tech', 'app', 'data', 'cloud', 'api', 'io', 'lab'];
    if (techKeywords.some(keyword => domainName.includes(keyword))) {
      basePrice += 15;
    }
    
    // Premium pricing for brandable names
    if (this.isBrandable(domainName)) {
      basePrice += 25;
    }
    
    return Math.round(basePrice * 100) / 100;
  }

  /**
   * Check if domain is brandable
   */
  isBrandable(domain) {
    // Check for alliteration, good flow, etc.
    return /^[a-z]{4,12}$/i.test(domain) && 
           /[aeiou]/i.test(domain) && 
           !/[^a-z]/i.test(domain);
  }

  /**
   * Check multiple TLDs for a domain
   */
  async checkMultipleTLDs(domain) {
    const tlds = ['com', 'io', 'co', 'ai', 'dev', 'app'];
    const results = [];
    
    for (const tld of tlds) {
      try {
        const available = await this.checkSingleDomain(domain, tld);
        if (available) {
          results.push({
            domain: domain,
            tld: `.${tld}`,
            available: true,
            price: this.estimatePriceForTLD(domain, tld),
            checkedAt: new Date().toISOString()
          });
        }
        
        // Rate limiting
        await this.delay(500);
      } catch (error) {
        console.error(`Error checking ${domain}.${tld}:`, error);
      }
    }
    
    return results;
  }

  /**
   * Check single domain with specific TLD
   */
  async checkSingleDomain(domain, tld) {
    if (!this.apiKey || this.apiKey === 'your_dynadot_api_key_here') {
      throw new Error('❌ API configuration error. Please contact support.');
    }

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          key: this.apiKey,
          command: 'search',
          domain0: domain,
          suffix0: tld
        },
        timeout: 5000
      });
      
      return response.data.search0 && response.data.search0.available === 'yes';
    } catch (error) {
      console.error(`Error checking ${domain}.${tld}:`, error);
      return false;
    }
  }

  /**
   * Estimate price for specific TLD
   */
  estimatePriceForTLD(domain, tld) {
    const basePrices = {
      'com': 12.99,
      'io': 39.99,
      'co': 29.99,
      'ai': 79.99,
      'dev': 19.99,
      'app': 24.99
    };
    
    return basePrices[tld] || 12.99;
  }

  /**
   * Utility to chunk array
   */
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Delay utility
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Close Redis connection
   */
  async close() {
    await this.redis.quit();
  }
}

export default EnhancedDynadotService;
