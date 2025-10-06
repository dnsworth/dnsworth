import axios from 'axios';

class MultiSourceAvailability {
  constructor() {
    this.sources = {
      dynadot: {
        name: 'Dynadot',
        enabled: true,
        priority: 1
      },
      godaddy: {
        name: 'GoDaddy',
        enabled: false, // Disabled by default
        priority: 2
      },
      namecheap: {
        name: 'Namecheap',
        enabled: false, // Disabled by default
        priority: 3
      },
      google: {
        name: 'Google Domains',
        enabled: false, // Disabled by default
        priority: 4
      },
      cloudflare: {
        name: 'Cloudflare',
        enabled: false, // Disabled by default
        priority: 5
      }
    };
  }

  async checkAllRegistrars(domain) {
    console.log(`🔍 Checking availability across multiple registrars for: ${domain}`);
    
    const results = await Promise.allSettled([
      this.checkDynadot(domain),
      this.checkGoDaddy(domain),
      this.checkNamecheap(domain),
      this.checkGoogleDomains(domain),
      this.checkCloudflare(domain)
    ]);
    
    const availabilityResults = results
      .map((result, index) => {
        const sourceNames = ['dynadot', 'godaddy', 'namecheap', 'google', 'cloudflare'];
        const source = this.sources[sourceNames[index]];
        
        if (result.status === 'fulfilled') {
          return {
            ...result.value,
            source: source.name,
            priority: source.priority
          };
        } else {
          console.warn(`${source.name} check failed:`, result.reason);
          return {
            domain,
            available: false,
            price: null,
            source: source.name,
            priority: source.priority,
            error: result.reason.message
          };
        }
      })
      .filter(result => result !== null);
    
    // Find the best available option
    const bestOption = this.findBestPrice(availabilityResults);
    
    return {
      domain,
      available: bestOption ? bestOption.available : false,
      bestOption,
      allOptions: availabilityResults,
      checkedAt: new Date().toISOString()
    };
  }
  
  async findBestPrice(availabilityResults) {
    const available = availabilityResults.filter(r => r.available && r.price !== null);
    
    if (available.length === 0) {
      return null;
    }
    
    // Sort by price, then by priority
    return available.sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      return a.priority - b.priority;
    })[0];
  }

  async checkDynadot(domain) {
    if (!this.sources.dynadot.enabled) {
      return { domain, available: false, price: null, source: 'Dynadot (disabled)' };
    }

    try {
      const apiKey = process.env.DYNADOT_API_KEY;
      if (!apiKey || apiKey === 'your_dynadot_api_key_here') {
        throw new Error('API configuration error. Please contact support.');
      }

      const response = await axios.get(`https://api.dynadot.com/restful/v1/domains/${domain}/search`, {
        params: {
          show_price: true,
          currency: 'USD'
        },
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data && response.data.code === 200) {
        const data = response.data.data;
        return {
          domain,
          available: data.available === 'true',
          price: data.price_list && data.price_list[0] ? parseFloat(data.price_list[0].registration) : null,
          source: 'Dynadot',
          currency: 'USD'
        };
      } else {
        throw new Error('Invalid response from Dynadot API');
      }
    } catch (error) {
      console.error('Dynadot API error:', error);
      return { domain, available: false, price: null, source: 'Dynadot', error: error.message };
    }
  }

  async checkGoDaddy(domain) {
    if (!this.sources.godaddy.enabled) {
      return { domain, available: false, price: null, source: 'GoDaddy (disabled)' };
    }

    try {
      // Mock implementation - in production, use GoDaddy API
      const mockPrice = Math.random() * 50 + 10; // $10-$60
      return {
        domain,
        available: Math.random() > 0.3, // 70% availability
        price: mockPrice,
        source: 'GoDaddy',
        currency: 'USD'
      };
    } catch (error) {
      console.error('GoDaddy API error:', error);
      return { domain, available: false, price: null, source: 'GoDaddy', error: error.message };
    }
  }

  async checkNamecheap(domain) {
    if (!this.sources.namecheap.enabled) {
      return { domain, available: false, price: null, source: 'Namecheap (disabled)' };
    }

    try {
      // Mock implementation - in production, use Namecheap API
      const mockPrice = Math.random() * 40 + 8; // $8-$48
      return {
        domain,
        available: Math.random() > 0.2, // 80% availability
        price: mockPrice,
        source: 'Namecheap',
        currency: 'USD'
      };
    } catch (error) {
      console.error('Namecheap API error:', error);
      return { domain, available: false, price: null, source: 'Namecheap', error: error.message };
    }
  }

  async checkGoogleDomains(domain) {
    if (!this.sources.google.enabled) {
      return { domain, available: false, price: null, source: 'Google Domains (disabled)' };
    }

    try {
      // Mock implementation - in production, use Google Domains API
      const mockPrice = Math.random() * 45 + 12; // $12-$57
      return {
        domain,
        available: Math.random() > 0.25, // 75% availability
        price: mockPrice,
        source: 'Google Domains',
        currency: 'USD'
      };
    } catch (error) {
      console.error('Google Domains API error:', error);
      return { domain, available: false, price: null, source: 'Google Domains', error: error.message };
    }
  }

  async checkCloudflare(domain) {
    if (!this.sources.cloudflare.enabled) {
      return { domain, available: false, price: null, source: 'Cloudflare (disabled)' };
    }

    try {
      // Mock implementation - in production, use Cloudflare API
      const mockPrice = Math.random() * 35 + 8; // $8-$43
      return {
        domain,
        available: Math.random() > 0.15, // 85% availability
        price: mockPrice,
        source: 'Cloudflare',
        currency: 'USD'
      };
    } catch (error) {
      console.error('Cloudflare API error:', error);
      return { domain, available: false, price: null, source: 'Cloudflare', error: error.message };
    }
  }

  async checkBulkAvailability(domains) {
    console.log(`🔍 Checking bulk availability for ${domains.length} domains...`);
    
    const results = [];
    const batchSize = 10; // Process in batches to avoid rate limits
    
    for (let i = 0; i < domains.length; i += batchSize) {
      const batch = domains.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(domains.length / batchSize)}`);
      
      const batchResults = await Promise.allSettled(
        batch.map(domain => this.checkAllRegistrars(domain))
      );
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          console.error(`Error checking domain ${batch[index]}:`, result.reason);
          results.push({
            domain: batch[index],
            available: false,
            bestOption: null,
            allOptions: [],
            error: result.reason.message
          });
        }
      });
      
      // Rate limiting between batches
      if (i + batchSize < domains.length) {
        await this.delay(1000);
      }
    }
    
    return results;
  }

  enableSource(sourceName) {
    if (this.sources[sourceName]) {
      this.sources[sourceName].enabled = true;
      console.log(`✅ Enabled ${sourceName} availability checking`);
    }
  }

  disableSource(sourceName) {
    if (this.sources[sourceName]) {
      this.sources[sourceName].enabled = false;
      console.log(`❌ Disabled ${sourceName} availability checking`);
    }
  }

  getEnabledSources() {
    return Object.entries(this.sources)
      .filter(([name, config]) => config.enabled)
      .map(([name, config]) => ({ name, ...config }));
  }

  getSourceStats() {
    const enabled = this.getEnabledSources();
    return {
      total: Object.keys(this.sources).length,
      enabled: enabled.length,
      sources: enabled
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default MultiSourceAvailability;
