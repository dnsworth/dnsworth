import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AffiliateDisclosure = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Affiliate Disclosure - DNSWorth</title>
        <meta name="description" content="Transparency about our affiliate relationships at DNSWorth." />
      </Helmet>
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} onNavigateToGems={onNavigateToGems} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Affiliate Disclosure
            </h1>
            <p className="text-xl text-gray-600 font-semibold">
              Transparency About Our Affiliate Relationships
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Commission Earnings:</span> We earn fees when you register domains through our links
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">No Extra Cost:</span> You pay nothing additional
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Trust First:</span> We only recommend services we genuinely use and trust
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Unbiased:</span> Affiliate relationships never influence our domain valuations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynadot Affiliate Program */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Dynadot Affiliate Program
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                <p className="text-gray-700 mb-3">
                  <strong>DNSWorth participates in the Dynadot affiliate program.</strong> When you register domains 
                  through our Dynadot links, we earn a commission at no extra cost to you.
                </p>
                <p className="text-gray-700">
                  We choose to work with Dynadot because they offer competitive domain registration prices, 
                  excellent customer service, and reliable domain management tools that we trust and use ourselves.
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Commitment to You
              </h3>
              <p className="text-gray-700 mb-4">
                DNSWorth participates in the <strong>Dynadot affiliate program</strong> and other domain registrar affiliate programs. 
                This means that when you click on certain links on our website and make a purchase, 
                we may receive a commission at no additional cost to you.
              </p>
              <p className="text-gray-700 mb-4">
                We only recommend services and products that we genuinely believe provide value to 
                domain investors and entrepreneurs. Our affiliate relationships do not influence our 
                domain valuations or the editorial content on this site.
              </p>
              <p className="text-gray-700">
                Our primary goal is to help you find the perfect domain and make informed decisions 
                about your domain investments. Any affiliate earnings help us maintain and improve 
                our free domain valuation tools.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Questions?
              </h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our affiliate relationships or how we maintain 
                transparency, please don't hesitate to reach out.
              </p>
              <a 
                href="mailto:info@dnsworth.com" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Contact Us: info@dnsworth.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} onNavigateToGems={onNavigateToGems} />
    </div>
  );
};

export default AffiliateDisclosure;
