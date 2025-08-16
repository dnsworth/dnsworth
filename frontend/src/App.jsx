import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BulkValuationPage from './pages/BulkValuationPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToBulk = () => {
    navigate('/bulk-valuation');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home onNavigateToBulk={navigateToBulk} />} />
        <Route path="/bulk-valuation" element={<BulkValuationPage onBack={navigateToHome} />} />
        <Route path="/about" element={<AboutUs onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/terms-of-service" element={<TermsOfService onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
        <Route path="/cookie-policy" element={<CookiePolicy onNavigateToBulk={navigateToBulk} onNavigateHome={navigateToHome} />} />
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
