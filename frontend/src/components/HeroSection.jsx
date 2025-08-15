import ValuationForm from './ValuationForm';

const HeroSection = ({ onResult, loading }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Background Image with Fade Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mountain-background.jpg')`,
        }}
      />

      {/* Lighter Dark Overlay for Better Image Visibility */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Subtle Gradient Overlay - Reduced Opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-background/10"></div>

      {/* Radial Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_60%)]"></div>

      <div className="relative z-10 container-custom text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            <span className="text-gradient">Instant Domain Valuations</span>
            <br />
            <span className="text-text">100% Free Forever</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover your domain's <span className="text-primary font-semibold">true market value</span> in seconds with our advanced AI technology.
          </p>

          {/* Search Form */}
          <div className="mb-12">
            <ValuationForm onResult={onResult} />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-text-muted text-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="font-medium">Market-Based</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="font-medium">Professional Grade</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-medium">100% Free Forever</span>
            </div>
          </div>


        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
