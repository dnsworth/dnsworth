/**
 * API Key Rotation Manager
 * Handles secure API key rotation and validation
 */

import crypto from 'crypto';
import auditLogger from '../middleware/auditLogger.js';

class APIKeyManager {
  constructor() {
    this.keyRotationInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    this.rotationCheckInterval = 60 * 60 * 1000; // Check every hour
    this.lastRotationCheck = Date.now();
    this.rotationHistory = new Map();
    
    // Start rotation monitoring
    this.startRotationMonitoring();
  }

  /**
   * Generate a new API key
   */
  generateNewKey(service, length = 32) {
    const key = crypto.randomBytes(length).toString('hex');
    const timestamp = Date.now();
    
    // Store in rotation history
    this.rotationHistory.set(`${service}_${timestamp}`, {
      key,
      service,
      createdAt: timestamp,
      status: 'active'
    });
    
    auditLogger.logSecurityEvent('api_key_generated', {
      service,
      keyLength: length,
      timestamp
    });
    
    return key;
  }

  /**
   * Validate API key format and strength
   */
  validateKeyStrength(key, service) {
    const validations = {
      openai: {
        minLength: 50,
        pattern: /^sk-[a-zA-Z0-9]{48,}$/,
        description: 'OpenAI API key should start with sk- and be at least 50 characters'
      },
      dynadot: {
        minLength: 20,
        pattern: /^[a-f0-9]{40,}$/,
        description: 'Dynadot API key should be a 40+ character hexadecimal string'
      },
      redis: {
        minLength: 20,
        pattern: /^redis[s]?:\/\/.*$/,
        description: 'Redis URL should start with redis:// or rediss://'
      }
    };

    const validation = validations[service];
    if (!validation) {
      return { valid: false, reason: 'Unknown service' };
    }

    if (key.length < validation.minLength) {
      return { valid: false, reason: `Key too short. Minimum ${validation.minLength} characters` };
    }

    if (!validation.pattern.test(key)) {
      return { valid: false, reason: validation.description };
    }

    return { valid: true, reason: 'Key format is valid' };
  }

  /**
   * Check if API key needs rotation
   */
  needsRotation(service, currentKey) {
    const now = Date.now();
    const lastCheck = this.lastRotationCheck;
    
    // Check if it's time for rotation check
    if (now - lastCheck < this.rotationCheckInterval) {
      return false;
    }

    this.lastRotationCheck = now;

    // Check if key is in rotation history and if it's old
    for (const [keyId, keyData] of this.rotationHistory.entries()) {
      if (keyData.service === service && keyData.key === currentKey) {
        const age = now - keyData.createdAt;
        return age > this.keyRotationInterval;
      }
    }

    // If key is not in history, it might be old
    return true;
  }

  /**
   * Rotate API key for a service
   */
  async rotateKey(service, currentKey) {
    try {
      auditLogger.logSecurityEvent('api_key_rotation_started', {
        service,
        timestamp: Date.now()
      });

      // Generate new key
      const newKey = this.generateNewKey(service);
      
      // Mark old key as rotated
      for (const [keyId, keyData] of this.rotationHistory.entries()) {
        if (keyData.service === service && keyData.key === currentKey) {
          keyData.status = 'rotated';
          keyData.rotatedAt = Date.now();
          break;
        }
      }

      // Update environment variable
      process.env[`${service.toUpperCase()}_API_KEY`] = newKey;

      auditLogger.logSecurityEvent('api_key_rotated', {
        service,
        newKeyLength: newKey.length,
        timestamp: Date.now()
      });

      return {
        success: true,
        newKey,
        message: `${service} API key rotated successfully`
      };

    } catch (error) {
      auditLogger.logSecurityEvent('api_key_rotation_failed', {
        service,
        error: error.message,
        timestamp: Date.now()
      });

      return {
        success: false,
        error: error.message,
        message: `Failed to rotate ${service} API key`
      };
    }
  }

  /**
   * Get rotation status for all services
   */
  getRotationStatus() {
    const services = ['openai', 'dynadot', 'redis'];
    const status = {};

    for (const service of services) {
      const key = process.env[`${service.toUpperCase()}_API_KEY`];
      const validation = this.validateKeyStrength(key || '', service);
      const needsRotation = this.needsRotation(service, key);
      
      status[service] = {
        configured: !!key,
        valid: validation.valid,
        validationReason: validation.reason,
        needsRotation,
        lastChecked: this.lastRotationCheck
      };
    }

    return status;
  }

  /**
   * Start monitoring for key rotation
   */
  startRotationMonitoring() {
    setInterval(() => {
      this.checkAndRotateKeys();
    }, this.rotationCheckInterval);

    auditLogger.log('info', 'API key rotation monitoring started', {
      checkInterval: this.rotationCheckInterval,
      rotationInterval: this.keyRotationInterval
    });
  }

  /**
   * Check all keys and rotate if needed
   */
  async checkAndRotateKeys() {
    const services = ['openai', 'dynadot'];
    
    for (const service of services) {
      const key = process.env[`${service.toUpperCase()}_API_KEY`];
      
      if (key && this.needsRotation(service, key)) {
        auditLogger.log('warn', `API key rotation needed for ${service}`, {
          service,
          lastCheck: this.lastRotationCheck
        });
        
        // Note: In production, this would trigger a notification
        // to administrators to manually rotate the key
        auditLogger.logSecurityEvent('api_key_rotation_required', {
          service,
          timestamp: Date.now()
        });
      }
    }
  }

  /**
   * Get rotation history
   */
  getRotationHistory(service = null) {
    if (service) {
      return Array.from(this.rotationHistory.values())
        .filter(keyData => keyData.service === service)
        .sort((a, b) => b.createdAt - a.createdAt);
    }
    
    return Array.from(this.rotationHistory.values())
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Clean up old rotation history
   */
  cleanupHistory() {
    const maxHistoryAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    const now = Date.now();
    
    for (const [keyId, keyData] of this.rotationHistory.entries()) {
      if (now - keyData.createdAt > maxHistoryAge) {
        this.rotationHistory.delete(keyId);
      }
    }
  }
}

// Create singleton instance
const apiKeyManager = new APIKeyManager();

export default apiKeyManager;
