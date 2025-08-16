import React from 'react';
import { Link } from 'react-router-dom';

const SectionCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            Ready to Discover Your Domain's True Value?
          </h2>
          
          <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of domain investors, business owners, and developers who trust DNSWorth for accurate, instant valuations.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Valuing Now
            </Link>
            <Link
              to="/bulk-valuation"
              className="btn-secondary text-lg px-8 py-4"
            >
              Bulk Portfolio Analysis
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text mb-1">100% Accurate</h3>
              <p className="text-sm text-text-muted">AI-powered precision</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text mb-1">Lightning Fast</h3>
              <p className="text-sm text-text-muted">Results in seconds</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-text mb-1">Always Free</h3>
              <p className="text-sm text-text-muted">No hidden costs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
