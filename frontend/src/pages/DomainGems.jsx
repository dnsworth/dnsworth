import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { domainValuation, handleApiError } from '../utils/api';

const DomainGems = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    tld: 'all',
    search: ''
  });

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load domain gems on component mount
  useEffect(() => {
    loadDomainGems();
  }, []);

  const loadDomainGems = async () => {
    setLoading(true);
    setError('');
    
    try {
      // For now, we'll use mock data. Later this will be replaced with real API calls
      const mockGems = [
        {
          id: 1,
          domain: 'techflow.io',
          description: 'Modern tech platform for workflow automation and digital transformation',
          category: 'Technology',
          tld: '.io',
          estimatedValue: 1250,
          confidence: 87,
          availability: true,
          icon: '⚡',
          tags: ['tech', 'automation', 'platform']
        },
        {
          id: 2,
          domain: 'greenenergy.co',
          description: 'Sustainable energy solutions and renewable technology consulting',
          category: 'Environment',
          tld: '.co',
          estimatedValue: 890,
          confidence: 92,
          availability: true,
          icon: '🌱',
          tags: ['green', 'energy', 'sustainability']
        },
        {
          id: 3,
          domain: 'cryptotrade.net',
          description: 'Advanced cryptocurrency trading platform and market analysis tools',
          category: 'Finance',
          tld: '.net',
          estimatedValue: 2100,
          confidence: 85,
          availability: true,
          icon: '₿',
          tags: ['crypto', 'trading', 'finance']
        },
        {
          id: 4,
          domain: 'healthtech.app',
          description: 'Innovative healthcare technology solutions and telemedicine platform',
          category: 'Healthcare',
          tld: '.app',
          estimatedValue: 1650,
          confidence: 90,
          availability: true,
          icon: '🏥',
          tags: ['health', 'tech', 'medical']
        },
        {
          id: 5,
          domain: 'edulink.org',
          description: 'Educational platform connecting students with online learning resources',
          category: 'Education',
          tld: '.org',
          estimatedValue: 750,
          confidence: 88,
          availability: true,
          icon: '📚',
          tags: ['education', 'learning', 'students']
        },
        {
          id: 6,
          domain: 'fintrack.com',
          description: 'Personal finance management and investment tracking application',
          category: 'Finance',
          tld: '.com',
          estimatedValue: 3200,
          confidence: 94,
          availability: true,
          icon: '💰',
          tags: ['finance', 'tracking', 'investment']
        },
        {
          id: 7,
          domain: 'cloudops.dev',
          description: 'DevOps automation tools and cloud infrastructure management',
          category: 'Technology',
          tld: '.dev',
          estimatedValue: 980,
          confidence: 86,
          availability: true,
          icon: '☁️',
          tags: ['devops', 'cloud', 'automation']
        },
        {
          id: 8,
          domain: 'foodiehub.com',
          description: 'Community platform for food enthusiasts and restaurant discovery',
          category: 'Lifestyle',
          tld: '.com',
          estimatedValue: 1450,
          confidence: 89,
          availability: true,
          icon: '🍽️',
          tags: ['food', 'restaurant', 'community']
        },
        {
          id: 9,
          domain: 'travelwise.io',
          description: 'Smart travel planning and destination recommendation engine',
          category: 'Travel',
          tld: '.io',
          estimatedValue: 1100,
          confidence: 83,
          availability: true,
          icon: '✈️',
          tags: ['travel', 'planning', 'recommendations']
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGems(mockGems);
    } catch (err) {
      setError('Failed to load domain gems. Please try again later.');
      console.error('Error loading domain gems:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterDomain = (domain) => {
    // Open Dynadot registration page with the domain pre-filled
    const dynadotUrl = `https://www.tkqlhce.com/click-101518597-12527405?url=https://dynadot.com/domain/search?domain=${domain}`;
    window.open(dynadotUrl, '_blank', 'noopener,noreferrer');
  };

  const handleValuateDomain = async (domain) => {
    try {
      const result = await domainValuation.getSingle(domain);
      if (result && !result.error) {
        // Update the gem with new valuation
        setGems(prevGems => 
          prevGems.map(gem => 
            gem.domain === domain 
              ? { ...gem, estimatedValue: result.valuation?.estimatedValue || gem.estimatedValue }
              : gem
          )
        );
      }
    } catch (err) {
      console.error('Error valuating domain:', err);
    }
  };

  const filteredGems = gems.filter(gem => {
    const matchesSearch = gem.domain.toLowerCase().includes(filters.search.toLowerCase()) ||
                         gem.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || gem.category === filters.category;
    const matchesTld = filters.tld === 'all' || gem.tld === filters.tld;
    const matchesPrice = filters.priceRange === 'all' || 
                        (filters.priceRange === 'low' && gem.estimatedValue < 1000) ||
                        (filters.priceRange === 'medium' && gem.estimatedValue >= 1000 && gem.estimatedValue < 2500) ||
                        (filters.priceRange === 'high' && gem.estimatedValue >= 2500);
    
    return matchesSearch && matchesCategory && matchesTld && matchesPrice;
  });

  const categories = [...new Set(gems.map(gem => gem.category))];
  const tlds = [...new Set(gems.map(gem => gem.tld))];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Domain Gems - Discover Valuable Available Domains | DNSWorth</title>
        <meta name="description" content="Discover valuable domain names that are currently available for registration. AI-curated gems with instant valuations and direct registration links." />
        <meta name="keywords" content="domain gems, available domains, domain registration, valuable domains, domain discovery, AI domains" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/domain-gems" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Domain Gems - Discover Valuable Available Domains" />
        <meta property="og:description" content="Discover valuable domain names that are currently available for registration with instant valuations." />
        <meta property="og:url" content="https://dnsworth.com/domain-gems" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/domain-gems-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Domain Gems - Discover Valuable Available Domains" />
        <meta name="twitter:description" content="Discover valuable domain names that are currently available for registration." />
        <meta name="twitter:image" content="https://dnsworth.com/domain-gems-twitter-image.jpg" />
      </Helmet>
      
      <Header 
        onBulkValuation={onNavigateToBulk} 
        onNavigateHome={onNavigateHome} 
        onNavigateToGems={onNavigateToGems}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              💎 Domain Gems
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-white mb-8">
              Discover valuable domain names that are currently available for registration. 
              AI-curated gems with instant valuations and direct registration links.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Real-time availability
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Instant valuations
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Direct registration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-900/50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search domains..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* TLD Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">TLD</label>
                <select
                  value={filters.tld}
                  onChange={(e) => setFilters(prev => ({ ...prev, tld: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All TLDs</option>
                  {tlds.map(tld => (
                    <option key={tld} value={tld}>{tld}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $1,000</option>
                  <option value="medium">$1,000 - $2,500</option>
                  <option value="high">Over $2,500</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Gems Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading domain gems...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-500 text-xl mb-4">⚠️</div>
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={loadDomainGems}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">
                    Available Domain Gems ({filteredGems.length})
                  </h2>
                  <div className="text-sm text-gray-400">
                    Updated {new Date().toLocaleTimeString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGems.map((gem) => (
                    <div key={gem.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="p-6">
                        {/* Domain Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{gem.icon}</span>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{gem.domain}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{gem.tld}</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Available
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">${gem.estimatedValue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">EST. VALUE</div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {gem.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {gem.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRegisterDomain(gem.domain)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                          >
                            Register Now
                          </button>
                          <button
                            onClick={() => handleValuateDomain(gem.domain)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                          >
                            Re-value
                          </button>
                        </div>

                        {/* Confidence Score */}
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <span>Confidence: {gem.confidence}%</span>
                          <span>Category: {gem.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredGems.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-gray-400 text-xl mb-4">🔍</div>
                    <p className="text-gray-400 mb-4">No domain gems found matching your filters.</p>
                    <button
                      onClick={() => setFilters({ priceRange: 'all', category: 'all', tld: 'all', search: '' })}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default DomainGems;
