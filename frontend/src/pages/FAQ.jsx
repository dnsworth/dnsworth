import React from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary-dark transition-colors duration-200"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About DNSWorth
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get answers to the most common questions about our free domain valuation service
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Try DNSWorth today and discover the true value of your domains
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors duration-200 text-lg"
              >
                Start Valuing Domains
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
