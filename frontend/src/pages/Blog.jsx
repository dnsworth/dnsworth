import { useState, useEffect } from 'react';
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
      title: "How to Value a Domain for Free: Complete Guide 2024",
      excerpt: "Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.",
      category: "guides",
      readTime: "8 min read",
      date: "2024-01-15",
      slug: "how-to-value-domain-free-guide-2024",
      keywords: ["domain valuation", "free domain appraisal", "domain worth", "domain investing guide"]
    },
    {
      id: 2,
      title: "Top 10 Most Valuable Dropped Domains This Week",
      excerpt: "Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.",
      category: "market-analysis",
      readTime: "5 min read",
      date: "2024-01-14",
      slug: "top-10-valuable-dropped-domains-week",
      keywords: ["dropped domains", "domain opportunities", "valuable domains", "domain investing"]
    },
    {
      id: 3,
      title: "DNSWorth vs Other Domain Valuation Tools: Why Free Wins",
      excerpt: "Compare DNSWorth with paid domain valuation services. See why our free AI-powered tool provides the same accuracy without the hefty price tag.",
      category: "comparisons",
      readTime: "6 min read",
      date: "2024-01-13",
      slug: "dnsworth-vs-other-valuation-tools",
      keywords: ["domain valuation tools", "free vs paid", "DNSWorth review", "AI domain valuation"]
    },
    {
      id: 4,
      title: "Domain Investing 101: Building Your First Portfolio",
      excerpt: "Start your domain investing journey with this comprehensive beginner's guide. Learn the fundamentals of domain selection, valuation, and portfolio management.",
      category: "guides",
      readTime: "12 min read",
      date: "2024-01-12",
      slug: "domain-investing-101-portfolio-building",
      keywords: ["domain investing", "portfolio building", "domain selection", "beginner guide"]
    },
    {
      id: 5,
      title: "AI in Domain Valuation: How Technology is Revolutionizing the Industry",
      excerpt: "Explore how artificial intelligence is transforming domain valuation from guesswork to science. Learn about the algorithms and data that power modern appraisals.",
      category: "technology",
      readTime: "7 min read",
      date: "2024-01-11",
      slug: "ai-domain-valuation-revolution",
      keywords: ["AI domain valuation", "machine learning", "domain technology", "valuation algorithms"]
    },
    {
      id: 6,
      title: "Bulk Domain Valuation: Save Hours with Portfolio Analysis",
      excerpt: "Learn how to value hundreds of domains simultaneously using DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers.",
      category: "tools",
      readTime: "4 min read",
      date: "2024-01-10",
      slug: "bulk-domain-valuation-portfolio-analysis",
      keywords: ["bulk valuation", "portfolio analysis", "domain portfolio", "efficient valuation"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'guides', name: 'Guides', count: blogPosts.filter(post => post.category === 'guides').length },
    { id: 'market-analysis', name: 'Market Analysis', count: blogPosts.filter(post => post.category === 'market-analysis').length },
    { id: 'comparisons', name: 'Comparisons', count: blogPosts.filter(post => post.category === 'comparisons').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(post => post.category === 'technology').length },
    { id: 'tools', name: 'Tools', count: blogPosts.filter(post => post.category === 'tools').length }
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                className="group relative bg-white border-4 border-black rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
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

                  {/* Read More Button - Black arrow */}
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-black hover:text-gray-700 font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    Read More 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Hover Effect Ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
              </motion.article>
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
      </section>

      {/* Footer */}
      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default Blog;
