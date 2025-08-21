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

  const supportOptions = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get direct support from our team',
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3 hover:rotate-0 transition-all duration-300">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      action: () => window.open('mailto:info@dnsworth.com', '_blank'),
      buttonText: 'info@dnsworth.com',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
    },
    {
      id: 'faq',
      title: 'FAQ Section',
      description: 'Find quick answers to common questions',
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-3 hover:rotate-0 transition-all duration-300">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      action: () => window.location.href = '/faq',
      buttonText: 'View FAQ',
      buttonStyle: 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
    },
    {
      id: 'response',
      title: 'Response Time',
      description: 'We typically respond within 24 hours',
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-6 hover:rotate-0 transition-all duration-300">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      action: null,
      buttonText: 'Fast Support',
      buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-600 cursor-default'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Get Support - DNSWorth Customer Service & Contact</title>
        <meta name="description" content="Get premium support from DNSWorth's expert team. Contact us for personalized assistance with domain valuation, technical support, or any questions about our free domain tool." />
        <meta name="keywords" content="DNSWorth support, domain valuation help, customer service, technical support, contact DNSWorth, domain tool assistance" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/support" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Get Support - DNSWorth Customer Service & Contact" />
        <meta property="og:description" content="Get premium support from DNSWorth's expert team for personalized assistance with domain valuation." />
        <meta property="og:url" content="https://dnsworth.com/support" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/support-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNSWorth Support - Customer Service" />
        <meta name="twitter:description" content="Get premium support from DNSWorth's expert team." />
        <meta name="twitter:image" content="https://dnsworth.com/support-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "DNSWorth Support",
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
      </Helmet>
      <Header onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Get Premium Support
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're here to help! Contact our expert support team for personalized assistance, feedback, or any questions you need answered.
            </p>
          </div>
        </div>
      </section>

      {/* Support Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            
            {/* Contact Information & Map Section */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 mb-20 relative overflow-hidden">
              {/* Form Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-secondary to-accent rounded-full translate-y-24 -translate-x-24"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Get in touch with our support team for personalized assistance
                  </p>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Contact Info */}
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                        <p className="text-gray-600 mb-3">Get direct support from our expert team</p>
                        <a 
                          href="mailto:info@dnsworth.com" 
                          className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200"
                        >
                          info@dnsworth.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Response Time</h3>
                        <p className="text-gray-600 mb-3">We typically respond within 24 hours</p>
                        <span className="text-green-600 font-semibold">Fast & Reliable</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Office Location</h3>
                        <p className="text-gray-600 mb-3">Our headquarters</p>
                        <span className="text-orange-600 font-semibold">San Francisco, CA</span>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="bg-gray-100 rounded-2xl p-6 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-4">San Francisco, California</p>
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                            <p className="text-sm text-gray-600">Map placeholder</p>
                            <p className="text-xs text-gray-500">Location: San Francisco, CA</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportOptions.map((option) => (
                <div key={option.id} className="group">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {option.icon}
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200">
                      {option.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {option.description}
                    </p>
                    
                    {option.action ? (
                      <button
                        onClick={option.action}
                        className={`${option.buttonStyle} text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                      >
                        {option.buttonText}
                      </button>
                    ) : (
                      <span className={`${option.buttonStyle} text-white font-bold px-8 py-4 rounded-2xl inline-block shadow-lg`}>
                        {option.buttonText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default Support;
