# 🚀 DNSWorth Deployment Guide

## Overview
This guide will help you deploy DNSWorth to production with the domain dnsworth.com.

## 🏗️ Architecture
- **Frontend**: React + Vite (deployed to Vercel)
- **Backend**: Node.js + Express (deployed to Render)
- **Domain**: dnsworth.com (configured on GoDaddy)

## 📋 Prerequisites
1. GitHub repository: https://github.com/dnsworth/dnsworth.git
2. GoDaddy account with dnsworth.com domain
3. Vercel account (free)
4. Render account (free)

## 🎯 Step 1: GitHub Setup

### Create Repository
1. Go to https://github.com/dnsworth
2. Click "New repository"
3. Name: `dnsworth`
4. Description: "Free domain valuation website powered by HumbleWorth API"
5. Make it Public
6. Don't initialize with README (we already have one)

### Push Code
```bash
git remote set-url origin https://github.com/dnsworth/dnsworth.git
git push -u origin main
```

## 🌐 Step 2: Frontend Deployment (Vercel)

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import `dnsworth/dnsworth` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build:prod`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables
Add these in Vercel dashboard:
```
VITE_API_BASE_URL=https://api.dnsworth.com
VITE_DONATION_LINK=https://www.paypal.me/dekunley
VITE_DONATION_BACKUP=https://www.paypal.me/dekunley
```

### Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `dnsworth.com`
4. Add `www.dnsworth.com`
5. Vercel will provide DNS records to configure

## 🔧 Step 3: Backend Deployment (Render)

### Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New" → "Web Service"
4. Connect `dnsworth/dnsworth` repository
5. Configure:
   - **Name**: `dnsworth-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:prod`

### Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=https://dnsworth.com,https://www.dnsworth.com
HUMBLEWORTH_API_URL=https://valuation.humbleworth.com/api/valuation
RATE_LIMIT_MAX_REQUESTS=50
REQUEST_TIMEOUT=10000
```

### Custom Domain
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add `api.dnsworth.com`
4. Render will provide DNS records

## 🌍 Step 4: Domain Configuration (GoDaddy)

### DNS Records Setup
In GoDaddy DNS management, add these records:

#### A Records
```
@ (root) → Vercel IP (from Vercel dashboard)
www → Vercel IP (from Vercel dashboard)
api → Render IP (from Render dashboard)
```

#### CNAME Records (Alternative)
```
@ → dnsworth.vercel.app
www → dnsworth.vercel.app
api → dnsworth-backend.onrender.com
```

### SSL Certificate
- **Vercel**: Automatically provides SSL for dnsworth.com
- **Render**: Automatically provides SSL for api.dnsworth.com
- **GoDaddy**: Enable SSL in domain settings

## ✅ Step 5: Testing & Verification

### Test URLs
1. **Frontend**: https://dnsworth.com
2. **Backend**: https://api.dnsworth.com/health
3. **WWW Redirect**: https://www.dnsworth.com → https://dnsworth.com

### Health Checks
```bash
# Frontend
curl -I https://dnsworth.com

# Backend
curl https://api.dnsworth.com/health
```

## 🔄 Step 6: Future Deployments

### Automatic Deployments
- **Vercel**: Automatically deploys on git push to main
- **Render**: Automatically deploys on git push to main

### Manual Deployments
```bash
# Frontend (Vercel)
git push origin main

# Backend (Render)
git push origin main
```

### Environment Variable Updates
1. Update in hosting provider dashboard
2. Redeploy service
3. Test changes

## 🚨 Troubleshooting

### Common Issues
1. **DNS Propagation**: Wait 24-48 hours for full propagation
2. **SSL Issues**: Check hosting provider SSL status
3. **Build Failures**: Check build logs in hosting dashboard
4. **Environment Variables**: Verify all required vars are set

### Support
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Render**: [render.com/docs](https://render.com/docs)
- **GoDaddy**: [godaddy.com/help](https://godaddy.com/help)

## 📊 Monitoring

### Performance
- **Vercel Analytics**: Built-in performance monitoring
- **Render Metrics**: CPU, memory, response time
- **Uptime**: Monitor service health

### Security
- **SSL Status**: Check certificate validity
- **Rate Limiting**: Monitor API usage
- **Security Headers**: Verify security headers

## 🎉 Success!
Once deployed, your DNSWorth application will be available at:
- **Main Site**: https://dnsworth.com
- **API**: https://api.dnsworth.com
- **WWW**: https://www.dnsworth.com (redirects to main)

Your application is now production-ready with enterprise-grade security! 🚀

