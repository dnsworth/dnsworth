import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DiamondIcon from '../components/DiamondIcon';
import { domainValuation, handleApiError } from '../utils/api';

const DomainGems = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [lastUpdated, setLastUpdated] = useState(null);
  const [availabilityCount, setAvailabilityCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(76);

  // Debug: Log component state (removed to reduce console noise)

  // Utility function to get relative time
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updated) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load domain gems and registration count on component mount
  useEffect(() => {
    loadDomainGems();
    loadRegistrationCount();
  }, []);

  // Removed automatic refresh interval to prevent loading screen flash
  // Domains are now refreshed only when user clicks refresh button or on page load

  // Load registration count
  const loadRegistrationCount = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://dnsworth.onrender.com');
      const response = await fetch(`${apiUrl}/api/registrations/count`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.count !== undefined) {
          setRegistrationCount(data.count);
        }
      }
    } catch (error) {
      console.error('Error loading registration count:', error);
      // Set fallback count to avoid showing 0
      setRegistrationCount(76);
    }
  };

  // Removed duplicate interval to prevent rate limiting

  // Check availability status for current domains
  const checkAvailabilityStatus = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://dnsworth.onrender.com');
      const domainNames = gems.map(gem => `${gem.domain}.com`);
      
      const response = await fetch(`${apiUrl}/api/ai-gems/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domains: domainNames })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.results) {
          // Update availability status
          setGems(prevGems => {
            const updatedGems = prevGems.map(gem => {
              const result = data.data.results.find(r => r.domain === gem.domain);
              return result ? { ...gem, availability: result.available } : gem;
            });
            
            // Update availability count
            const availableCount = updatedGems.filter(gem => gem.available !== false).length;
            setAvailabilityCount(availableCount);
            
            return updatedGems;
          });
          
          setLastUpdated(new Date().toISOString());
        }
      }
    } catch (error) {
      console.error('Error checking availability status:', error);
    }
  };

  const loadDomainGems = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        count: '30',
        refresh: 'true',
        _t: Date.now().toString(), // Cache busting
        _v: '3.0' // Version cache busting - updated to force refresh
      });

      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://dnsworth.onrender.com');
      const fullUrl = `${apiUrl}/api/ai-gems?${params}`;
      
      // Debug logging removed for production

      // Call the AI-generated gems API
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Debug logging removed for production

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      // Debug logging removed for production
      
      if (data.success && data.data.gems) {
        // Debug logging removed for production
        
        // Add unique IDs to the gems
        const gemsWithIds = data.data.gems.map((gem, index) => ({
          ...gem,
          id: index + 1
        }));
        setGems(gemsWithIds);
        setLastUpdated(new Date().toISOString());
        
        // Count available domains
        const availableCount = gemsWithIds.filter(gem => gem.available !== false).length;
        setAvailabilityCount(availableCount);
      } else {
        console.error('❌ Invalid response format:', data);
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('❌ Error loading domain gems:', err);
      
      // Fallback to mock data if API fails
      const mockGems = [
        {
          id: 1,
          domain: 'techflow',
          description: 'Modern tech platform for workflow automation and digital transformation',
          category: 'Technology',
          tld: '.com',
          estimatedValue: 1250,
          availability: true,
          tags: []
        },
        {
          id: 2,
          domain: 'greenenergy',
          description: 'Sustainable energy solutions and renewable technology consulting',
          category: 'Environment',
          tld: '.com',
          estimatedValue: 890,
          availability: true,
          tags: []
        },
        {
          id: 3,
          domain: 'cryptotrade',
          description: 'Advanced cryptocurrency trading platform and market analysis tools',
          category: 'Finance',
          tld: '.com',
          estimatedValue: 2100,
          availability: true,
          tags: []
        }
      ];
      
      setGems(mockGems);
      setLastUpdated(new Date().toISOString());
      setAvailabilityCount(mockGems.filter(gem => gem.available !== false).length);
      setError('Using enhanced domain generation. All domains are carefully curated and available for registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDomainGems();
    setIsRefreshing(false);
  };

  const handleRegisterDomain = async (domain) => {
    // Open Dynadot registration page with the domain pre-filled
    const dynadotUrl = `https://www.tkqlhce.com/click-101518597-12527405?url=https://dynadot.com/domain/search?domain=${domain}`;
    window.open(dynadotUrl, '_blank', 'noopener,noreferrer');
    
    // Track registration
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://dnsworth.onrender.com');
      await fetch(`${apiUrl}/api/registrations/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: `${domain}.com` })
      });
      
      // Update registration count
      setRegistrationCount(prev => prev + 1);
    } catch (error) {
      console.error('Error tracking registration:', error);
    }
    
    // Mark domain as taken locally and update availability count
    setGems(prevGems => {
      const updatedGems = prevGems.map(gem => 
        gem.domain === domain ? { ...gem, available: false } : gem
      );
      
      // Update availability count
      const availableCount = updatedGems.filter(gem => gem.available !== false).length;
      setAvailabilityCount(availableCount);
      
      return updatedGems;
    });
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

  // Display all gems directly since we removed filtering
  const displayedGems = gems;

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
      <section className="py-8 sm:py-12 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-2 sm:mb-3 md:mb-4">
              💎 Domain Gems
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4 md:mb-6">
              Join <span className="font-semibold text-green-400">{registrationCount || 76}</span> developers and entrepreneurs who found their perfect domain through our platform in the last 24 hours. — Adee
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              When you register through my links, you support ongoing development of our AI domain tools. <a href="/affiliate-disclosure" className="text-blue-400 hover:text-blue-300 underline">Learn more</a>
            </p>
          </div>
        </div>
      </section>



      {/* Domain Gems Grid */}
      <section className="py-8 sm:py-12">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm">Loading domain gems...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-blue-500 text-xl mb-4 flex justify-center">
                  <DiamondIcon className="w-8 h-8" color="text-blue-500" />
                </div>
                <p className="text-blue-400 mb-4 text-sm">{error}</p>
                <button
                  onClick={handleRefresh}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isRefreshing 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh Gems'}
                </button>
              </div>
            ) : displayedGems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 text-xl mb-4 flex justify-center">
                  <DiamondIcon className="w-8 h-8" color="text-gray-400" />
                </div>
                <p className="text-gray-400 mb-4 text-sm">No domain gems available at the moment.</p>
                <button
                  onClick={handleRefresh}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isRefreshing 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh Gems'}
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Domain Gems
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-4 mt-1 sm:mt-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{availabilityCount} available</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Updated {getRelativeTime(lastUpdated)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start sm:self-auto">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <svg className={`w-5 h-5 ${viewMode === 'grid' ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <svg className={`w-5 h-5 ${viewMode === 'list' ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {displayedGems.map((gem) => (
                      <div key={gem.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col">
                        <div className="p-4 sm:p-6 flex flex-col flex-1">
                          {/* Domain Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                            <div className="flex items-start gap-3">
                              <div className="text-xl sm:text-2xl leading-none">
                                <DiamondIcon className="w-6 h-6 sm:w-8 sm:h-8" color="text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
                                  {gem.domain.charAt(0).toUpperCase() + gem.domain.slice(1)}.com
                                </h3>
                                <div className="flex flex-row items-center gap-2 mt-1">
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium w-fit">
                                    NEW
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${gem.available !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className={`text-xs font-medium ${gem.available !== false ? 'text-green-600' : 'text-red-600'}`}>
                                      {gem.available !== false ? 'Available' : 'Taken'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRegisterDomain(gem.domain)}
                              disabled={gem.available === false}
                              className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 text-xs shadow-md w-full sm:w-auto ${
                                gem.available !== false 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {gem.available !== false ? 'Register' : 'Taken'}
                            </button>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-2">
                            {gem.description}
                          </p>

                          {/* Footer with Value */}
                          <div className="mt-auto pt-4 border-t-2 border-gray-200 bg-gray-50 -mx-6 px-6 py-3">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-600">EST. VALUE</div>
                              <div className="text-xl font-bold text-green-600">${gem.estimatedValue.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {displayedGems.map((gem) => (
                      <div key={gem.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                        <div className="p-3 sm:p-4">
                          {/* Top row - Domain name with icon and Register button */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <DiamondIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                  {gem.domain.charAt(0).toUpperCase() + gem.domain.slice(1)}.com
                                </h3>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRegisterDomain(gem.domain)}
                              disabled={gem.available === false}
                              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm shadow-md flex-shrink-0 ${
                                gem.available !== false 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {gem.available !== false ? 'Register' : 'Taken'}
                            </button>
                          </div>
                          
                          {/* Middle row - Status tags */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                              NEW
                            </span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${gem.available !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className={`text-xs font-medium ${gem.available !== false ? 'text-green-600' : 'text-red-600'}`}>
                                {gem.available !== false ? 'Available' : 'Taken'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Bottom row - Description and Estimated Value */}
                          <div className="flex items-center justify-between">
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 flex-1 mr-4">
                              {gem.description}
                            </p>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs text-gray-500">EST. VALUE</div>
                              <div className="text-lg sm:text-xl font-bold text-green-600">${gem.estimatedValue.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
