import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = ({ onNavigateToBulk, onNavigateHome }) => {
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
    // Scroll to top first, then navigate to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onNavigateHome();
    }, 300);
  };

  const handleBulkValuation = () => {
    // Scroll to top first, then navigate to bulk valuation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onNavigateToBulk();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBulkValuation={handleBulkValuation} onNavigateHome={onNavigateHome} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Get answers to the most common questions about our free domain valuation service
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* FAQ List */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg ml-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold mb-6">
                    Ready to Get Started?
                  </h3>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
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
