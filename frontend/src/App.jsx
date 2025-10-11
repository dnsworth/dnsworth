import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import BulkValuationPage from './pages/BulkValuationPage';
import DomainGems from './pages/DomainGems';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import APIOverview from './pages/APIOverview';
import ExpiredDomains from './pages/ExpiredDomains';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

  const navigateToBulk = () => {
    navigate('/bulk-valuation');
  };

  const navigateToGems = () => {
    navigate('/domain-gems');
  };

  const navigateToHome = () => {
    setShouldScrollToTop(true);
    navigate('/');
  };

  // Reset scroll flag when location changes
  useEffect(() => {
    if (shouldScrollToTop && location.pathname === '/') {
      setShouldScrollToTop(false);
    }
  }, [location.pathname, shouldScrollToTop]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home onNavigateToBulk={navigateToBulk} onNavigateToGems={navigateToGems} shouldScrollToTop={shouldScrollToTop} />} />
        <Route path="/bulk-valuation" element={<BulkValuationPage onBack={navigateToHome} />} />
        <Route path="/domain-gems" element={<DomainGems onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/about" element={<AboutUs onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/legal/privacy-policy" element={<PrivacyPolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/legal/terms-of-service" element={<TermsOfService onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/legal/cookie-policy" element={<CookiePolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/legal/affiliate-disclosure" element={<AffiliateDisclosure onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/faq" element={<FAQ onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/contact" element={<Support onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/api" element={<APIOverview onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/page/expired-domains" element={<ExpiredDomains onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        {/* Redirect blog routes to home page since blog feature was removed */}
        <Route path="/blog" element={<Home onNavigateToBulk={navigateToBulk} onNavigateToGems={navigateToGems} shouldScrollToTop={true} />} />
        <Route path="/page/blog" element={<Home onNavigateToBulk={navigateToBulk} onNavigateToGems={navigateToGems} shouldScrollToTop={true} />} />
        {/* Catch-all route for any undefined pages */}
        <Route path="*" element={<Home onNavigateToBulk={navigateToBulk} onNavigateToGems={navigateToGems} shouldScrollToTop={true} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
