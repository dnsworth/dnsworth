import { useState, useEffect } from 'react';
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
