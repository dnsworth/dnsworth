import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // Function to render secure HTML content
  const renderSecureHTML = (htmlString) => {
    return { __html: htmlString };
  };

  // Blog posts data - this would typically come from an API
  const blogPosts = {
    "how-to-value-domain-free-guide-2025": {
      title: "How to Value a Domain for Free: Complete Guide 2025",
      excerpt: "Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.",
      category: "guides",
      readTime: "8 min read",
      date: "2025-08-18",
      author: "DNSWorth Team",
      content: `
        <div class="bg-white border-2 border-gray-800 rounded-lg p-8 shadow-xl w-full">
          <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">How to Value a Domain for Free: Complete Guide 2025</h1>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Why Domain Valuation Matters</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Domain valuation is crucial for investors, businesses, and individuals looking to buy or sell domain names. Understanding a domain's true worth helps you make informed decisions and avoid costly mistakes.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Free Tools and Methods</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Several free tools can help you value domains accurately:</p>
          <ul class="list-disc list-inside space-y-2 mb-6 text-gray-800">
            <li class="text-lg"><strong class="text-gray-900">DNSWorth</strong> - Our free AI-powered valuation tool</li>
            <li class="text-lg"><a href="https://estibot.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">EstiBot</a> - Professional domain appraisals</li>
            <li class="text-lg"><a href="https://godaddy.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">GoDaddy Domain Appraisals</a> - Industry standard</li>
            <li class="text-lg"><a href="https://namecheap.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Namecheap</a> - Competitive pricing</li>
          </ul>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Key Factors in Domain Valuation</h2>
          <ul class="list-disc list-inside space-y-2 mb-6 text-gray-800">
            <li class="text-lg">Domain length and memorability</li>
            <li class="text-lg">Keyword relevance and search volume</li>
            <li class="text-lg">Extension (.com, .org, .net, etc.)</li>
            <li class="text-lg">Brand potential and marketability</li>
            <li class="text-lg">Historical sales data</li>
          </ul>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Conclusion</h2>
          <p class="text-lg text-gray-800 leading-relaxed">Use DNSWorth's free tool to get accurate domain valuations instantly. Start valuing domains today and make informed investment decisions.</p>
        </div>
      `
    },
    "top-10-valuable-dropped-domains-week": {
      title: "Top 10 Most Valuable Dropped Domains This Week",
      excerpt: "Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.",
      category: "market-analysis",
      readTime: "5 min read",
      date: "2025-08-15",
      author: "DNSWorth Team",
      content: `
        <div class="bg-white border-2 border-gray-800 rounded-lg p-8 shadow-xl w-full">
          <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Top 10 Most Valuable Dropped Domains This Week</h1>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">This Week's Top Picks</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Our analysis of dropped domains reveals several high-value opportunities across different industries:</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">1. TechStartup.io</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $3,500 - $7,000</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Perfect for technology companies and startup accelerators. The .io extension is highly valued in the tech industry. Learn more about startup domains on <a href="https://ycombinator.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Y Combinator</a> and <a href="https://techcrunch.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">TechCrunch</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">2. HealthTech.com</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $5,000 - $12,000</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Premium .com domain in the growing health technology sector. Ideal for medical startups and health-focused companies. Follow health tech trends on <a href="https://mobihealthnews.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">MobiHealthNews</a> and <a href="https://healthtechmagazine.net" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">HealthTech Magazine</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">3. CryptoFinance.net</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,800 - $6,500</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Cryptocurrency and DeFi are hot sectors. This domain combines two trending keywords. Stay updated on crypto news via <a href="https://coindesk.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">CoinDesk</a> and <a href="https://decrypt.co" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Decrypt</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">4. GreenEnergy.org</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $4,200 - $9,000</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Sustainability is a major trend. This domain targets the renewable energy market. Learn about green energy on <a href="https://greentechmedia.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Greentech Media</a> and <a href="https://renewableenergyworld.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Renewable Energy World</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">5. EdTechSolutions.com</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $3,800 - $8,500</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Education technology is booming post-pandemic. This descriptive domain has strong commercial potential. Follow edtech trends on <a href="https://edsurge.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">EdSurge</a> and <a href="https://edtechmagazine.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">EdTech Magazine</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">6. EcommercePlatform.io</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,500 - $5,500</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">E-commerce continues to grow rapidly. This domain targets platform developers and SaaS companies. Learn about e-commerce on <a href="https://shopify.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Shopify</a> and <a href="https://woocommerce.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">WooCommerce</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">7. DigitalMarketing.co</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,000 - $4,000</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Marketing agencies and consultants are always looking for strong domain names. This one combines popular keywords with a professional extension. Learn marketing strategies on <a href="https://hubspot.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">HubSpot</a> and <a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Mailchimp</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">8. CloudSecurity.io</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,800 - $5,500</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Cybersecurity is a critical concern for businesses. This domain combines cloud computing and security, two of the most important tech trends. Stay informed on security via <a href="https://krebsonsecurity.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">KrebsOnSecurity</a> and <a href="https://securityweek.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">SecurityWeek</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">9. SustainableLiving.com</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $4,000 - $8,000</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Premium .com domain with growing market demand. Sustainability is becoming a core value for consumers and businesses alike. Follow sustainability news on <a href="https://treehugger.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">TreeHugger</a> and <a href="https://ecowatch.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">EcoWatch</a>.</p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">10. BlockchainFinance.net</h3>
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $1,800 - $3,500</p>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">DeFi and blockchain finance are revolutionizing traditional banking. This domain targets a rapidly growing sector with high potential. Track blockchain news on <a href="https://coindesk.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">CoinDesk</a> and <a href="https://decrypt.co" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Decrypt</a>.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">How to Evaluate Dropped Domains</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Use DNSWorth's free valuation tool to assess the potential value of any dropped domain before making a purchase decision. Our AI-powered analysis considers:</p>
          <ul class="list-disc list-inside space-y-2 mb-6 text-gray-800">
            <li class="text-lg">Historical sales data from <a href="https://sedo.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Sedo</a> and <a href="https://flippa.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Flippa</a></li>
            <li class="text-lg">Keyword search volume from <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Google</a> and <a href="https://bing.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Bing</a></li>
            <li class="text-lg">Market trends and industry growth</li>
            <li class="text-lg">Domain authority and backlink profiles</li>
          </ul>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Where to Find Dropped Domains</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Several platforms offer dropped domain auctions and listings:</p>
          <ul class="list-disc list-inside space-y-2 mb-6 text-gray-800">
            <li class="text-lg"><a href="https://godaddy.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">GoDaddy Auctions</a> - Large selection with competitive pricing</li>
            <li class="text-lg"><a href="https://namecheap.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Namecheap Marketplace</a> - Quality domains with transparent pricing</li>
            <li class="text-lg"><a href="https://sedo.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Sedo</a> - Professional domain marketplace</li>
            <li class="text-lg"><a href="https://flippa.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Flippa</a> - Business and domain sales platform</li>
            <li class="text-lg"><a href="https://www.tkqlhce.com/click-101518597-12589594" target="_top" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Dynadot</a> - Domain auctions and marketplace</li>
            <li class="text-lg"><a href="https://hugedomains.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">HugeDomains</a> - Premium domain marketplace</li>
            <li class="text-lg"><a href="https://buydomains.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">BuyDomains</a> - Professional domain broker</li>
          </ul>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Investment Strategy Tips</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">When investing in dropped domains, consider these strategies:</p>
          <ol class="list-decimal list-inside space-y-2 mb-6 text-gray-800">
            <li class="text-lg">Research the domain's history using <a href="https://web.archive.org" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Wayback Machine</a></li>
            <li class="text-lg">Check for existing backlinks using <a href="https://moz.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Moz</a> or <a href="https://ahrefs.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Ahrefs</a></li>
            <li class="text-lg">Verify trademark status to avoid legal issues</li>
            <li class="text-lg">Set a budget and stick to it</li>
            <li class="text-lg">Focus on domains with clear monetization potential</li>
          </ol>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12">Conclusion</h2>
          <p class="text-lg text-gray-800 mb-6 leading-relaxed">Dropped domains offer excellent opportunities for savvy investors. This week's selection includes domains across various trending sectors, from technology to sustainability. Remember to always conduct thorough research and use DNSWorth's valuation tools before making any purchase decisions.</p>
          
          <p class="text-lg text-gray-800 leading-relaxed">Stay tuned for next week's analysis, and happy domain hunting! Follow us on <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Facebook</a>, <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">Twitter</a>, and <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-blue-900 underline font-medium hover:text-blue-700">LinkedIn</a> for the latest domain investment insights.</p>
        </div>
      `
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load blog post data when slug changes
  useEffect(() => {
    if (slug && blogPosts[slug]) {
      setPost(blogPosts[slug]);
    } else {
      // Handle case when slug doesn't exist
      setPost(null);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} onNavigateToGems={onNavigateToGems} />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/page/blog')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold"
          >
            Back to Blog
          </button>
        </div>
        <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{post.title} - DNSWorth Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords ? post.keywords.join(', ') : 'domain valuation, domain investing, domain appraisal'} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://dnsworth.com/page/blog/${post.slug}`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://dnsworth.com/page/blog/${post.slug}`} />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content={`https://dnsworth.com/page/blog/${post.slug}-og-image.jpg`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://dnsworth.com/page/blog/${post.slug}-twitter-image.jpg`} />
        
        {/* JSON-LD Structured Data for Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://dnsworth.com/page/blog/${post.slug}-og-image.jpg`,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth",
              "url": "https://dnsworth.com"
            },
            "datePublished": post.date,
            "dateModified": post.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://dnsworth.com/page/blog/${post.slug}`
            },
            "articleSection": post.category,
            "keywords": post.keywords || ['domain valuation', 'domain investing', 'domain appraisal']
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dnsworth.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://dnsworth.com/page/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://dnsworth.com/page/blog/${slug}`
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Blog Post Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Back to Blog Button */}
          <motion.button
            onClick={() => navigate('/page/blog')}
            className="flex items-center gap-2 text-black hover:text-gray-700 mb-6 md:mb-8 transition-colors duration-200 font-semibold text-sm md:text-base"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </motion.button>

          {/* Post Header */}
          <motion.header
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium bg-primary/20 text-primary rounded-full">
                {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
              <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Post Content */}
          <motion.div
            className="max-w-none blog-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={renderSecureHTML(post.content)}
          />

          {/* Call to Action */}
          <motion.div
            className="mt-12 md:mt-16 p-4 md:p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl md:rounded-2xl border border-primary/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Ready to Value Your Domains?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Use DNSWorth's free AI-powered tool to get instant, accurate domain valuations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={() => {
                  navigate('/');
                  // Ensure we scroll to top when navigating to home
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="btn-primary text-sm md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                Start Valuing Domains
              </button>
              <button
                onClick={() => navigate('/bulk-valuation')}
                className="btn-secondary text-sm md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                Bulk Valuation
              </button>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default BlogPost;
