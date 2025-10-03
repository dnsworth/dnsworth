/**
 * API Management Routes
 * Handles API key rotation and security management
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import apiKeyManager from '../services/apiKeyManager.js';
import auditLogger from '../middleware/auditLogger.js';

const router = express.Router();

// Rate limiting for API management endpoints
const apiManagementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many API management requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all routes
router.use(apiManagementLimiter);

/**
 * GET /api/management/status - Get API key rotation status
 */
router.get('/status', (req, res) => {
  try {
    const status = apiKeyManager.getRotationStatus();
    
    auditLogger.log('info', 'API management status requested', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.json({
      success: true,
      data: {
        status,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }
    });
  } catch (error) {
    auditLogger.logSecurityEvent('api_management_error', {
      error: error.message,
      endpoint: 'status',
      ip: req.ip
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to get API status',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/management/rotate/:service - Rotate API key for specific service
 */
router.post('/rotate/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const currentKey = process.env[`${service.toUpperCase()}_API_KEY`];
    
    if (!currentKey) {
      return res.status(400).json({
        success: false,
        error: 'No current API key found for this service'
      });
    }

    // Validate service name
    const validServices = ['openai', 'dynadot'];
    if (!validServices.includes(service.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid service name. Must be one of: ' + validServices.join(', ')
      });
    }

    auditLogger.logSecurityEvent('api_key_rotation_requested', {
      service,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    const result = await apiKeyManager.rotateKey(service.toLowerCase(), currentKey);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: {
          service,
          rotatedAt: new Date().toISOString(),
          newKeyLength: result.newKey.length
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        message: result.message
      });
    }
  } catch (error) {
    auditLogger.logSecurityEvent('api_rotation_error', {
      error: error.message,
      service: req.params.service,
      ip: req.ip
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to rotate API key',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/management/history/:service - Get rotation history for service
 */
router.get('/history/:service', (req, res) => {
  try {
    const { service } = req.params;
    const history = apiKeyManager.getRotationHistory(service.toLowerCase());
    
    // Sanitize history data (remove actual keys)
    const sanitizedHistory = history.map(entry => ({
      service: entry.service,
      createdAt: entry.createdAt,
      status: entry.status,
      rotatedAt: entry.rotatedAt,
      keyLength: entry.key ? entry.key.length : 0
    }));
    
    res.json({
      success: true,
      data: {
        service,
        history: sanitizedHistory,
        count: sanitizedHistory.length
      }
    });
  } catch (error) {
    auditLogger.logSecurityEvent('api_history_error', {
      error: error.message,
      service: req.params.service,
      ip: req.ip
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to get rotation history',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/management/validate - Validate API key strength
 */
router.post('/validate', (req, res) => {
  try {
    const { service, key } = req.body;
    
    if (!service || !key) {
      return res.status(400).json({
        success: false,
        error: 'Service and key are required'
      });
    }

    const validation = apiKeyManager.validateKeyStrength(key, service);
    
    res.json({
      success: true,
      data: {
        service,
        valid: validation.valid,
        reason: validation.reason,
        keyLength: key.length,
        validatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    auditLogger.logSecurityEvent('api_validation_error', {
      error: error.message,
      ip: req.ip
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to validate API key',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/management/cleanup - Clean up old rotation history
 */
router.post('/cleanup', (req, res) => {
  try {
    apiKeyManager.cleanupHistory();
    
    auditLogger.log('info', 'API rotation history cleaned up', {
      ip: req.ip
    });
    
    res.json({
      success: true,
      message: 'Rotation history cleaned up successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    auditLogger.logSecurityEvent('api_cleanup_error', {
      error: error.message,
      ip: req.ip
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to clean up history',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
