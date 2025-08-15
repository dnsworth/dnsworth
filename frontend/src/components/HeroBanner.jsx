import SearchBar from './SearchBar';

const HeroBanner = ({ onSearch, loading }) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Know Your Domain's True Worth — For Free
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Instant AI-powered valuations for your domains.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              onSearch={onSearch} 
              loading={loading}
              placeholder="Enter domain to value..."
            />
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Powered by HumbleWorth API</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroBanner;
