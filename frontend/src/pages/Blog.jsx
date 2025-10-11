import { Helmet } from 'react-helmet-async';

function Blog({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Blog - DNSWorth | Domain Valuation Insights & Industry News</title>
        <meta name="description" content="Stay updated with the latest domain valuation insights, industry trends, and expert analysis from DNSWorth. Learn about domain investing, appraisal techniques, and market updates." />
        <meta name="keywords" content="domain blog, domain valuation blog, domain investing, domain market trends, domain appraisal insights, domain industry news" />
        <link rel="canonical" href="https://dnsworth.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - DNSWorth | Domain Valuation Insights & Industry News" />
        <meta property="og:description" content="Stay updated with the latest domain valuation insights, industry trends, and expert analysis from DNSWorth." />
        <meta property="og:url" content="https://dnsworth.com/blog" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - DNSWorth | Domain Valuation Insights & Industry News" />
        <meta name="twitter:description" content="Stay updated with the latest domain valuation insights, industry trends, and expert analysis from DNSWorth." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DNSWorth Blog",
            "description": "Domain valuation insights, industry trends, and expert analysis",
            "url": "https://dnsworth.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth",
              "url": "https://dnsworth.com"
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={onNavigateHome}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                DNSWorth
              </button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={onNavigateHome}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={onNavigateToGems}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Domain Gems
              </button>
              <button
                onClick={onNavigateToBulk}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Bulk Valuation
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DNSWorth Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest domain valuation insights, industry trends, and expert analysis.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're working on bringing you valuable content about domain valuation, market trends, and industry insights. 
              Check back soon for expert analysis and tips to help you make better domain investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateToGems}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Domain Gems
              </button>
              <button
                onClick={onNavigateToBulk}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                Try Bulk Valuation
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Domain Valuation Best Practices
            </h3>
            <p className="text-gray-600 text-sm">
              Learn the fundamentals of accurate domain appraisal and how to identify valuable domains in today's market.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Coming Soon
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Market Trends & Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Stay informed about the latest trends in domain investing and market movements.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Coming Soon
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Investment Strategies
            </h3>
            <p className="text-gray-600 text-sm">
              Discover proven strategies for building a profitable domain portfolio.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Coming Soon
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Industry News & Updates
            </h3>
            <p className="text-gray-600 text-sm">
              Get the latest news and updates from the domain industry and DNSWorth.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Coming Soon
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 DNSWorth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Blog;
