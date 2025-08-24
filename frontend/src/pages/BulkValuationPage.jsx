import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SearchTracker } from '../utils/searchTracker';
import { validateDomainList, sanitizeInput } from '../utils/security.js';
import API_CONFIG from '../config/api.js';

const BulkValuationPage = ({ onBack, onResults }) => {
  const [domains, setDomains] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('input');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!domains.trim()) {
      setError('Please enter at least one domain');
      return;
    }

    // Parse and validate domains
    const domainList = domains
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    // Validate domain list using security utility
    const validation = validateDomainList(domainList);
    if (!validation.valid) {
      setError(validation.error || 'Invalid domain list');
      return;
    }

    if (validation.totalValid === 0) {
      setError('No valid domains found. Please check your input.');
      return;
    }

    if (validation.totalInvalid > 0) {
      setError(`${validation.totalInvalid} invalid domains found and will be skipped.`);
    }

    setLoading(true);
    setResults(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const res = await fetch(`${API_CONFIG.baseURL}/api/bulk-value`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ 
          domains: validation.validDomains,
          totalDomains: validation.totalValid
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      }

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
        setActiveTab('results');
        // Scroll to results
        setTimeout(() => {
          document.getElementById('bulk-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout. Please try again.');
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message || 'Error fetching bulk valuations. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExampleDomains = () => {
    setDomains(`example.com
google.com
facebook.com
amazon.com
netflix.com
apple.com
microsoft.com
tesla.com
spacex.com
twitter.com`);
  };

  const handleNewSearch = () => {
    setResults(null);
    setError('');
    setDomains('');
    setActiveTab('input');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAll = () => {
    setResults(null);
    setDomains('');
    setError('');
    setActiveTab('input');
  };

  const handleDownloadCSV = () => {
    if (!results || !results.valuations) return;
    
    const csvContent = [
      ['Domain', 'Estimated Value', 'Auction Value', 'Marketplace Value', 'Brokerage Value'],
      ...results.valuations.map(item => [
        item.domain,
        formatCurrency(item.valuation?.estimatedValue),
        formatCurrency(item.valuation?.auctionValue),
        formatCurrency(item.valuation?.marketplaceValue),
        formatCurrency(item.valuation?.brokerageValue)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `domain-valuations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (value) => {
    if (!value || value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const domainCount = domains.split('\n').filter(d => d.trim().length > 0).length;
  const resultsCount = results?.valuations?.length || 0;
  const totalSearches = SearchTracker.getTotalSearches();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bulk Domain Valuation - DNSWorth Portfolio Analysis Tool</title>
        <meta name="description" content="Value hundreds of domains simultaneously with DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers. Free AI-powered portfolio analysis." />
        <meta name="keywords" content="bulk domain valuation, portfolio analysis, domain portfolio, multiple domain valuation, domain investor tools" />
        <meta name="author" content="DNSWorth" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/bulk-valuation" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bulk Domain Valuation - DNSWorth Portfolio Analysis Tool" />
        <meta property="og:description" content="Value hundreds of domains simultaneously with DNSWorth's bulk valuation tool. Perfect for serious investors and portfolio managers." />
        <meta property="og:url" content="https://dnsworth.com/bulk-valuation" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/bulk-valuation-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bulk Domain Valuation - DNSWorth" />
        <meta name="twitter:description" content="Value hundreds of domains simultaneously with DNSWorth's bulk valuation tool." />
        <meta name="twitter:image" content="https://dnsworth.com/bulk-valuation-twitter-image.jpg" />
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
                "name": "Bulk Valuation",
                "item": "https://dnsworth.com/bulk-valuation"
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Header */}
      <Header onBulkValuation={() => {}} onNavigateHome={onBack} />

      {/* Welcome Banner */}
      

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                Portfolio Valuation
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Evaluate up to 100 domains simultaneously with our AI-powered bulk valuation tool
              </p>
              <div className="mt-4 text-sm text-text-muted">
                Total searches performed: <span className="text-primary font-semibold">{totalSearches}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex bg-surface rounded-lg p-1 border border-gray-700">
                <button
                  onClick={() => setActiveTab('input')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'input'
                      ? 'bg-primary text-background shadow-lg'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  Input Domains
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 relative ${
                    activeTab === 'results'
                      ? 'bg-secondary text-background shadow-lg'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  Results
                  {resultsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {resultsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Input Domains Tab */}
            {activeTab === 'input' && (
              <div className="card p-8 mb-8">
                <form onSubmit={handleSubmit}>
                  {/* Domain Input */}
                  <div className="mb-8">
                    <label htmlFor="bulk-domains" className="block text-text font-bold text-xl mb-4">
                      Enter Domain Names (One per line) - Up to 100 domains
                    </label>
                    <textarea
                      id="bulk-domains"
                      name="domains"
                      value={domains}
                      onChange={(e) => setDomains(e.target.value)}
                      placeholder="Enter your domains here, one per line...
example.com
mydomain.org
company.net"
                      className="w-full h-80 px-6 py-4 text-lg border-2 border-gray-700 bg-surface text-text rounded-xl focus:border-primary focus:outline-none transition-all duration-300 placeholder-gray-500 resize-none"
                      disabled={loading}
                      maxLength={10000}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-text-muted">
                        {domainCount}/100 domains
                      </span>
                      <button
                        type="button"
                        onClick={handleExampleDomains}
                        className="text-primary hover:text-gold-light transition-colors font-medium"
                      >
                        Load Example Domains
                      </button>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading || domainCount === 0}
                      className="btn-primary flex-1 text-xl py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing {domainCount} Domains...</span>
                        </div>
                      ) : (
                        `Analyze ${domainCount} Domains`
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onBack}
                      className="btn-secondary flex-1 text-xl py-5"
                    >
                      Back to Home
                    </button>
                  </div>
                </form>


              </div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && results && (
              <div id="bulk-results" className="card overflow-hidden mb-8 animate-fade-in">
                {/* Results Header with Action Buttons */}
                <div className="bg-gradient-to-r from-secondary to-accent px-8 py-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-background mb-2">Valuation Results</h2>
                      <p className="text-background/90 text-lg">
                        Showing {resultsCount} domains, sorted by highest Brokerage value
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleDownloadCSV}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download CSV
                      </button>
                      <button
                        onClick={handleClearAll}
                        className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface border-b border-gray-700">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">Domain</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-secondary uppercase tracking-wider">Estimated Value</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-accent uppercase tracking-wider">Auction</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">Marketplace</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-secondary uppercase tracking-wider">Brokerage</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-gray-700">
                      {results.valuations?.map((item, index) => (
                        <tr key={index} className="hover:bg-surface transition-colors duration-200">
                          <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-text">
                            {item.domain}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-primary font-semibold">
                            {formatCurrency(item.valuation?.estimatedValue)}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-accent">
                            {formatCurrency(item.valuation?.auctionValue)}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-primary">
                            {formatCurrency(item.valuation?.marketplaceValue)}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-secondary">
                            {formatCurrency(item.valuation?.brokerageValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results Actions */}
                <div className="bg-surface border-t border-gray-700 px-8 py-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleNewSearch}
                      className="btn-primary flex-1"
                    >
                      Analyze More Domains
                    </button>
                    <button
                      onClick={onBack}
                      className="btn-secondary flex-1"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer onBulkValuation={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onNavigateHome={onBack} />
    </div>
  );
};

export default BulkValuationPage;
