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

          {/* Simple Trust Indicators - Right under input field as requested */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-text-muted text-xs sm:text-sm px-2 mb-8">
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
