import SearchBar from './SearchBar';

const Header = ({ onBulkValuation, onNavigateHome }) => {
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

        {/* Bulk Valuation Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              console.log('Bulk valuation button clicked');
              console.log('onBulkValuation function:', onBulkValuation);
              if (typeof onBulkValuation === 'function') {
                onBulkValuation();
              } else {
                console.error('onBulkValuation is not a function:', onBulkValuation);
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
