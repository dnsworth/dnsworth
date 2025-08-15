import SearchBar from './SearchBar';

const Header = ({ onBulkValuation, onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-800 shadow-2xl shadow-primary/10">
      <div className="flex items-center justify-between py-4 px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={onNavigateHome}
            className="text-3xl font-bold text-gradient hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            DNSWorth
          </button>
        </div>

        {/* Bulk Valuation Button */}
        <div className="flex-shrink-0">
          <button
            onClick={onBulkValuation}
            className="btn-accent animate-glow"
          >
            Bulk Valuation
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
