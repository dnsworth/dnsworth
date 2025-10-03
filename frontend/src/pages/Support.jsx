import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Support = ({ onNavigateToBulk, onNavigateHome }) => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBulkValuation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onNavigateToBulk();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Premium Support - DNSWorth Expert Customer Service</title>
        <meta name="description" content="Get premium support from DNSWorth's expert team. Professional domain valuation assistance, technical support, and personalized guidance available 24/7." />
        <meta name="keywords" content="DNSWorth support, domain valuation help, customer service, technical support, contact DNSWorth, domain tool assistance" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/support" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Support - DNSWorth Expert Customer Service" />
        <meta property="og:description" content="Get premium support from DNSWorth's expert team for personalized domain valuation assistance." />
        <meta property="og:url" content="https://dnsworth.com/support" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/support-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNSWorth Premium Support - Expert Service" />
        <meta name="twitter:description" content="Get premium support from DNSWorth's expert team." />
        <meta name="twitter:image" content="https://dnsworth.com/support-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "DNSWorth Premium Support",
            "description": "Get premium support from DNSWorth's expert team",
            "url": "https://dnsworth.com/support",
            "mainEntity": {
              "@type": "Organization",
              "name": "DNSWorth",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@dnsworth.com",
                "availableLanguage": "English"
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dnsworth.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Support",
                "item": "https://dnsworth.com/support"
              }
            ]
          })}
        </script>
      </Helmet>
      <Header onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
      
      {/* Hero Section - Made Full Height */}
      <section className="flex-1 flex items-center justify-center py-32 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-surface border border-primary/20 rounded-full mb-8 md:mb-12">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 md:mr-3 animate-pulse"></div>
              <span className="text-text font-medium text-sm md:text-base">Premium Support Available 24/7</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-text mb-8 md:mb-12 leading-tight">
              Expert Support
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                When You Need It
              </span>
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-text-muted leading-relaxed max-w-4xl mx-auto mb-12 md:mb-16">
              Access our world-class domain valuation experts for personalized guidance, technical support, and comprehensive assistance with all your domain needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <a 
                href="mailto:info@dnsworth.com"
                className="group bg-gradient-to-r from-primary to-secondary hover:from-gold-light hover:to-orange-light text-background font-bold px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-primary/25 flex items-center gap-2 md:gap-3 text-sm md:text-lg"
              >
                <svg className="w-5 h-5 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Our Experts
              </a>
              
              <button 
                onClick={() => window.location.href = '/faq'}
                className="group bg-surface hover:bg-gray-800 text-text font-semibold px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 border border-primary/20 hover:border-primary/40 flex items-center gap-2 md:gap-3 text-sm md:text-lg"
              >
                <svg className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Browse Knowledge Base
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default Support;
