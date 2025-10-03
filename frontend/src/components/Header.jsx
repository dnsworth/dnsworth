import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-regular-svg-icons';

const Header = ({ onBulkValuation, onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  // Handle both prop names for backward compatibility
  const handleBulkValuation = onBulkValuation || onNavigateToBulk;
  
  // Header component rendered successfully
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-800 shadow-2xl shadow-primary/10">
      <div className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-6 lg:px-8">
        {/* Logo - Mobile optimized sizing */}
        <div className="flex-shrink-0">
          <button
            onClick={onNavigateHome}
            className="mobile-logo-size sm:text-2xl lg:text-3xl font-bold text-gradient hover:scale-105 transition-transform duration-200 cursor-pointer sm:px-0 sm:py-0"
          >
            DNSWorth
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex gap-2 sm:gap-3">
          {/* Domain Gems Button */}
          <button
            onClick={() => {
              if (typeof onNavigateToGems === 'function') {
                try {
                  onNavigateToGems();
                } catch (error) {
                  // Handle error silently in production
                }
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 transform shadow-lg"
          >
            <span className="hidden sm:flex items-center gap-2">
              <FontAwesomeIcon icon={faGem} className="w-4 h-4" />
              Domain Gems
            </span>
            <span className="sm:hidden flex items-center gap-1">
              <FontAwesomeIcon icon={faGem} className="w-3 h-3" />
              Gems
            </span>
          </button>

          {/* Bulk Valuation Button */}
          <button
            onClick={() => {
              if (typeof handleBulkValuation === 'function') {
                try {
                  handleBulkValuation();
                } catch (error) {
                  // Handle error silently in production
                }
              }
            }}
            className="btn-accent-mobile sm:btn-accent animate-glow text-sm sm:text-base px-3 py-2 sm:px-6 sm:py-3"
          >
            <span className="hidden sm:inline">Bulk Valuation</span>
            <span className="sm:hidden">Bulk</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
