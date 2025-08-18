# 🚀 DNSWorth Deployment Guide

## 🔒 **SECURITY FIRST - NO PASSWORDS IN CODE**

This repository contains **ZERO real passwords or secrets**. All sensitive data is managed through environment variables.

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### **✅ Environment Setup**
- [ ] Copy `env.template` to `.env`
- [ ] Generate new APP_SECRET values
- [ ] Add your Zoho app password
- [ ] Configure production URLs

### **✅ Generate New Secrets**
```bash
# Generate new 32-character secrets
node -e "console.log('APP_SECRET_1=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('APP_SECRET_2=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('APP_SECRET_3=' + require('crypto').randomBytes(32).toString('hex'))"
```

### **✅ Environment Variables Required**
```bash
# Server
NODE_ENV=production
PORT=8000

# Security (Generate new ones!)
APP_SECRET_1=your_new_32_character_secret
APP_SECRET_2=your_new_32_character_secret
APP_SECRET_3=your_new_32_character_secret

# Email
ZOHO_APP_PASSWORD=your_zoho_app_password

# URLs
ALLOWED_ORIGINS=https://dnsworth.com,https://www.dnsworth.com
VITE_API_BASE_URL=https://dnsworth.onrender.com
```

## 🚀 **DEPLOYMENT STEPS**

### **Backend (Render.com)**
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy

### **Frontend (Vercel)**
1. Connect your GitHub repository
2. Vercel will auto-deploy
3. No environment variables needed (frontend is static)

## 🔒 **SECURITY FEATURES**

- ✅ **Helmet.js** - Security headers
- ✅ **Rate limiting** - DDoS protection
- ✅ **CORS protection** - Origin validation
- ✅ **Input sanitization** - XSS prevention
- ✅ **Environment variables** - No hardcoded secrets

## ⚠️ **IMPORTANT SECURITY NOTES**

1. **NEVER commit `.env` files**
2. **NEVER commit real passwords**
3. **Generate new secrets for production**
4. **Rotate secrets regularly**
5. **Use environment variables for all sensitive data**

## 🎯 **RESULT**

Your repository will be **100% secure** with:
- ✅ No passwords in code
- ✅ No secrets in Git history
- ✅ All sensitive data externalized
- ✅ Production-ready security
