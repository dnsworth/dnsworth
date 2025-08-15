#!/usr/bin/env node

/**
 * DNSWorth Security Audit Script
 * 
 * This script performs a comprehensive security audit of the project
 * Run with: node security-audit.js
 */

const fs = require('fs');
const path = require('path');

// Security audit configuration
const SECURITY_CHECKS = {
  // Files that should never contain secrets
  forbiddenPatterns: [
    /API_KEY\s*=\s*['"][^'"]+['"]/, // API_KEY = "actual_key"
    /SECRET\s*=\s*['"][^'"]+['"]/, // SECRET = "actual_secret"
    /PASSWORD\s*=\s*['"][^'"]+['"]/, // PASSWORD = "actual_password"
    /TOKEN\s*=\s*['"][^'"]+['"]/, // TOKEN = "actual_token"
    /PRIVATE_KEY\s*=\s*['"][^'"]+['"]/, // PRIVATE_KEY = "actual_key"
    /config\/secrets/,
    /config\/keys/
  ],
  
  // Files that should be ignored
  ignorePatterns: [
    /node_modules/,
    /\.git/,
    /dist/,
    /build/,
    /\.DS_Store/,
    /security-audit\.js/,
    /config\.example\.js/,
    /README\.md/,
    /SECURITY\.md/,
    /\.md$/,
    /package-lock\.json/
  ],
  
  // Critical security files
  criticalFiles: [
    '.env',
    '.env.local',
    '.env.production',
    'config/secrets.js',
    'config/keys.js',
    'secrets.js',
    'keys.js'
  ],
  
  // Security headers to check
  requiredSecurityHeaders: [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security',
    'Content-Security-Policy'
  ]
};

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class SecurityAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
    this.projectRoot = path.join(__dirname);
  }

  // Main audit function
  async runAudit() {
    console.log(`${colors.bold}🔒 DNSWorth Security Audit${colors.reset}\n`);
    
    await this.checkForbiddenPatterns();
    await this.checkCriticalFiles();
    await this.checkGitignore();
    await this.checkDependencies();
    await this.checkEnvironmentVariables();
    await this.checkFilePermissions();
    
    this.generateReport();
  }

  // Check for forbidden patterns in code
  async checkForbiddenPatterns() {
    console.log(`${colors.blue}📝 Checking for forbidden patterns...${colors.reset}`);
    
    const files = await this.getAllFiles(this.projectRoot);
    
    for (const file of files) {
      if (this.shouldIgnoreFile(file)) continue;
      
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        for (const pattern of SECURITY_CHECKS.forbiddenPatterns) {
          if (pattern.test(content)) {
            this.issues.push({
              type: 'CRITICAL',
              file: this.getRelativePath(file),
              message: `Contains forbidden pattern: ${pattern.source}`,
              line: this.findLineNumber(content, pattern)
            });
          }
        }
      } catch (error) {
        this.warnings.push({
          type: 'WARNING',
          file: this.getRelativePath(file),
          message: `Could not read file: ${error.message}`
        });
      }
    }
  }

  // Check for critical security files
  async checkCriticalFiles() {
    console.log(`${colors.blue}🚨 Checking for critical security files...${colors.reset}`);
    
    for (const criticalFile of SECURITY_CHECKS.criticalFiles) {
      const filePath = path.join(this.projectRoot, criticalFile);
      
      if (fs.existsSync(filePath)) {
        this.issues.push({
          type: 'CRITICAL',
          file: criticalFile,
          message: 'Critical security file found - should not exist in repository',
          action: 'Remove this file immediately and add to .gitignore'
        });
      } else {
        this.passed.push({
          type: 'PASS',
          file: criticalFile,
          message: 'Critical file not found (good)'
        });
      }
    }
  }

  // Check .gitignore configuration
  async checkGitignore() {
    console.log(`${colors.blue}📋 Checking .gitignore configuration...${colors.reset}`);
    
    const gitignorePath = path.join(this.projectRoot, '.gitignore');
    
    if (!fs.existsSync(gitignorePath)) {
      this.issues.push({
        type: 'CRITICAL',
        file: '.gitignore',
        message: '.gitignore file not found',
        action: 'Create .gitignore file with security exclusions'
      });
      return;
    }
    
    const content = fs.readFileSync(gitignorePath, 'utf8');
    const requiredPatterns = [
      '.env',
      '*.env',
      'config/secrets',
      'config/keys',
      'secrets/',
      'keys/',
      '*.key',
      '*.pem'
    ];
    
    for (const pattern of requiredPatterns) {
      if (!content.includes(pattern)) {
        this.warnings.push({
          type: 'WARNING',
          file: '.gitignore',
          message: `Missing security pattern: ${pattern}`,
          action: 'Add this pattern to .gitignore'
        });
      } else {
        this.passed.push({
          type: 'PASS',
          file: '.gitignore',
          message: `Pattern found: ${pattern}`
        });
      }
    }
  }

  // Check dependencies for known vulnerabilities
  async checkDependencies() {
    console.log(`${colors.blue}📦 Checking dependencies...${colors.reset}`);
    
    const packageFiles = ['package.json', 'package-lock.json'];
    
    for (const pkgFile of packageFiles) {
      const filePath = path.join(this.projectRoot, pkgFile);
      
      if (fs.existsSync(filePath)) {
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          if (content.dependencies) {
            const deps = Object.keys(content.dependencies);
            
            // Check for known vulnerable packages
            const vulnerablePackages = [
              'moment', 'lodash', 'jquery', 'express-session'
            ];
            
            for (const vulnerablePkg of vulnerablePackages) {
              if (deps.includes(vulnerablePkg)) {
                this.warnings.push({
                  type: 'WARNING',
                  file: pkgFile,
                  message: `Potentially vulnerable package: ${vulnerablePkg}`,
                  action: 'Check for updates and security patches'
                });
              }
            }
          }
          
          this.passed.push({
            type: 'PASS',
            file: pkgFile,
            message: 'Dependencies checked'
          });
        } catch (error) {
          this.warnings.push({
            type: 'WARNING',
            file: pkgFile,
            message: `Could not parse ${pkgFile}: ${error.message}`
          });
        }
      }
    }
  }

  // Check environment variable usage
  async checkEnvironmentVariables() {
    console.log(`${colors.blue}🌍 Checking environment variable usage...${colors.reset}`);
    
    const files = await this.getAllFiles(this.projectRoot);
    
    for (const file of files) {
      if (this.shouldIgnoreFile(file)) continue;
      
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for hardcoded URLs or endpoints
        const hardcodedPatterns = [
          /https?:\/\/[^\s'"]+\.com/,
          /localhost:\d+/,
          /127\.0\.0\.1:\d+/
        ];
        
        for (const pattern of hardcodedPatterns) {
          const matches = content.match(pattern);
          if (matches) {
            this.warnings.push({
              type: 'WARNING',
              file: this.getRelativePath(file),
              message: `Hardcoded URL found: ${matches[0]}`,
              action: 'Consider using environment variables for URLs'
            });
          }
        }
        
        // Check for proper environment variable usage
        if (content.includes('process.env.') || content.includes('import.meta.env.')) {
          this.passed.push({
            type: 'PASS',
            file: this.getRelativePath(file),
            message: 'Environment variables used properly'
          });
        }
      } catch (error) {
        // Ignore read errors
      }
    }
  }

  // Check file permissions
  async checkFilePermissions() {
    console.log(`${colors.blue}🔐 Checking file permissions...${colors.reset}`);
    
    const criticalFiles = [
      '.env',
      'config/secrets.js',
      'config/keys.js'
    ];
    
    for (const criticalFile of criticalFiles) {
      const filePath = path.join(this.projectRoot, criticalFile);
      
      if (fs.existsSync(filePath)) {
        try {
          const stats = fs.statSync(filePath);
          const mode = stats.mode & 0o777;
          
          if (mode > 0o600) {
            this.issues.push({
              type: 'CRITICAL',
              file: criticalFile,
              message: `File permissions too open: ${mode.toString(8)}`,
              action: 'Set permissions to 600 (owner read/write only)'
            });
          }
        } catch (error) {
          // Ignore permission errors
        }
      }
    }
  }

  // Helper functions
  async getAllFiles(dir) {
    const files = [];
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...(await this.getAllFiles(fullPath)));
      } else {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  shouldIgnoreFile(filePath) {
    const relativePath = this.getRelativePath(filePath);
    
    for (const pattern of SECURITY_CHECKS.ignorePatterns) {
      if (pattern.test(relativePath)) {
        return true;
      }
    }
    
    return false;
  }

  getRelativePath(filePath) {
    return path.relative(this.projectRoot, filePath);
  }

  findLineNumber(content, pattern) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        return i + 1;
      }
    }
    return 'unknown';
  }

  // Generate security report
  generateReport() {
    console.log(`\n${colors.bold}📊 Security Audit Report${colors.reset}\n`);
    
    // Summary
    const totalIssues = this.issues.length;
    const totalWarnings = this.warnings.length;
    const totalPassed = this.passed.length;
    
    console.log(`${colors.bold}Summary:${colors.reset}`);
    console.log(`  🔴 Critical Issues: ${totalIssues}`);
    console.log(`  🟡 Warnings: ${totalWarnings}`);
    console.log(`  🟢 Passed: ${totalPassed}`);
    
    // Critical Issues
    if (totalIssues > 0) {
      console.log(`\n${colors.red}${colors.bold}🚨 CRITICAL ISSUES:${colors.reset}`);
      this.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}`);
        console.log(`     ${issue.message}`);
        if (issue.action) {
          console.log(`     Action: ${issue.action}`);
        }
        console.log('');
      });
    }
    
    // Warnings
    if (totalWarnings > 0) {
      console.log(`${colors.yellow}${colors.bold}⚠️  WARNINGS:${colors.reset}`);
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning.file}`);
        console.log(`     ${warning.message}`);
        if (warning.action) {
          console.log(`     Action: ${warning.action}`);
        }
        console.log('');
      });
    }
    
    // Passed checks
    if (totalPassed > 0) {
      console.log(`${colors.green}${colors.bold}✅ PASSED CHECKS:${colors.reset}`);
      this.passed.forEach((passed, index) => {
        console.log(`  ${index + 1}. ${passed.file}: ${passed.message}`);
      });
    }
    
    // Recommendations
    console.log(`\n${colors.blue}${colors.bold}💡 SECURITY RECOMMENDATIONS:${colors.reset}`);
    
    if (totalIssues === 0 && totalWarnings === 0) {
      console.log(`  🎉 Excellent! Your project appears to be secure.`);
    } else {
      console.log(`  1. Fix all critical issues immediately`);
      console.log(`  2. Address warnings within 24 hours`);
      console.log(`  3. Review and update security policies`);
      console.log(`  4. Implement regular security audits`);
      console.log(`  5. Use security scanning tools in CI/CD`);
    }
    
    console.log(`\n${colors.bold}🔒 Security is everyone's responsibility!${colors.reset}\n`);
  }
}

// Run the audit
const auditor = new SecurityAuditor();
auditor.runAudit().catch(console.error);
