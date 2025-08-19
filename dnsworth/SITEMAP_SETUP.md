# DNSWorth Sitemap Setup

## Overview
This document explains the automatic sitemap generation setup for the DNSWorth React frontend deployed on Vercel.

## Files Created/Modified

### 1. `frontend/generate-sitemap.js`
- **Purpose**: Automatically generates `sitemap.xml` with all current routes
- **Features**:
  - Generates sitemap with proper XML structure
  - Includes `changefreq` and `priority` for each route
  - Automatically updates `lastmod` date
  - Writes to both `frontend/public/` and project root
  - Uses ES module syntax for compatibility

### 2. `frontend/package.json`
- **Changes**: Added sitemap generation to build process
- **Scripts**:
  - `prebuild`: Runs sitemap generation before build
  - `build`: Now includes `npm run prebuild && vite build`
  - `build:prod`: Production build with sitemap generation
  - `generate-sitemap`: Manual sitemap generation

### 3. `vercel.json`
- **Purpose**: Ensures proper routing and content-type headers
- **Configuration**:
  - Routes `/sitemap.xml` to project root with `application/xml` content-type
  - Routes `/robots.txt` to project root with `text/plain` content-type
  - Sets proper cache headers for both files

### 4. `frontend/public/robots.txt`
- **Purpose**: Search engine crawling instructions
- **Features**:
  - Allows all pages for search engines
  - Blocks AI training bots (GPTBot, CCBot, etc.)
  - Points to sitemap location
  - Updated to use www subdomain

## How It Works

### Automatic Generation
1. **Pre-build Hook**: Every time `npm run build` is executed, the `prebuild` script runs first
2. **Route Discovery**: The script contains a predefined list of all application routes
3. **XML Generation**: Creates properly formatted XML with sitemap protocol
4. **Dual Output**: Writes to both `frontend/public/` (for build inclusion) and project root (for Vercel)

### Route Configuration
```javascript
const routes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    path: '/bulk-valuation',
    changefreq: 'weekly',
    priority: '0.8'
  },
  // ... other routes
];
```

### Content-Type Headers
- **sitemap.xml**: `application/xml`
- **robots.txt**: `text/plain`
- **Cache Control**: `public, max-age=3600`

## Deployment Flow

### Local Development
1. Run `npm run generate-sitemap` to manually generate sitemap
2. Sitemap is created in both locations
3. Can be committed to git for testing

### Production Build
1. Vercel triggers build on git push
2. `prebuild` script runs automatically
3. Sitemap is generated with current date
4. Build completes with fresh sitemap
5. Vercel serves files with proper content-type headers

### URL Access
- **Sitemap**: `https://www.dnsworth.com/sitemap.xml`
- **Robots**: `https://www.dnsworth.com/robots.txt`

## Adding New Routes

To add new routes to the sitemap:

1. **Edit** `frontend/generate-sitemap.js`
2. **Add** new route object to the `routes` array:
   ```javascript
   {
     path: '/new-page',
     changefreq: 'weekly', // or 'daily', 'monthly', 'yearly'
     priority: '0.7'        // 0.0 to 1.0
   }
   ```
3. **Commit and push** - sitemap will be automatically updated on next deployment

## SEO Benefits

### Search Engine Optimization
- **Crawling Efficiency**: Search engines can discover all pages quickly
- **Update Frequency**: Clear indication of how often pages change
- **Page Priority**: Helps search engines understand page importance
- **Last Modified**: Shows when content was last updated

### Technical SEO
- **Proper XML Structure**: Follows sitemap protocol standards
- **Content-Type Headers**: Ensures correct interpretation by search engines
- **Cache Headers**: Optimizes delivery and reduces server load
- **HTTPS URLs**: Secure URLs for better search ranking

## Troubleshooting

### Common Issues

#### Sitemap Not Generating
- Check if `generate-sitemap.js` exists in `frontend/` directory
- Verify `package.json` has `prebuild` script
- Ensure Node.js is available in build environment

#### Wrong Content-Type
- Verify `vercel.json` configuration
- Check that routes point to correct destinations
- Ensure headers are properly formatted

#### 404 Errors
- Confirm sitemap.xml exists in project root
- Check Vercel deployment logs
- Verify file permissions and routing

### Debugging Commands
```bash
# Test sitemap generation locally
cd frontend
node generate-sitemap.js

# Check build process
npm run build

# Verify generated files
ls -la ../sitemap.xml
ls -la public/sitemap.xml
```

## Best Practices

### Maintenance
- **Regular Updates**: Sitemap updates automatically on each deployment
- **Route Review**: Periodically review and update route priorities
- **Change Frequency**: Set realistic change frequencies for each page type

### Performance
- **Build Integration**: Sitemap generation is part of build process
- **Caching**: Proper cache headers reduce server load
- **Efficient Routing**: Vercel serves static files directly

### Security
- **No Sensitive Data**: Sitemap only contains public URLs
- **Input Validation**: Routes are hardcoded, no external input
- **HTTPS Only**: All URLs use secure protocol

## Future Enhancements

### Potential Improvements
- **Dynamic Routes**: Generate routes from React Router configuration
- **Image Sitemaps**: Include image URLs for better SEO
- **News Sitemaps**: For content-heavy pages
- **Video Sitemaps**: If video content is added
- **Internationalization**: Support for multiple languages

### Monitoring
- **Search Console**: Submit sitemap to Google Search Console
- **Bing Webmaster**: Submit to Bing Webmaster Tools
- **Analytics**: Track sitemap submission and crawling success
- **Error Logging**: Monitor for sitemap generation failures

---

**Last Updated**: August 15, 2025  
**Version**: 1.0  
**Maintainer**: DNSWorth Team






