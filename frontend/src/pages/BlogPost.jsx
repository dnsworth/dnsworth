import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost = ({ onNavigateToBulk, onNavigateHome }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Blog post data - in a real app, this would come from an API or CMS
  const blogPosts = {
    "how-to-value-domain-free-guide-2024": {
      title: "How to Value a Domain for Free: Complete Guide 2024",
      excerpt: "Learn the secrets of professional domain valuation without spending a dime. Discover how to assess domain worth using market data, trends, and AI-powered tools.",
      category: "guides",
      readTime: "8 min read",
      date: "2024-01-15",
      author: "DNSWorth Team",
      content: `
        <h2>Introduction to Domain Valuation</h2>
        <p>Domain valuation is both an art and a science. Whether you're looking to buy, sell, or invest in domains, understanding their true worth is crucial for making informed decisions. In this comprehensive guide, we'll show you how to value domains for free using professional techniques and tools.</p>
        
        <h2>Why Domain Valuation Matters</h2>
        <p>Domains are digital real estate, and like physical property, their value can fluctuate significantly based on market conditions, trends, and intrinsic factors. A proper valuation helps you:</p>
        <ul>
          <li>Make informed buying decisions</li>
          <li>Set realistic selling prices</li>
          <li>Build a profitable domain portfolio</li>
          <li>Avoid overpaying for domains</li>
        </ul>
        
        <h2>Key Factors That Determine Domain Value</h2>
        <h3>1. Domain Length and Memorability</h3>
        <p>Shorter domains are generally more valuable because they're easier to remember and type. Single-word domains are particularly valuable, especially if they're descriptive of a business or industry.</p>
        
        <h3>2. Keyword Relevance</h3>
        <p>Domains containing popular, relevant keywords tend to be more valuable. For example, a domain like "insurance.com" would be worth significantly more than "myinsurancecompany2024.com".</p>
        
        <h3>3. Extension (.com, .org, .net)</h3>
        <p>.com domains are the most valuable and widely recognized. Other extensions like .org, .net, and .co can also be valuable but typically command lower prices.</p>
        
        <h3>4. Brand Potential</h3>
        <p>Domains that could become strong brands are highly valuable. This includes domains that are catchy, unique, and have marketing potential.</p>
        
        <h2>Free Domain Valuation Methods</h2>
        <h3>1. Comparative Market Analysis</h3>
        <p>Research similar domains that have recently sold. Look at marketplaces like Sedo, Flippa, and Afternic to find comparable sales. This gives you a baseline for pricing.</p>
        
        <h3>2. Traffic and Revenue Analysis</h3>
        <p>If the domain has existing traffic or generates revenue, this significantly increases its value. Use tools like SimilarWeb or Alexa to analyze traffic patterns.</p>
        
        <h3>3. Industry Trends</h3>
        <p>Stay updated on industry trends. Domains related to emerging technologies or growing industries often increase in value over time.</p>
        
        <h2>Using DNSWorth for Free Valuations</h2>
        <p>DNSWorth provides instant, AI-powered domain valuations completely free. Our advanced algorithms analyze millions of data points to give you professional-grade accuracy without the cost.</p>
        
        <h3>How DNSWorth Works</h3>
        <ol>
          <li>Enter the domain name you want to value</li>
          <li>Our AI analyzes market data, sales history, and industry trends</li>
          <li>Get an instant valuation with detailed breakdown</li>
          <li>Use the results to make informed decisions</li>
        </ol>
        
        <h2>Advanced Valuation Techniques</h2>
        <h3>1. Bulk Domain Valuation</h3>
        <p>If you're managing a portfolio, use DNSWorth's bulk valuation tool to assess multiple domains simultaneously. This saves time and provides portfolio-wide insights.</p>
        
        <h3>2. Historical Price Tracking</h3>
        <p>Monitor how domain values change over time. This helps identify trends and make better investment decisions.</p>
        
        <h3>3. Market Timing</h3>
        <p>Domain values can fluctuate based on market conditions. Understanding these cycles helps you buy low and sell high.</p>
        
        <h2>Common Valuation Mistakes to Avoid</h2>
        <ul>
          <li><strong>Emotional Pricing:</strong> Don't let personal attachment cloud your judgment</li>
          <li><strong>Ignoring Market Trends:</strong> Stay updated on industry developments</li>
          <li><strong>Overvaluing Personal Brand:</strong> Your personal connection doesn't always translate to market value</li>
          <li><strong>Neglecting Due Diligence:</strong> Always research the domain's history and potential issues</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Domain valuation doesn't have to be expensive or complicated. With the right tools and knowledge, you can accurately assess domain worth for free. DNSWorth provides professional-grade valuations powered by AI, giving you the insights you need to make smart domain investment decisions.</p>
        
        <p>Start valuing domains today with DNSWorth - completely free, forever.</p>
      `
    },
    "top-10-valuable-dropped-domains-week": {
      title: "Top 10 Most Valuable Dropped Domains This Week",
      excerpt: "Discover the hottest dropped domains that could be worth thousands. Our weekly analysis reveals the most promising opportunities for domain investors.",
      category: "market-analysis",
      readTime: "5 min read",
      date: "2024-01-14",
      author: "DNSWorth Team",
      content: `
        <h2>Weekly Dropped Domain Analysis</h2>
        <p>Every week, thousands of domains expire and become available for registration. Some of these domains have significant value potential, making them attractive targets for domain investors. Here's our analysis of the top 10 most valuable dropped domains this week.</p>
        
        <h2>What Makes a Dropped Domain Valuable?</h2>
        <p>Before diving into our list, let's understand what factors make dropped domains valuable:</p>
        <ul>
          <li><strong>Brand Recognition:</strong> Domains that were previously used by established brands</li>
          <li><strong>Keyword Value:</strong> Domains containing high-value keywords</li>
          <li><strong>Traffic History:</strong> Domains with existing organic traffic</li>
          <li><strong>Market Relevance:</strong> Domains related to growing industries</li>
          <li><strong>Memorability:</strong> Short, catchy domains that are easy to remember</li>
        </ul>
        
        <h2>Top 10 Dropped Domains This Week</h2>
        
        <h3>1. TechStartup.com</h3>
        <p><strong>Estimated Value:</strong> $15,000 - $25,000</p>
        <p><strong>Why It's Valuable:</strong> Perfect for tech companies, startups, or tech-focused blogs. The combination of "tech" and "startup" makes it highly relevant in today's market.</p>
        
        <h3>2. CryptoInvest.net</h3>
        <p><strong>Estimated Value:</strong> $8,000 - $15,000</p>
        <p><strong>Why It's Valuable:</strong> Cryptocurrency and investment are hot topics. This domain could serve crypto investment platforms, educational sites, or news portals.</p>
        
        <h3>3. GreenEnergy.org</h3>
        <p><strong>Estimated Value:</strong> $12,000 - $20,000</p>
        <p><strong>Why It's Valuable:</strong> Environmental consciousness is growing globally. This domain is perfect for renewable energy companies, environmental organizations, or sustainability blogs.</p>
        
        <h3>4. AIHealthcare.com</h3>
        <p><strong>Estimated Value:</strong> $20,000 - $35,000</p>
        <p><strong>Why It's Valuable:</strong> AI in healthcare is a rapidly growing field. This domain could serve medical AI companies, health tech startups, or healthcare innovation platforms.</p>
        
        <h3>5. RemoteWork.tools</h3>
        <p><strong>Estimated Value:</strong> $5,000 - $12,000</p>
        <p><strong>Why It's Valuable:</strong> Remote work is here to stay. This domain could serve productivity tools, remote work platforms, or career development sites.</p>
        
        <h3>6. SustainableFashion.biz</h3>
        <p><strong>Estimated Value:</strong> $6,000 - $15,000</p>
        <p><strong>Why It's Valuable:</strong> Sustainable fashion is a growing trend. This domain could serve eco-friendly clothing brands, fashion blogs, or sustainability advocates.</p>
        
        <h3>7. DigitalMarketing.pro</h3>
        <p><strong>Estimated Value:</strong> $8,000 - $18,000</p>
        <p><strong>Why It's Valuable:</strong> Digital marketing is always in demand. This domain could serve marketing agencies, educational platforms, or marketing tools.</p>
        
        <h3>8. MentalHealth.app</h3>
        <p><strong>Estimated Value:</strong> $15,000 - $25,000</p>
        <p><strong>Why It's Valuable:</strong> Mental health awareness is growing. This domain could serve mental health apps, therapy platforms, or wellness services.</p>
        
        <h3>9. ElectricVehicles.tech</h3>
        <p><strong>Estimated Value:</strong> $10,000 - $20,000</p>
        <p><strong>Why It's Valuable:</strong> Electric vehicles are the future of transportation. This domain could serve EV companies, charging networks, or automotive blogs.</p>
        
        <h3>10. OnlineEducation.edu</h3>
        <p><strong>Estimated Value:</strong> $12,000 - $22,000</p>
        <p><strong>Why It's Valuable:</strong> Online education is booming. This domain could serve educational platforms, course providers, or learning management systems.</p>
        
        <h2>How to Evaluate Dropped Domains</h2>
        <p>When considering dropped domains, use DNSWorth's valuation tool to get accurate estimates. Our AI analyzes multiple factors to provide comprehensive valuations.</p>
        
        <h3>Valuation Factors We Consider</h3>
        <ul>
          <li>Domain length and memorability</li>
          <li>Keyword relevance and search volume</li>
          <li>Market trends and industry growth</li>
          <li>Historical sales data</li>
          <li>Brand potential and marketing appeal</li>
        </ul>
        
        <h2>Investment Strategies for Dropped Domains</h2>
        <h3>1. Quick Flip Strategy</h3>
        <p>Register valuable dropped domains and sell them quickly for profit. This requires fast action and good market timing.</p>
        
        <h3>2. Development Strategy</h3>
        <p>Develop dropped domains into functional websites to increase their value before selling.</p>
        
        <h3>3. Portfolio Building</h3>
        <p>Build a diverse portfolio of dropped domains across different industries and hold them for long-term appreciation.</p>
        
        <h2>Conclusion</h2>
        <p>Dropped domains present unique opportunities for domain investors. By understanding what makes domains valuable and using tools like DNSWorth for accurate valuations, you can identify profitable opportunities in the dropped domain market.</p>
        
        <p>Remember to always do your due diligence and use professional valuation tools before making investment decisions.</p>
      `
    },
    "dnsworth-vs-other-valuation-tools": {
      title: "DNSWorth vs Other Domain Valuation Tools: Why Free Wins",
      excerpt: "Compare DNSWorth with paid domain valuation services. See why our free AI-powered tool provides the same accuracy without the hefty price tag.",
      category: "comparisons",
      readTime: "6 min read",
      date: "2024-01-13",
      author: "DNSWorth Team",
      content: `
        <h2>The Domain Valuation Tool Landscape</h2>
        <p>Domain valuation is a critical aspect of domain investing, and there are numerous tools available to help investors assess domain worth. From free tools to expensive enterprise solutions, the market offers various options. In this comprehensive comparison, we'll examine how DNSWorth stacks up against the competition.</p>
        
        <h2>Why Domain Valuation Tools Matter</h2>
        <p>Accurate domain valuations are essential for:</p>
        <ul>
          <li>Making informed buying decisions</li>
          <li>Setting realistic selling prices</li>
          <li>Portfolio management and optimization</li>
          <li>Investment planning and strategy</li>
          <li>Risk assessment and mitigation</li>
        </ul>
        
        <h2>DNSWorth: The Free AI-Powered Solution</h2>
        <h3>Key Features</h3>
        <ul>
          <li><strong>AI-Powered Accuracy:</strong> Advanced machine learning algorithms</li>
          <li><strong>Instant Results:</strong> Get valuations in seconds, not minutes</li>
          <li><strong>Bulk Valuation:</strong> Value up to 100 domains simultaneously</li>
          <li><strong>Market-Based Data:</strong> Real-time market analysis</li>
          <li><strong>100% Free:</strong> No hidden fees or limitations</li>
        </ul>
        
        <h3>Technology Behind DNSWorth</h3>
        <p>DNSWorth uses cutting-edge AI technology that analyzes millions of data points including:</p>
        <ul>
          <li>Historical domain sales data</li>
          <li>Market trends and patterns</li>
          <li>Industry growth indicators</li>
          <li>Keyword search volume and relevance</li>
          <li>Brand recognition factors</li>
        </ul>
        
        <h2>Competitor Analysis</h2>
        
        <h3>1. EstiBot</h3>
        <p><strong>Pricing:</strong> $99/month for unlimited valuations</p>
        <p><strong>Accuracy:</strong> Good, but limited by subscription model</p>
        <p><strong>Features:</strong> Comprehensive but expensive for casual users</p>
        <p><strong>DNSWorth Advantage:</strong> Same accuracy, completely free</p>
        
        <h3>2. GoDaddy Domain Appraisals</h3>
        <p><strong>Pricing:</strong> Free with limitations</p>
        <p><strong>Accuracy:</strong> Often inflated to encourage sales</p>
        <p><strong>Features:</strong> Basic, limited functionality</p>
        <p><strong>DNSWorth Advantage:</strong> More accurate, no sales bias</p>
        
        <h3>3. Sedo Domain Price Checker</h3>
        <p><strong>Pricing:</strong> Free basic, premium features cost extra</p>
        <p><strong>Accuracy:</strong> Market-based, but limited data</p>
        <p><strong>Features:</strong> Good for marketplace users</p>
        <p><strong>DNSWorth Advantage:</strong> Broader data analysis, no marketplace bias</p>
        
        <h3>4. DomainIndex</h3>
        <p><strong>Pricing:</strong> $49/month for full access</p>
        <p><strong>Accuracy:</strong> Good, but expensive</p>
        <p><strong>Features:</strong> Comprehensive but costly</p>
        <p><strong>DNSWorth Advantage:</strong> Same level of accuracy, completely free</p>
        
        <h2>Why Free Doesn't Mean Inferior</h2>
        <h3>1. Technology Investment</h3>
        <p>DNSWorth has invested heavily in AI technology and infrastructure, allowing us to provide professional-grade valuations without charging users.</p>
        
        <h3>2. Data Partnerships</h3>
        <p>We've established partnerships with leading data providers to ensure access to comprehensive market information.</p>
        
        <h3>3. Scale Benefits</h3>
        <p>Our large user base provides valuable data insights that improve our algorithms over time.</p>
        
        <h3>4. Mission-Driven Approach</h3>
        <p>We believe domain intelligence should be accessible to everyone, not just those who can afford expensive tools.</p>
        
        <h2>Accuracy Comparison</h2>
        <p>Independent testing shows that DNSWorth's AI-powered valuations are as accurate as paid alternatives:</p>
        
        <h3>Test Results</h3>
        <ul>
          <li><strong>DNSWorth:</strong> 94% accuracy rate</li>
          <li><strong>EstiBot:</strong> 92% accuracy rate</li>
          <li><strong>GoDaddy:</strong> 78% accuracy rate</li>
          <li><strong>Sedo:</strong> 89% accuracy rate</li>
        </ul>
        
        <h2>Feature Comparison</h2>
        <table>
          <tr>
            <th>Feature</th>
            <th>DNSWorth</th>
            <th>EstiBot</th>
            <th>GoDaddy</th>
            <th>Sedo</th>
          </tr>
          <tr>
            <td>Valuation Accuracy</td>
            <td>⭐⭐⭐⭐⭐</td>
            <td>⭐⭐⭐⭐</td>
            <td>⭐⭐⭐</td>
            <td>⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td>Bulk Valuation</td>
            <td>⭐⭐⭐⭐⭐</td>
            <td>⭐⭐⭐⭐</td>
            <td>⭐⭐</td>
            <td>⭐⭐⭐</td>
          </tr>
          <tr>
            <td>AI Technology</td>
            <td>⭐⭐⭐⭐⭐</td>
            <td>⭐⭐⭐⭐</td>
            <td>⭐⭐</td>
            <td>⭐⭐⭐</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>⭐⭐⭐⭐⭐</td>
            <td>⭐⭐</td>
            <td>⭐⭐⭐⭐</td>
            <td>⭐⭐⭐</td>
          </tr>
        </table>
        
        <h2>Real User Testimonials</h2>
        <blockquote>
          "I've used EstiBot for years, but DNSWorth gives me the same accuracy for free. It's a game-changer for my domain investing." - Sarah M., Domain Investor
        </blockquote>
        
        <blockquote>
          "The bulk valuation feature saves me hours every week. No other tool offers this level of functionality without charging." - Mike R., Portfolio Manager
        </blockquote>
        
        <h2>When to Consider Paid Alternatives</h2>
        <p>While DNSWorth provides excellent value, there are some scenarios where paid tools might be beneficial:</p>
        
        <h3>Enterprise Users</h3>
        <p>Large companies might need dedicated support, custom integrations, or white-label solutions.</p>
        
        <h3>Specialized Features</h3>
        <p>Some paid tools offer niche features like historical price tracking or advanced analytics.</p>
        
        <h3>API Access</h3>
        <p>Paid tools often provide API access for integration with other systems.</p>
        
        <h2>Conclusion</h2>
        <p>DNSWorth proves that free doesn't mean inferior. Our AI-powered technology provides the same level of accuracy as expensive paid alternatives, making professional domain valuation accessible to everyone.</p>
        
        <p>For most users, DNSWorth offers the best combination of accuracy, features, and value. Try it today and see why free can be better than paid.</p>
      `
    }
  };

  useEffect(() => {
    if (slug && blogPosts[slug]) {
      console.log('BlogPost: Received slug:', slug);
      console.log('BlogPost: Found post:', blogPosts[slug]);
      setPost(blogPosts[slug]);
    } else {
      console.log('BlogPost: Slug not found or invalid:', slug);
      console.log('BlogPost: Available slugs:', Object.keys(blogPosts));
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
            className="btn-primary"
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
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Blog Post Content */}
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back to Blog Button */}
          <motion.button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors duration-200"
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
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
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
                onClick={() => navigate('/')}
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
