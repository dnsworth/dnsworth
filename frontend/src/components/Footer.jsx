import { useNavigate } from 'react-router-dom';

const Footer = ({ onBulkValuation, onNavigateToBulk, onNavigateHome }) => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  // Handle both prop names for backward compatibility
  const handleBulkValuation = onBulkValuation || onNavigateToBulk;
  
  const quickLinks = [
    { name: 'Home', action: () => navigate('/') },
    { name: 'Bulk Valuation', action: () => {
      if (handleBulkValuation) {
        handleBulkValuation();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate('/bulk-valuation'), 300);
      }
    }},
    { name: 'About Us', action: () => navigate('/about') },
    { name: 'Blog', action: () => navigate('/blog') },
    { name: 'FAQ', action: () => navigate('/faq') },
    { name: 'Features', action: () => {
      const whyChooseSection = document.getElementById('why-choose-section');
      if (whyChooseSection) {
        whyChooseSection.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { name: 'Support', action: () => navigate('/support') }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/dnsworth' },
    { name: 'Twitter', href: 'https://twitter.com/dnsworth' },
    { name: 'Telegram', href: 'https://t.me/dnsworth' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Column */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      const featuresSection = document.getElementById('features-section');
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <span className="text-gray-300">Pricing</span>
                </li>
                <li>
                  <span className="text-gray-300">API</span>
                </li>
                <li>
                  <span className="text-gray-300">Documentation</span>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate('/about')}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/blog')}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/faq')}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/support')}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Our Mission Column */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support Our Mission</h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                Help us continue providing world-class support and innovative solutions to our growing community.
              </p>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Support & Donate
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {currentYear} DNSWorth. All Rights Reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => navigate('/terms-of-service')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => navigate('/cookie-policy')}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

