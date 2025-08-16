import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Beautiful Gradient Background instead of missing image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20"></div>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/20"></div>
      
      {/* Radial Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
          Instant Domain
          <span className="text-gradient block">Valuations</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
          Get professional-grade domain appraisals powered by AI technology. 
          <span className="text-primary font-semibold"> 100% Free Forever</span> - 
          no hidden costs, no premium tiers.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="btn-primary text-lg px-8 py-4"
          >
            Value Your Domain
          </Link>
          <Link
            to="/bulk-valuation"
            className="btn-secondary text-lg px-8 py-4"
          >
            Bulk Valuation
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-1">Lightning Fast</h3>
            <p className="text-sm text-text-muted">Results in under 3 seconds</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-1">AI-Powered</h3>
            <p className="text-sm text-text-muted">Advanced algorithms for accuracy</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-1">Always Free</h3>
            <p className="text-sm text-text-muted">No subscriptions or hidden fees</p>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-accent/10 rounded-full blur-lg"></div>
    </section>
  );
};

export default HeroSection;
