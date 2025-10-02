import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = ({ onNavigateToBulk, onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How to Value a Domain for Free: Complete Guide 2025",
      excerpt: "Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.",
      category: "guides",
      readTime: "8 min read",
      date: "2025-08-18",
      slug: "how-to-value-domain-free-guide-2025",
      keywords: ["domain valuation", "free domain appraisal", "domain worth", "domain investing guide"]
    },
    {
      id: 2,
      title: "Top 10 Most Valuable Dropped Domains This Week",
      excerpt: "Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.",
      category: "market-analysis",
      readTime: "5 min read",
      date: "2025-08-15",
      slug: "top-10-valuable-dropped-domains-week",
      keywords: ["dropped domains", "domain opportunities", "valuable domains", "domain investing"]
    },
    {
      id: 3,
      title: "DNSWorth vs Other Domain Valuation Tools: Why Free Wins",
      excerpt: "Compare DNSWorth with paid domain valuation services. See why our free AI-powered tool provides the same accuracy without the hefty price tag.",
      category: "comparisons",
      readTime: "6 min read",
      date: "2025-08-12",
      slug: "dnsworth-vs-other-valuation-tools",
      keywords: ["domain valuation tools", "free vs paid", "DNSWorth review", "AI domain valuation"]
    },
    {
      id: 4,
      title: "Domain Investing Tips for Beginners: Start Your Portfolio Today",
      excerpt: "New to domain investing? Learn the essential strategies, common pitfalls to avoid, and how to build a profitable domain portfolio from scratch.",
      category: "guides",
      readTime: "12 min read",
      date: "2025-08-10",
      slug: "domain-investing-tips-beginners",
      keywords: ["domain investing", "portfolio building", "domain selection", "beginner guide"]
    },
    {
      id: 5,
      title: "AI in Domain Valuation: How Technology is Revolutionizing the Industry",
      excerpt: "Explore how artificial intelligence is transforming domain valuation from guesswork to science. Learn about the algorithms and data that power modern appraisals.",
      category: "technology",
      readTime: "7 min read",
      date: "2025-08-08",
      slug: "ai-domain-valuation-revolution",
      keywords: ["AI domain valuation", "machine learning", "domain technology", "valuation algorithms"]
    },
    {
      id: 6,
      title: "Bulk Domain Valuation: Save Hours with Portfolio Analysis",
      excerpt: "Learn how to value hundreds of domains simultaneously using DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers.",
      category: "tools",
      readTime: "4 min read",
      date: "2025-08-05",
      slug: "bulk-domain-valuation-portfolio-analysis",
      keywords: ["bulk valuation", "portfolio analysis", "domain portfolio", "efficient valuation"]
    },
    {
      id: 7,
      title: "SEO Benefits of Professional Domain Valuation: Boost Your Rankings",
      excerpt: "Discover how accurate domain valuations can improve your SEO strategy and help you choose domains that perform better in search engines.",
      category: "seo",
      readTime: "8 min read",
      date: "2025-08-08",
      slug: "seo-benefits-domain-valuation",
      keywords: ["SEO", "domain valuation", "search rankings", "domain strategy"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'guides', name: 'Guides', count: blogPosts.filter(post => post.category === 'guides').length },
    { id: 'market-analysis', name: 'Market Analysis', count: blogPosts.filter(post => post.category === 'market-analysis').length },
    { id: 'comparisons', name: 'Comparisons', count: blogPosts.filter(post => post.category === 'comparisons').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(post => post.category === 'technology').length },
    { id: 'tools', name: 'Tools', count: blogPosts.filter(post => post.category === 'tools').length },
    { id: 'seo', name: 'SEO', count: blogPosts.filter(post => post.category === 'seo').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Helmet>
        <title>DNSWorth Blog - Domain Investing Insights & Valuation Strategies</title>
        <meta name="description" content="Expert insights on domain investing, valuation strategies, and market trends. Stay ahead with comprehensive domain industry coverage from DNSWorth." />
        <meta name="keywords" content="domain investing blog, domain valuation strategies, domain market trends, domain investing insights, domain industry news" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/blog" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DNSWorth Blog - Domain Investing Insights & Valuation Strategies" />
        <meta property="og:description" content="Expert insights on domain investing, valuation strategies, and market trends. Stay ahead with comprehensive domain industry coverage." />
        <meta property="og:url" content="https://dnsworth.com/blog" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/blog-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNSWorth Blog - Domain Investing Insights" />
        <meta name="twitter:description" content="Expert insights on domain investing, valuation strategies, and market trends." />
        <meta name="twitter:image" content="https://dnsworth.com/blog-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DNSWorth Blog",
            "description": "Expert insights on domain investing, valuation strategies, and market trends",
            "url": "https://dnsworth.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth",
              "url": "https://dnsworth.com"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://dnsworth.com/blog/${post.slug}`,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "DNSWorth"
              },
              "publisher": {
                "@type": "Organization",
                "name": "DNSWorth"
              }
            }))
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
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            DNSWorth Blog
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Expert insights on domain investing, valuation strategies, and market trends
          </motion.p>
          <motion.p
            className="text-lg text-gray-400"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            Stay ahead of the curve with our comprehensive domain industry coverage
          </motion.p>
        </div>
      </section>

      {/* Dynadot Banner - After Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <a href="https://www.tkqlhce.com/click-101518597-12527405" target="_top" rel="noopener noreferrer">
              <img 
                src="https://www.tqlkg.com/image-101518597-12527405" 
                width="728" 
                height="90" 
                alt="Dynadot - The best domain registrar you've never met" 
                border="0"
                className="mx-auto max-w-full h-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area for Blog Posts */}
            <div className="lg:col-span-3">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map((post) => (
                  <Link 
                    to={`/blog/${post.slug}`}
                    key={post.id}
                    className="block"
                  >
                    <motion.article
                      className="group relative bg-white border-4 border-black rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                      variants={cardVariants}
                      whileHover={{ y: -5 }}
                    >
                    {/* Post Image Placeholder - Same style as About Us */}
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                      <div className="relative z-10 text-4xl text-primary/60">📝</div>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-3xl"></div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
                          {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>

                      {/* Post Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Post Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                                      {/* Hover Effect Ring */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>

              {/* No Posts Message */}
              {filteredPosts.length === 0 && (
                <motion.div
                  className="text-center py-20"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-black mb-2">No posts found</h3>
                  <p className="text-gray-600">Try selecting a different category or check back later for new content.</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar Area for Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 text-center">
                {/* Dynadot Medium Banner (300x250) */}
                <a href="https://www.jdoqocy.com/click-101518597-12527348" target="_top" rel="noopener noreferrer">
                  <img 
                    src="https://www.tqlkg.com/image-101518597-12527348" 
                    width="300" 
                    height="250" 
                    alt="Dynadot - Build a super-powered online presence" 
                    border="0"
                    className="mx-auto max-w-full h-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynadot Small Banner - Before Footer */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <a href="https://www.dpbolvw.net/click-101518597-12533938" target="_top" rel="noopener noreferrer">
              <img 
                src="https://www.awltovhc.com/image-101518597-12533938" 
                width="234" 
                height="60" 
                alt="Dynadot Domain Services" 
                border="0"
                className="mx-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default Blog;
