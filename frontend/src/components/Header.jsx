import SearchBar from './SearchBar';

const Header = ({ onBulkValuation, onNavigateToBulk, onNavigateHome }) => {
  // Handle both prop names for backward compatibility
  const handleBulkValuation = onBulkValuation || onNavigateToBulk;
  
  console.log('Header component rendered with props:', {
    onBulkValuation,
    onNavigateToBulk,
    onNavigateHome,
    handleBulkValuation
  });
  
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
              console.log('=== BULK VALUATION BUTTON CLICKED ===');
              console.log('Button clicked in Header component');
              console.log('Available props:', { onBulkValuation, onNavigateToBulk, onNavigateHome });
              console.log('handleBulkValuation function:', handleBulkValuation);
              console.log('Type of handleBulkValuation:', typeof handleBulkValuation);
              
              if (typeof handleBulkValuation === 'function') {
                console.log('Calling handleBulkValuation function...');
                try {
                  handleBulkValuation();
                  console.log('handleBulkValuation function called successfully');
                } catch (error) {
                  console.error('Error calling handleBulkValuation:', error);
                }
              } else {
                console.error('❌ handleBulkValuation is NOT a function!');
                console.error('Available functions:', {
                  onBulkValuation: typeof onBulkValuation,
                  onNavigateToBulk: typeof onNavigateToBulk
                });
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
