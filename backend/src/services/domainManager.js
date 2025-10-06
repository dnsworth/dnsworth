import redisService from './redisService.js';

class DomainManager {
  constructor() {
    this.maxDisplayDomains = 30;
    this.redisKey = 'domains:available';
  }

  /**
   * Add new available domains to existing ones
   * Implements your logic: accumulate domains, max 30 display, smart rotation
   */
  async addAvailableDomains(newDomains) {
    try {
      console.log(`🔄 Adding ${newDomains.length} new available domains...`);
      
      // Get existing available domains
      const existingDomains = await this.getAvailableDomains();
      console.log(`📦 Found ${existingDomains.length} existing available domains`);
      
      // Combine new and existing domains
      const allDomains = [...existingDomains, ...newDomains];
      console.log(`📦 Total domains after adding: ${allDomains.length}`);
      
      // Store all available domains in Redis
      await redisService.storeDomains(this.redisKey, allDomains, 86400); // 24 hours TTL
      console.log(`✅ Successfully stored ${allDomains.length} available domains in Redis`);
      
      return allDomains;
    } catch (error) {
      console.error('❌ Error adding available domains:', error);
      throw error;
    }
  }

  /**
   * Get available domains for display (max 30, most recent first)
   */
  async getDisplayDomains() {
    try {
      const allDomains = await this.getAvailableDomains();
      
      // Sort by lastUpdated (most recent first)
      const sortedDomains = allDomains.sort((a, b) => 
        new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
      );
      
      // Return up to 30 most recent domains
      const displayDomains = sortedDomains.slice(0, this.maxDisplayDomains);
      
      console.log(`📤 Returning ${displayDomains.length} domains for display (max: ${this.maxDisplayDomains})`);
      return displayDomains;
    } catch (error) {
      console.error('❌ Error getting display domains:', error);
      return [];
    }
  }

  /**
   * Get all available domains from Redis
   */
  async getAvailableDomains() {
    try {
      const domains = await redisService.getDomains(this.redisKey);
      return domains || [];
    } catch (error) {
      console.error('❌ Error getting available domains:', error);
      return [];
    }
  }

  /**
   * Remove domain when user registers it
   * This creates space for new domains
   */
  async removeRegisteredDomain(domainName) {
    try {
      console.log(`🗑️ Removing registered domain: ${domainName}`);
      
      const allDomains = await this.getAvailableDomains();
      const filteredDomains = allDomains.filter(domain => domain.domain !== domainName);
      
      if (filteredDomains.length < allDomains.length) {
        await redisService.storeDomains(this.redisKey, filteredDomains, 86400);
        console.log(`✅ Removed ${domainName}, ${filteredDomains.length} domains remaining`);
        return true;
      } else {
        console.log(`⚠️ Domain ${domainName} not found in available domains`);
        return false;
      }
    } catch (error) {
      console.error('❌ Error removing registered domain:', error);
      return false;
    }
  }

  /**
   * Get domain count for monitoring
   */
  async getDomainCount() {
    try {
      const domains = await this.getAvailableDomains();
      return {
        total: domains.length,
        display: Math.min(domains.length, this.maxDisplayDomains),
        maxDisplay: this.maxDisplayDomains
      };
    } catch (error) {
      console.error('❌ Error getting domain count:', error);
      return { total: 0, display: 0, maxDisplay: this.maxDisplayDomains };
    }
  }

  /**
   * Clear all domains (for testing/reset)
   */
  async clearAllDomains() {
    try {
      await redisService.clearDomains(this.redisKey);
      console.log('🧹 Cleared all available domains');
      return true;
    } catch (error) {
      console.error('❌ Error clearing domains:', error);
      return false;
    }
  }
}

// Singleton instance
const domainManager = new DomainManager();
export default domainManager;

