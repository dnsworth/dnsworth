import ValuationForm from './ValuationForm';

const HeroSection = ({ onResult, loading }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Pure Black Background - Original Design */}
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 container-custom text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight animate-fade-in">
            <span className="text-gradient">Instant Domain Valuations</span>
            <br />
            <span className="text-text">100% Free Forever</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Discover your domain's <span className="text-primary font-semibold">true market value</span> in seconds with our advanced AI technology.
          </p>

          {/* Search Form */}
          <div className="mb-8 sm:mb-12">
            <ValuationForm onResult={onResult} />
          </div>

          {/* Descriptive Text List - Restored from Original Design */}
          <div className="mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-text mb-1">AI-Powered Accuracy</h3>
                  <p className="text-sm text-text-muted">Advanced machine learning algorithms provide market-accurate valuations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-text mb-1">Instant Results</h3>
                  <p className="text-sm text-text-muted">Get professional-grade appraisals in under 3 seconds</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-text mb-1">Market-Based Pricing</h3>
                  <p className="text-sm text-text-muted">Real-time data from active domain sales and auctions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-text mb-1">Professional Grade</h3>
                  <p className="text-sm text-text-muted">Industry-standard valuation methods used by domain brokers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-text-muted text-xs sm:text-sm px-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="font-medium">Market-Based</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="font-medium">Professional Grade</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-medium">100% Free Forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
