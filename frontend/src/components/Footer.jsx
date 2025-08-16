import { useNavigate } from 'react-router-dom';

const Footer = ({ onBulkValuation, onNavigateHome }) => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  const quickLinks = [
    { name: 'Home', action: () => navigate('/') },
    { name: 'Bulk Valuation', action: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/bulk-valuation'), 300);
    }},
    { name: 'Features', action: () => {
      const whyChooseSection = document.getElementById('why-choose-section');
      if (whyChooseSection) {
        whyChooseSection.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { name: 'Support', action: () => window.open('mailto:support@dnsworth.com', '_blank') }
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                DNSWorth
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              A highly accurate and dependable domain valuation solution, driven by advanced AI. Instantly appraise single domains or evaluate entire portfolios within seconds.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 text-gray-400 hover:text-primary transition-all duration-200 hover:scale-110"
                    title={social.name}
                  >
                    {social.name === 'Instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social.name === 'Twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                    {social.name === 'Telegram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={link.action}
                      className="text-gray-300 hover:text-primary transition-colors duration-200 text-left w-full"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Project Features</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>AI-Powered Valuations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Bulk Portfolio Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>100% Free Forever</span>
                </div>
              </div>
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

