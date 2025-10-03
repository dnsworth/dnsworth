/**
 * Audit Logging Middleware
 * Provides comprehensive request/response logging for security audit trails
 */

import fs from 'fs';
import path from 'path';

class AuditLogger {
  constructor() {
    this.logDir = process.env.AUDIT_LOG_DIR || 'logs';
    this.maxLogSize = 10 * 1024 * 1024; // 10MB
    this.maxFiles = 5;
    
    // Ensure log directory exists
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFilePath() {
    const today = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `audit-${today}.log`);
  }

  rotateLogIfNeeded() {
    const logFile = this.getLogFilePath();
    
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > this.maxLogSize) {
        // Rotate log file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedFile = path.join(this.logDir, `audit-${timestamp}.log`);
        fs.renameSync(logFile, rotatedFile);
        
        // Clean up old log files
        this.cleanupOldLogs();
      }
    }
  }

  cleanupOldLogs() {
    try {
      const files = fs.readdirSync(this.logDir)
        .filter(file => file.startsWith('audit-') && file.endsWith('.log'))
        .map(file => ({
          name: file,
          path: path.join(this.logDir, file),
          time: fs.statSync(path.join(this.logDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);

      // Keep only the most recent files
      if (files.length > this.maxFiles) {
        files.slice(this.maxFiles).forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
    } catch (error) {
      console.error('Error cleaning up old log files:', error.message);
    }
  }

  sanitizeData(data) {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sensitiveKeys = [
      'password', 'passwd', 'pwd', 'secret', 'key', 'token', 'auth',
      'authorization', 'cookie', 'session', 'api_key', 'apiKey'
    ];

    const sanitized = { ...data };
    
    for (const key in sanitized) {
      const lowerKey = key.toLowerCase();
      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeData(sanitized[key]);
      }
    }

    return sanitized;
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data: this.sanitizeData(data),
      pid: process.pid,
      env: process.env.NODE_ENV || 'development'
    };

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, data);
    }

    // File logging
    try {
      this.rotateLogIfNeeded();
      const logFile = this.getLogFilePath();
      const logLine = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(logFile, logLine);
    } catch (error) {
      console.error('Failed to write audit log:', error.message);
    }
  }

  // Middleware function
  middleware() {
    return (req, res, next) => {
      const startTime = Date.now();
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Add request ID to request object
      req.requestId = requestId;
      
      // Log request
      this.log('info', 'Request received', {
        requestId,
        method: req.method,
        url: req.url,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        headers: this.sanitizeData(req.headers),
        query: req.query,
        body: req.method !== 'GET' ? this.sanitizeData(req.body) : undefined
      });

      // Override res.json to log responses
      const originalJson = res.json;
      res.json = function(data) {
        const duration = Date.now() - startTime;
        
        // Log response
        auditLogger.log('info', 'Request completed', {
          requestId,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          responseSize: JSON.stringify(data).length,
          success: res.statusCode < 400
        });

        return originalJson.call(this, data);
      };

      // Log errors
      res.on('finish', () => {
        if (res.statusCode >= 400) {
          const duration = Date.now() - startTime;
          this.log('error', 'Request failed', {
            requestId,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            method: req.method,
            url: req.url
          });
        }
      });

      next();
    };
  }

  // Security event logging
  logSecurityEvent(event, details = {}) {
    this.log('security', `Security event: ${event}`, {
      event,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // API usage logging
  logApiUsage(service, endpoint, success, responseTime, error = null) {
    this.log('api', 'API usage', {
      service,
      endpoint,
      success,
      responseTime: `${responseTime}ms`,
      error: error ? error.message : null,
      timestamp: new Date().toISOString()
    });
  }
}

// Create singleton instance
const auditLogger = new AuditLogger();

export default auditLogger;
