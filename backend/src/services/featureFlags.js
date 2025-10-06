import dotenv from 'dotenv';

dotenv.config();

class FeatureFlags {
  constructor() {
    this.flags = {
      // Domain Generation Systems
      USE_GEM_HUNTER: process.env.USE_GEM_HUNTER === 'true',
      GEM_HUNTER_PERCENTAGE: parseInt(process.env.GEM_HUNTER_PERCENTAGE) || 0,
      
      // Comparison Mode
      ENABLE_COMPARISON: process.env.ENABLE_COMPARISON === 'true',
      
      // Fallback Protection
      ENABLE_FALLBACK: process.env.ENABLE_FALLBACK !== 'false', // Default true
      
      // Debug Mode
      DEBUG_MODE: process.env.DEBUG_MODE === 'true'
    };
  }

  /**
   * Check if Gem Hunter should be used
   */
  shouldUseGemHunter() {
    return this.flags.USE_GEM_HUNTER && this.flags.GEM_HUNTER_PERCENTAGE > 0;
  }

  /**
   * Check if comparison mode is enabled
   */
  shouldRunComparison() {
    return this.flags.ENABLE_COMPARISON;
  }

  /**
   * Check if fallback protection is enabled
   */
  shouldUseFallback() {
    return this.flags.ENABLE_FALLBACK;
  }

  /**
   * Get Gem Hunter percentage (0-100)
   */
  getGemHunterPercentage() {
    return Math.max(0, Math.min(100, this.flags.GEM_HUNTER_PERCENTAGE));
  }

  /**
   * Check if debug mode is enabled
   */
  isDebugMode() {
    return this.flags.DEBUG_MODE;
  }

  /**
   * Get all flags
   */
  getAllFlags() {
    return { ...this.flags };
  }

  /**
   * Update flags (for testing)
   */
  updateFlags(newFlags) {
    this.flags = { ...this.flags, ...newFlags };
    console.log('🔧 Feature flags updated:', this.flags);
  }

  /**
   * Get system configuration
   */
  getSystemConfig() {
    return {
      primarySystem: this.shouldUseGemHunter() ? 'Gem Hunter' : 'Original',
      gemHunterPercentage: this.getGemHunterPercentage(),
      comparisonMode: this.shouldRunComparison(),
      fallbackEnabled: this.shouldUseFallback(),
      debugMode: this.isDebugMode()
    };
  }

  /**
   * Get safe configuration (ensures no breaking changes)
   */
  getSafeConfig() {
    return {
      // Always start with original system
      primarySystem: 'Original',
      gemHunterPercentage: 0,
      comparisonMode: true, // Enable comparison for testing
      fallbackEnabled: true, // Always enable fallback
      debugMode: this.isDebugMode()
    };
  }
}

// Singleton instance
const featureFlags = new FeatureFlags();
export default featureFlags;

