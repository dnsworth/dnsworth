import ValuationForm from './ValuationForm';

const HeroSection = ({ onResult, loading }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Pure Black Background - Original Design */}
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 container-custom text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading - Mobile optimized */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight animate-fade-in">
            <span className="text-gradient">Instant Domain Valuations</span>
            <br />
            <span className="text-text">100% Free Forever</span>
          </h1>

          {/* Subheading - Mobile optimized */}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-muted mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 font-normal">
            Discover your domain's <span className="text-primary font-semibold">true market value</span> in seconds with our advanced AI technology.
          </h2>

          {/* Search Form */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <ValuationForm onResult={onResult} />
          </div>

          {/* Simple Trust Indicators - Mobile optimized spacing */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-text-muted text-xs sm:text-sm px-2 -mb-2">
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
