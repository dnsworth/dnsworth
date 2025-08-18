import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ValuationResults from '../components/ValuationResults';
import SectionFeatures from '../components/SectionFeatures';
import SectionWhyUs from '../components/SectionWhyUs';
import SectionBulkSearch from '../components/SectionBulkSearch';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { SearchTracker } from '../utils/searchTracker';

const Home = ({ onNavigateToBulk }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    // Initialize search count from localStorage
    setSearchCount(SearchTracker.getSearchCount());
  }, []);

  const handleValuationResult = (data) => {
    setResults(data);
    setError('');
    // Update search count display
    setSearchCount(SearchTracker.getSearchCount());
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBulkValuation = () => {
    // Scroll to top first, then navigate to bulk valuation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onNavigateToBulk();
    }, 300);
  };

  const handleNewSearch = () => {
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>DNSWorth - Free Domain Valuation Tool | AI-Powered Domain Appraisal</title>
        <meta name="description" content="Get instant, accurate domain valuations for free with DNSWorth's AI-powered tool. Professional-grade domain appraisal technology available 100% free forever. Value single domains or bulk portfolios instantly." />
        <meta name="keywords" content="domain valuation, domain appraisal, domain worth, free domain valuation, AI domain tool, domain pricing, domain market value, bulk domain valuation" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DNSWorth - Free Domain Valuation Tool | AI-Powered Domain Appraisal" />
        <meta property="og:description" content="Get instant, accurate domain valuations for free with DNSWorth's AI-powered tool. Professional-grade domain appraisal technology available 100% free forever." />
        <meta property="og:url" content="https://dnsworth.com/" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNSWorth - Free Domain Valuation Tool" />
        <meta name="twitter:description" content="Get instant, accurate domain valuations for free with DNSWorth's AI-powered tool." />
        <meta name="twitter:image" content="https://dnsworth.com/twitter-image.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DNSWorth",
            "url": "https://dnsworth.com",
            "description": "Free AI-powered domain valuation tool for instant domain appraisals",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://dnsworth.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth",
              "url": "https://dnsworth.com"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DNSWorth",
            "url": "https://dnsworth.com",
            "logo": "https://dnsworth.com/logo.png",
            "description": "AI-powered domain valuation platform providing free, instant domain appraisals",
            "sameAs": [
              "https://instagram.com/dnsworth",
              "https://twitter.com/dnsworth",
              "https://t.me/dnsworth"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "support@dnsworth.com"
            }
          })}
        </script>
      </Helmet>
      <Header onBulkValuation={handleBulkValuation} onNavigateHome={handleNewSearch} />
      <HeroSection
        onResult={handleValuationResult}
        loading={loading}
      />

      {results && (
        <div id="results">
          <ValuationResults
            results={results}
            onNewSearch={handleNewSearch}
            loading={loading}
          />
        </div>
      )}
      {error && (
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
                <div className="text-red-400 text-lg font-semibold mb-2">
                  Oops! Something went wrong
                </div>
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleNewSearch}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <SectionFeatures />
      <SectionWhyUs />
      <SectionBulkSearch onBulkValuation={handleBulkValuation} />
      <FAQSection />
      <Footer onBulkValuation={handleBulkValuation} onNavigateHome={handleNewSearch} />
    </div>
  );
};

export default Home;
