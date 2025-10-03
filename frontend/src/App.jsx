import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import BulkValuationPage from './pages/BulkValuationPage';
import DomainGems from './pages/DomainGems';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import FAQ from './pages/FAQ';
import Support from './pages/Support';

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
        <Route path="/about" element={<AboutUs onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/blog" element={<Blog onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/blog/:slug" element={<BlogPost onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/terms-of-service" element={<TermsOfService onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/cookie-policy" element={<CookiePolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} onNavigateToGems={navigateToGems} />} />
        <Route path="/faq" element={<FAQ onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/support" element={<Support onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
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
