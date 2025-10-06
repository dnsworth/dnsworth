import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "How accurate are DNSWorth's domain valuations?",
      answer: "DNSWorth uses advanced AI technology that analyzes millions of domain sales, market trends, and industry data to provide professional-grade accuracy. Our valuations are based on real market data and comparable sales."
    },
    {
      question: "Is DNSWorth really free forever?",
      answer: "Yes! DNSWorth is 100% free with no hidden fees, no subscriptions, and no limits. We believe domain valuation should be accessible to everyone, so we've committed to keeping it free forever."
    },
    {
      question: "How many domains can I value at once?",
      answer: "Our bulk valuation tool allows you to value up to 100 domains simultaneously. Simply upload a CSV file or enter domains manually, and get instant results for your entire portfolio."
    },
    {
      question: "What data sources does DNSWorth use?",
      answer: "We analyze domain sales data from multiple sources including domain marketplaces, auction results, broker sales, and industry databases. Our AI continuously learns from new market data to improve accuracy."
    },
    {
      question: "How often should I revalue my domains?",
      answer: "We recommend revaluing your domains monthly or whenever there are significant market changes. Domain values can fluctuate based on market trends, industry developments, and economic factors."
    },
    {
      question: "Can I export my valuation results?",
      answer: "Yes! All valuation results can be exported as CSV files for further analysis, portfolio management, or sharing with stakeholders. This feature is included at no additional cost."
    },
    {
      question: "Does DNSWorth work for all domain extensions?",
      answer: "DNSWorth provides valuations for all major domain extensions including .com, .net, .org, .io, .co, and many others. Our AI is trained on data from all popular TLDs."
    },
    {
      question: "How fast are the results?",
      answer: "DNSWorth provides instant results in seconds, not minutes. Our optimized system and AI technology deliver professional-grade valuations faster than any other tool in the market."
    },
    {
      question: "Is my domain data secure?",
      answer: "Absolutely. We take security seriously and never store or share your domain information. All valuations are processed securely and your data remains completely private."
    },
    {
      question: "Can I use DNSWorth for business purposes?",
      answer: "Yes! DNSWorth is perfect for domain investors, businesses, brokers, and anyone who needs accurate domain valuations. Our results are suitable for business decisions, portfolio management, and client consultations."
    }
  ];

  const handleStartValuing = () => {
    onNavigateHome();
  };

  const handleBulkValuation = () => {
    onNavigateToBulk();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Frequently Asked Questions - DNSWorth Domain Valuation</title>
        <meta name="description" content="Get answers to the most common questions about DNSWorth's free domain valuation service. Learn how our AI-powered tool works and how to get accurate domain appraisals." />
        <meta name="keywords" content="DNSWorth FAQ, domain valuation questions, domain appraisal help, free domain tool FAQ, domain valuation guide" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/page/faq" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Frequently Asked Questions - DNSWorth Domain Valuation" />
        <meta property="og:description" content="Get answers to the most common questions about DNSWorth's free domain valuation service." />
        <meta property="og:url" content="https://dnsworth.com/page/faq" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/page/faq-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNSWorth FAQ - Domain Valuation Questions" />
        <meta name="twitter:description" content="Get answers to common questions about DNSWorth's free domain valuation service." />
        <meta name="twitter:image" content="https://dnsworth.com/page/faq-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does DNSWorth's domain valuation work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNSWorth uses advanced AI technology to analyze domain characteristics, market trends, and historical sales data to provide accurate valuations in seconds."
                }
              },
              {
                "@type": "Question",
                "name": "Is DNSWorth really free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, DNSWorth is 100% free forever. We believe everyone deserves access to professional-grade domain valuation tools."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate are the valuations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI-powered system provides market-based valuations that are comparable to professional appraisal services, using real market data and trends."
                }
              }
            ]
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
                "name": "FAQ",
                "item": "https://dnsworth.com/page/faq"
              }
            ]
          })}
        </script>
      </Helmet>
      <Header onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} onNavigateToGems={onNavigateToGems} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 md:mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-medium" style={{ color: '#ffffff' }}>
              Get answers to the most common questions about our free domain valuation service
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* FAQ List */}
            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 md:p-8">
                    <h3 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold mr-3 md:mr-4 flex-shrink-0">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-lg ml-6 md:ml-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 md:mt-20 text-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl md:rounded-3xl p-6 md:p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                    Ready to Get Started?
                  </h3>
                  <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
                    Try DNSWorth today and discover the true value of your domains with our AI-powered valuation technology
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleStartValuing}
                      className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 text-lg hover:scale-105 transform"
                    >
                      Start Valuing Domains
                    </button>
                    <button
                      onClick={handleBulkValuation}
                      className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-white hover:text-primary transition-all duration-200 text-lg hover:scale-105 transform"
                    >
                      Bulk Valuation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default FAQ;
