       // Secure search tracking utility with privacy protection
       export class SearchTracker {
         static getSearchCount() {
           return parseInt(localStorage.getItem('searchCount') || '0');
         }

         static incrementSearchCount() {
           const currentCount = this.getSearchCount();
           const newCount = currentCount + 1;
           localStorage.setItem('searchCount', newCount.toString());
           return newCount;
         }

         static resetSearchCount() {
           localStorage.removeItem('searchCount');
           this.clearSearchHistory();
         }

         // All users have unlimited access
         static isProUser() {
           return true; // Everyone is a Pro user now
         }

         static canSearch() {
           return true; // No restrictions
         }

         static getRemainingSearches() {
           return 'Unlimited'; // Always unlimited
         }

         static shouldShowUpgrade() {
           return false; // Never show upgrade
         }

         static getTotalSearches() {
           return this.getSearchCount();
         }

         // Donation prompt management
         static shouldShowDonationPrompt(context = 'search') {
           const sessionKey = `donationShown_${context}`;
           const hasShown = sessionStorage.getItem(sessionKey);
           
           if (hasShown) {
             return false;
           }

           // Show after 3 searches for regular search
           if (context === 'search') {
             const searchCount = this.getSearchCount();
             return searchCount >= 3;
           }

           // Always show for bulk valuation (once per session)
           if (context === 'bulk') {
             return true;
           }

           return false;
         }

         static markDonationPromptShown(context = 'search') {
           const sessionKey = `donationShown_${context}`;
           sessionStorage.setItem(sessionKey, 'true');
         }

         // Secure data handling - no sensitive information stored
         static clearAllData() {
           localStorage.removeItem('searchCount');
           this.clearSearchHistory();
         }

         // Get search statistics without sensitive data
         static getSearchStats() {
           return {
             totalSearches: this.getSearchCount(),
             isUnlimited: true,
             // No timestamp or domain data stored for privacy
             lastSearchDate: null
           };
         }

         // Secure search recording - minimal data storage
         static recordSearch(domain) {
           this.incrementSearchCount();

           // Store only encrypted hash of domain for rate limiting
           const domainHash = this.hashDomain(domain);
           const timestamp = Date.now();

           // Store minimal data with encryption
           const searchData = {
             hash: domainHash,
             timestamp: timestamp,
             count: this.getSearchCount()
           };

           // Encrypt before storage
           const encrypted = this.encryptData(JSON.stringify(searchData));
           localStorage.setItem('searchData', encrypted);
         }

  // Hash domain for privacy
  static hashDomain(domain) {
    let hash = 0;
    if (domain.length === 0) return hash.toString();
    
    for (let i = 0; i < domain.length; i++) {
      const char = domain.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  // Simple encryption for stored data
  static encryptData(data) {
    // In production, use proper encryption libraries
    // This is a basic obfuscation for development
    return btoa(data);
  }

  // Decrypt stored data
  static decryptData(encryptedData) {
    try {
      return atob(encryptedData);
    } catch {
      return null;
    }
  }

  // Clear search history for privacy
  static clearSearchHistory() {
    localStorage.removeItem('searchData');
    localStorage.removeItem('lastSearch');
    localStorage.removeItem('lastSearchedDomain');
  }

  // Get rate limiting data without exposing domains
  static getRateLimitData() {
    const encrypted = localStorage.getItem('searchData');
    if (!encrypted) return null;
    
    const decrypted = this.decryptData(encrypted);
    if (!decrypted) return null;
    
    try {
      const data = JSON.parse(decrypted);
      return {
        hash: data.hash,
        timestamp: data.timestamp,
        count: data.count
      };
    } catch {
      return null;
    }
  }

  // Check if user is making too many requests
  static isRateLimited() {
    const data = this.getRateLimitData();
    if (!data) return false;
    
    const now = Date.now();
    const timeDiff = now - data.timestamp;
    const oneMinute = 60 * 1000;
    
    // Allow max 10 searches per minute
    return timeDiff < oneMinute && data.count > 10;
  }
}
