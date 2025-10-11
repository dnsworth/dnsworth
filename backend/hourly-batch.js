#!/usr/bin/env node

/**
 * Hourly Domain Generation Batch Script
 * 
 * This script runs every hour to generate fresh domain gems.
 * It uses proper Redis connection management to prevent connection leaks.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import CostEffectiveScheduler from './src/services/costEffectiveScheduler.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPaths = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', 'env.development'),
  '.env'
];

let envLoaded = false;
for (const envPath of envPaths) {
  try {
    const result = dotenv.config({ path: envPath });
    if (result.parsed && Object.keys(result.parsed).length > 0) {
      console.log(`✅ Environment loaded from: ${envPath}`);
      envLoaded = true;
      break;
    }
  } catch (error) {
    // Continue to next path
  }
}

// In production on Render, env vars are injected by the platform; allow running without a local .env
if (!envLoaded) {
  console.log('ℹ️ No local .env file found. Proceeding with process.env from the environment.');
}

// Validate required environment variables
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'DYNADOT_API_KEY'
];

const optionalEnvVars = [
  'HUMBLEWORTH_API_URL',
  'REPLICATE_API_TOKEN'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Strongly recommend Redis for persistence in production
if (!process.env.REDIS_URL) {
  console.warn('⚠️ REDIS_URL not set. Using in-memory fallback (non-persistent). Configure REDIS_URL in production.');
}

// Check optional variables
const missingOptional = optionalEnvVars.filter(varName => !process.env[varName]);
if (missingOptional.length > 0) {
  console.log(`⚠️ Missing optional environment variables: ${missingOptional.join(', ')}`);
  console.log('⚠️ Some features may not work properly');
}

class HourlyBatchProcessor {
  constructor() {
    this.scheduler = new CostEffectiveScheduler();
    this.startTime = Date.now();
  }

  async run() {
    console.log('🚀 Starting hourly domain generation batch...');
    console.log('💰 Using cost-effective Universal Domain Generator (50 domains max)');
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    
    try {
      // Generate fresh domains using the cost-effective scheduler
      console.log('🔄 Generating fresh domain gems...');
      const domains = await this.scheduler.generateCostEffectiveBatch();
      
      if (domains && domains.length > 0) {
        console.log(`✅ Successfully generated ${domains.length} domain gems`);
        
        // Log some sample domains
        const sampleDomains = domains.slice(0, 5).map(d => d.domain);
        console.log(`📝 Sample domains: ${sampleDomains.join(', ')}`);
        
        // Log category distribution
        const categories = {};
        domains.forEach(domain => {
          const category = domain.category || 'unknown';
          categories[category] = (categories[category] || 0) + 1;
        });
        console.log(`📊 Category distribution:`, categories);
        
      } else {
        console.log('⚠️ No domains generated in this run.');
      }

      const duration = Date.now() - this.startTime;
      console.log(`⏱️ Batch completed in ${duration}ms`);
      console.log(`✅ Hourly batch finished successfully at: ${new Date().toISOString()}`);

    } catch (error) {
      console.error('❌ Hourly batch failed:', error.message);
      console.error('Stack trace:', error.stack);
      process.exit(1);
    }
  }
}

// Main execution
async function main() {
  const processor = new HourlyBatchProcessor();
  
  // Run the batch
  await processor.run();
}

// Run the batch
main().catch(error => {
  console.error('❌ Fatal error in hourly batch:', error);
  process.exit(1);
});