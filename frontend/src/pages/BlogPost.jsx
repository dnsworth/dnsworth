import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { renderSecureHTML } from '../utils/security';

const BlogPost = ({ onNavigateToBulk, onNavigateHome }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // Blog post data - in a real app, this would come from an API or CMS
  const blogPosts = {
    "how-to-value-domain-free-guide-2025": {
      title: "How to Value a Domain for Free: Complete Guide 2025",
      excerpt: "Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.",
      category: "guides",
      readTime: "15 min read",
      date: "2025-08-18",
      author: "DNSWorth Team",
      content: `
        <h1>How to Value a Domain for Free: Complete Guide 2025</h1>
        
        <p className="text-lg text-gray-900 mb-8 leading-relaxed">Domain valuation is both an art and a science. Whether you're looking to buy, sell, or invest in domains, understanding their true worth is crucial for making informed decisions. In this comprehensive guide, we'll show you how to value domains for free using professional techniques and tools that rival paid services.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Why Domain Valuation Matters in 2025</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Domains are digital real estate, and like physical property, their value can fluctuate significantly based on market conditions, trends, and intrinsic factors. A proper valuation helps you:</p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-800">
          <li className="text-lg">Make informed buying decisions and avoid overpaying</li>
          <li className="text-lg">Set realistic selling prices that maximize your returns</li>
          <li className="text-lg">Build a profitable domain portfolio with strategic acquisitions</li>
          <li className="text-lg">Negotiate better deals with buyers and sellers</li>
          <li className="text-lg">Understand the true worth of your digital assets</li>
        </ul>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Key Factors That Determine Domain Value</h2>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Domain Length and Memorability</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Shorter domains are generally more valuable because they're easier to remember and type. Single-word domains are particularly valuable, especially if they're descriptive of a business or industry. For example:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg"><strong className="text-gray-900">Premium:</strong> insurance.com, cars.com, money.com</li>
          <li className="text-lg"><strong className="text-gray-900">Good:</strong> myinsurance.com, buycars.com, investmoney.com</li>
          <li className="text-lg"><strong className="text-gray-900">Average:</strong> myinsurancecompany.com, buycarsonline.com</li>
        </ul>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Keyword Relevance and Search Volume</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Domains containing popular, relevant keywords tend to be more valuable. Use tools like Google Keyword Planner, Ahrefs, or SEMrush to research keyword search volume. High-value keyword domains include:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">Financial terms: loans, insurance, banking, investment</li>
          <li className="text-lg">Technology terms: software, apps, cloud, digital</li>
          <li className="text-lg">Health terms: medical, health, fitness, wellness</li>
          <li className="text-lg">Business terms: business, company, enterprise, solutions</li>
        </ul>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Extension (.com, .org, .net) and TLD Value</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">.com domains are the most valuable and widely recognized. Other extensions can also be valuable but typically command lower prices:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg"><strong className="text-gray-900">.com:</strong> Most valuable, universal recognition</li>
          <li className="text-lg"><strong className="text-gray-900">.org:</strong> Good for organizations and nonprofits</li>
          <li className="text-lg"><strong className="text-gray-900">.net:</strong> Suitable for technology and networking</li>
          <li className="text-lg"><strong className="text-gray-900">.co:</strong> Popular alternative to .com</li>
          <li className="text-lg"><strong className="text-gray-900">.io:</strong> Trending for tech startups</li>
        </ul>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Brand Potential and Marketability</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Domains that could become strong brands are highly valuable. This includes domains that are:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">Catchy and memorable</li>
          <li className="text-lg">Unique and distinctive</li>
          <li className="text-lg">Have marketing potential</li>
          <li className="text-lg">Can be trademarked</li>
        </ul>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Free Domain Valuation Methods</h2>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Comparative Market Analysis (CMA)</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Research similar domains that have recently sold. Look at marketplaces like Sedo, Flippa, Afternic, and GoDaddy Auctions to find comparable sales. This gives you a baseline for pricing.</p>
        
        <p className="text-lg text-gray-800 mb-4"><strong className="text-gray-900">How to do CMA:</strong></p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">Find 5-10 similar domains that sold recently</li>
          <li className="text-lg">Note their sale prices and characteristics</li>
          <li className="text-lg">Adjust for differences in length, keywords, and extension</li>
          <li className="text-lg">Calculate an average price range</li>
        </ol>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Traffic and Revenue Analysis</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">If the domain has existing traffic or generates revenue, this significantly increases its value. Use tools like:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg"><strong className="text-gray-900">SimilarWeb:</strong> Analyze traffic patterns and sources</li>
          <li className="text-lg"><strong className="text-gray-900">Alexa:</strong> Check domain ranking and engagement</li>
          <li className="text-lg"><strong className="text-gray-900">Google Analytics:</strong> If you own the domain</li>
          <li className="text-lg"><strong className="text-gray-900">Wayback Machine:</strong> Check historical content and traffic</li>
        </ul>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Industry Trends and Market Timing</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Stay updated on industry trends. Domains related to emerging technologies or growing industries often increase in value over time. Current trending sectors include:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">Artificial Intelligence and Machine Learning</li>
          <li className="text-lg">Cryptocurrency and Blockchain</li>
          <li className="text-lg">E-commerce and Online Shopping</li>
          <li className="text-lg">Remote Work and Digital Nomadism</li>
          <li className="text-lg">Sustainability and Green Technology</li>
        </ul>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Using DNSWorth for Free Valuations</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">DNSWorth provides instant, AI-powered domain valuations completely free. Our advanced algorithms analyze millions of data points to give you professional-grade accuracy without the cost of traditional appraisal services.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How DNSWorth Works</h3>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg"><strong className="text-gray-900">Enter the domain name</strong> you want to value in our search box</li>
          <li className="text-lg"><strong className="text-gray-900">AI analysis</strong> processes market data, sales history, and industry trends</li>
          <li className="text-lg"><strong className="text-gray-900">Instant results</strong> provide comprehensive valuation in seconds</li>
          <li className="text-lg"><strong className="text-gray-900">Professional accuracy</strong> comparable to paid services</li>
        </ol>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Conclusion</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Domain valuation doesn't have to be expensive or complicated. With the right tools and knowledge, you can accurately assess domain worth for free. DNSWorth's AI-powered platform makes professional-grade valuations accessible to everyone, from beginners to experienced investors.</p>
        
        <p className="text-lg text-gray-800 leading-relaxed">Start valuing domains today and build your portfolio with confidence. Remember, the best investment is an informed one.</p>
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
        <h1>Top 10 Most Valuable Dropped Domains This Week</h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Why Dropped Domains Matter</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Dropped domains represent unique opportunities for investors. These domains were previously owned but not renewed, often due to oversight or strategic decisions. They can offer significant value due to:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">Existing backlinks and SEO value</li>
          <li className="text-lg">Brand recognition and market presence</li>
          <li className="text-lg">Keyword relevance and search volume</li>
          <li className="text-lg">Potential for immediate monetization</li>
        </ul>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">This Week's Top Picks</h2>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">1. TechStartup.io</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,500 - $5,000</p>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Perfect for technology startups and innovation companies. The .io extension is highly valued in the tech community.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. CryptoInvest.net</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $1,800 - $3,200</p>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Cryptocurrency and investment focus with strong keyword relevance.</p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. GreenEnergy.co</h3>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">Estimated Value: $2,200 - $4,500</p>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Sustainability focus with growing market demand.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How to Evaluate Dropped Domains</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Use DNSWorth's free valuation tool to assess the potential value of any dropped domain before making a purchase decision.</p>
      `
    },
    "dnsworth-vs-other-valuation-tools": {
      title: "DNSWorth vs Other Domain Valuation Tools: Why Free Wins",
      excerpt: "Compare DNSWorth with paid domain valuation services. See why our free AI-powered tool provides the same accuracy without the hefty price tag.",
      category: "comparisons",
      readTime: "6 min read",
      date: "2025-08-12",
      author: "DNSWorth Team",
      content: `
        <h1>DNSWorth vs Other Domain Valuation Tools: Why Free Wins</h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Compare DNSWorth with paid domain valuation services. See why our free AI-powered tool provides the same accuracy without the hefty price tag.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Cost Comparison</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Traditional domain valuation services can cost anywhere from $50 to $500 per appraisal. DNSWorth provides the same level of accuracy completely free.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Why DNSWorth is Superior</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-800">
          <li className="text-lg">100% Free - No hidden costs or subscriptions</li>
          <li className="text-lg">AI-Powered Accuracy - Machine learning algorithms for precision</li>
          <li className="text-lg">Instant Results - No waiting for human appraisers</li>
          <li className="text-lg">Bulk Valuation - Value multiple domains simultaneously</li>
        </ul>
      `
    },
    "domain-investing-101-portfolio-building": {
      title: "Domain Investing 101: Building Your First Portfolio",
      excerpt: "Start your domain investing journey with this comprehensive beginner's guide. Learn the fundamentals of domain selection, valuation, and portfolio management.",
      category: "guides",
      readTime: "12 min read",
      date: "2025-08-10",
      author: "DNSWorth Team",
      content: `
        <h1>Domain Investing 101: Building Your First Portfolio</h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Start your domain investing journey with this comprehensive beginner's guide. Learn the fundamentals of domain selection, valuation, and portfolio management.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Getting Started</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Domain investing requires patience, research, and strategic thinking. Start with a small budget and learn as you go.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Portfolio Strategy</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Diversify your portfolio across different categories and price points to minimize risk and maximize potential returns.</p>
      `
    },
    "ai-domain-valuation-revolution": {
      title: "AI in Domain Valuation: How Technology is Revolutionizing the Industry",
      excerpt: "Explore how artificial intelligence is transforming domain valuation from guesswork to science. Learn about the algorithms and data that power modern appraisals.",
      category: "technology",
      readTime: "7 min read",
      date: "2025-08-08",
      author: "DNSWorth Team",
      content: `
        <h1>AI in Domain Valuation: How Technology is Revolutionizing the Industry</h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Explore how artificial intelligence is transforming domain valuation from guesswork to science. Learn about the algorithms and data that power modern appraisals.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The AI Revolution</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Artificial intelligence has transformed domain valuation from subjective opinion to data-driven science. Our algorithms analyze millions of data points in seconds.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How It Works</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Machine learning models process historical sales data, market trends, keyword analysis, and domain characteristics to provide accurate valuations.</p>
      `
    },
    "bulk-domain-valuation-portfolio-analysis": {
      title: "Bulk Domain Valuation: Save Hours with Portfolio Analysis",
      excerpt: "Learn how to value hundreds of domains simultaneously using DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers.",
      category: "tools",
      readTime: "4 min read",
      date: "2025-08-05",
      author: "DNSWorth Team",
      content: `
        <h1>Bulk Domain Valuation: Save Hours with Portfolio Analysis</h1>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Learn how to value hundreds of domains simultaneously using DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Why Bulk Valuation Matters</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Professional domain investors often manage portfolios with hundreds or thousands of domains. Manual valuation would take weeks or months.</p>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">DNSWorth's Solution</h2>
        <p className="text-lg text-gray-800 mb-6 leading-relaxed">Our bulk valuation tool processes up to 100 domains simultaneously, providing instant results and saving countless hours of manual work.</p>
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
        <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
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
        <link rel="canonical" href={`https://dnsworth.com/blog/${post.slug}`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://dnsworth.com/blog/${post.slug}`} />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content={`https://dnsworth.com/blog/${post.slug}-og-image.jpg`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://dnsworth.com/blog/${post.slug}-twitter-image.jpg`} />
        
        {/* JSON-LD Structured Data for Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://dnsworth.com/blog/${post.slug}-og-image.jpg`,
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
              "@id": `https://dnsworth.com/blog/${post.slug}`
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
                "item": "https://dnsworth.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://dnsworth.com/blog/${slug}`
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Blog Post Content */}
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back to Blog Button */}
          <motion.button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-black hover:text-gray-700 mb-8 transition-colors duration-200 font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </motion.button>

          {/* Post Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/20 text-primary rounded-full">
                {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed">
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
            className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Value Your Domains?
            </h3>
            <p className="text-gray-600 mb-6">
              Use DNSWorth's free AI-powered tool to get instant, accurate domain valuations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  navigate('/');
                  // Ensure we scroll to top when navigating to home
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Valuing Domains
              </button>
              <button
                onClick={() => navigate('/bulk-valuation')}
                className="btn-secondary text-lg px-8 py-4"
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
