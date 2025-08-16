import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ValuationForm from '../components/ValuationForm';
import ValuationResults from '../components/ValuationResults';
import SectionFeatures from '../components/SectionFeatures';
import SectionWhyUs from '../components/SectionWhyUs';
import SectionBulkSearch from '../components/SectionBulkSearch';
import SectionCTA from '../components/SectionCTA';
import Footer from '../components/Footer';

const Home = () => {
  const [valuationResults, setValuationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleValuationResult = (data) => {
    setValuationResults(data);
    setLoading(false);
  };

  const handleNewSearch = () => {
    setValuationResults(null);
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBulkValuation = () => {
    navigate('/bulk-valuation');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {!valuationResults && (
        <>
          <ValuationForm 
            onResult={handleValuationResult}
            onLoading={setLoading}
          />
          <SectionFeatures />
          <SectionWhyUs />
          <SectionBulkSearch />
          <SectionCTA />
        </>
      )}

      {valuationResults && (
        <ValuationResults 
          results={valuationResults}
          onNewSearch={handleNewSearch}
          onBulkValuation={handleBulkValuation}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
