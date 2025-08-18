import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BulkValuationPage from './pages/BulkValuationPage';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/FAQ';
import Support from './pages/Support';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToBulk = () => {
    navigate('/bulk-valuation');
    // Ensure we scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToHome = () => {
    navigate('/');
    // Ensure we scroll to top when navigating to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home onNavigateToBulk={navigateToBulk} />} />
        <Route path="/bulk-valuation" element={<BulkValuationPage onBack={navigateToHome} />} />
        <Route path="/about" element={<AboutUs onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/blog" element={<Blog onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/blog/:slug" element={<BlogPost onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/terms-of-service" element={<TermsOfService onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/cookie-policy" element={<CookiePolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/faq" element={<FAQ onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/support" element={<Support onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
