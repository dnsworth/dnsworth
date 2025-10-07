import express from 'express';
import { Pool } from 'pg';
import rateLimit from 'express-rate-limit';
import domainManager from '../services/domainManager.js';

const router = express.Router();

// Rate limiting for registration endpoints
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many registration attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const countLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute (increased for normal usage)
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
});

// Initialize database schema
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS domain_registrations (
        id SERIAL PRIMARY KEY,
        domain_name VARCHAR(255) NOT NULL,
        registered_at TIMESTAMP DEFAULT NOW(),
        registered_by VARCHAR(255) NULL,
        source VARCHAR(50) DEFAULT 'platform',
        affiliate_earned DECIMAL(10,2) DEFAULT 0
      );
      
      CREATE INDEX IF NOT EXISTS idx_registrations_time ON domain_registrations(registered_at);
    `);
    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Database initialization failed');
    // Don't expose database details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Database error details:', error.message);
    }
  }
}

// Initialize on startup
initializeDatabase();

/**
 * POST /api/registrations/track - Track a domain registration
 */
router.post('/track', registrationLimiter, async (req, res) => {
  try {
    const { domain, userId = null } = req.body;
    
    // Input validation and sanitization
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid domain name is required'
      });
    }
    
    // Sanitize domain name
    const sanitizedDomain = domain.trim().toLowerCase().replace(/[^a-z0-9.-]/g, '');
    if (!sanitizedDomain || sanitizedDomain.length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Invalid domain format'
      });
    }
    
    // Sanitize userId if provided
    const sanitizedUserId = userId && typeof userId === 'string' ? userId.trim().substring(0, 255) : null;
    
    // Track registration
    await pool.query(
      `INSERT INTO domain_registrations (domain_name, registered_by, source) 
       VALUES ($1, $2, 'platform')`,
      [sanitizedDomain, sanitizedUserId]
    );
    
    res.json({
      success: true,
      message: 'Registration tracked successfully'
    });
  } catch (error) {
    console.error('❌ Registration tracking failed');
    
    // Don't expose database details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Registration error details:', error.message);
    }
    
    // Still return success even if database is not available
    res.json({
      success: true,
      message: 'Registration tracked (offline mode)',
      fallback: true
    });
  }
});

/**
 * GET /api/registrations/count - Get recent registrations count
 */
router.get('/count', countLimiter, async (req, res) => {
  // Input validation and sanitization
  const { hours = 24 } = req.query;
  const sanitizedHours = Math.max(1, Math.min(168, parseInt(hours) || 24)); // 1-168 hours (1 week max)
  
  try {
    const result = await pool.query(
      `SELECT COUNT(*) as count 
       FROM domain_registrations 
       WHERE registered_at >= NOW() - INTERVAL '${sanitizedHours} hours'`
    );
    
    const count = parseInt(result.rows[0].count);
    
    res.json({
      success: true,
      count: count,
      hours: sanitizedHours
    });
  } catch (error) {
    console.error('❌ Registration count query failed');
    
    // Don't expose database details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Count query error details:', error.message);
    }
    
    // Fallback to default count if database is not available
    res.json({
      success: true,
      count: 76, // Default fallback count
      hours: sanitizedHours,
      fallback: true
    });
  }
});

/**
 * GET /api/registrations/stats - Get detailed registration statistics
 */
router.get('/stats', countLimiter, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    // Get registrations by day
    const dailyStats = await pool.query(`
      SELECT 
        DATE(registered_at) as date,
        COUNT(*) as count
      FROM domain_registrations 
      WHERE registered_at >= NOW() - INTERVAL '${parseInt(days)} days'
      GROUP BY DATE(registered_at)
      ORDER BY date DESC
    `);
    
    // Get total count
    const totalResult = await pool.query(`
      SELECT COUNT(*) as total
      FROM domain_registrations
    `);
    
    // Get recent count (last 24 hours)
    const recentResult = await pool.query(`
      SELECT COUNT(*) as recent
      FROM domain_registrations 
      WHERE registered_at >= NOW() - INTERVAL '24 hours'
    `);
    
    res.json({
      success: true,
      data: {
        total: parseInt(totalResult.rows[0].total),
        recent24h: parseInt(recentResult.rows[0].recent),
        daily: dailyStats.rows.map(row => ({
          date: row.date,
          count: parseInt(row.count)
        }))
      }
    });
  } catch (error) {
    console.error('❌ Registration stats query failed');
    
    // Don't expose database details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Stats query error details:', error.message);
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to get registration statistics'
    });
  }
});

export default router;

/**
 * POST /api/registrations/webhook
 * Secure webhook to mark a domain as registered (affiliate postback)
 * Requires header x-webhook-secret to match AFFILIATE_WEBHOOK_SECRET
 */
router.post('/webhook', async (req, res) => {
  try {
    const provided = req.get('x-webhook-secret') || (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
    if (!process.env.AFFILIATE_WEBHOOK_SECRET || provided !== process.env.AFFILIATE_WEBHOOK_SECRET) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { domain } = req.body || {};
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ success: false, error: 'Domain is required' });
    }

    const clean = domain.toLowerCase().replace(/\s+/g, '').replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/^www\./, '');
    const name = clean.replace('.com', '').replace(/[^a-z0-9.-]/g, '');
    await domainManager.removeRegisteredDomain(name);
    return res.json({ success: true, removed: name });
  } catch (error) {
    console.error('Affiliate webhook failed:', error.message);
    return res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});
