import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your app routes with metadata
const routes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/bulk-valuation',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacy-policy',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/terms-of-service',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/cookie-policy',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate sitemap XML content
function generateSitemapXML() {
  const baseURL = 'https://www.dnsworth.com';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseURL}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Generate and write sitemap
function generateSitemap() {
  try {
    const sitemapContent = generateSitemapXML();
    
    // Write to frontend/public for build inclusion
    const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemapContent, 'utf8');
    console.log('✅ Sitemap generated at:', publicPath);
    
    // Also write to project root for Vercel
    const rootPath = path.join(__dirname, '..', 'sitemap.xml');
    fs.writeFileSync(rootPath, sitemapContent, 'utf8');
    console.log('✅ Sitemap generated at project root:', rootPath);
    
    console.log('🎯 Sitemap generation completed successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap, generateSitemapXML };
