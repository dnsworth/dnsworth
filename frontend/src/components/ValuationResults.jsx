import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

const ValuationResults = ({ results, onNewSearch, onBulkValuation }) => {
  const [showTooltip, setShowTooltip] = useState({
    auction: false,
    marketplace: false,
    brokerage: false
  });

  if (!results || !results.valuation) {
    return null;
  }

  const { domain, valuation } = results;
  const { estimatedValue, auctionValue, marketplaceValue, brokerageValue } = valuation;

  const tooltipInfo = {
    auction: {
      title: "Auction Estimation",
      description: "Estimated value if sold via a well-publicized domain auction with competitive bidding. Assumes a large buyer pool and active promotion.",
      icon: "🏆"
    },
    marketplace: {
      title: "Marketplace Estimation", 
      description: "Estimated value when sold through domain marketplaces like Sedo, Afternic, or similar platforms. Based on comparable sales and market demand.",
      icon: "🏪"
    },
    brokerage: {
      title: "Brokered Sale Estimation",
      description: "Estimated value when sold through professional domain brokers. Includes personalized marketing, negotiation, and premium buyer targeting.",
      icon: "💰"
    }
  };

  const toggleTooltip = (type) => {
    setShowTooltip(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Results Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Domain Valuation Results
        </h2>
        <p className="text-lg text-gray-600">
          Professional estimates for <span className="font-semibold text-primary">{domain}</span>
        </p>
      </div>

      {/* Valuation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Auction Estimation Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tooltipInfo.auction.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">
                {tooltipInfo.auction.title}
              </h3>
            </div>
            <button
              onMouseEnter={() => toggleTooltip('auction')}
              onMouseLeave={() => toggleTooltip('auction')}
              className="relative"
            >
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-xs text-gray-600 font-bold">i</span>
              </div>
              {showTooltip.auction && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                  <p>{tooltipInfo.auction.description}</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </button>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(auctionValue)}
            </div>
            <div className="text-sm text-gray-500">
              Estimated auction value
            </div>
          </div>
        </div>

        {/* Marketplace Estimation Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tooltipInfo.marketplace.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">
                {tooltipInfo.marketplace.title}
              </h3>
            </div>
            <button
              onMouseEnter={() => toggleTooltip('marketplace')}
              onMouseLeave={() => toggleTooltip('marketplace')}
              className="relative"
            >
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-xs text-gray-600 font-bold">i</span>
              </div>
              {showTooltip.marketplace && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                  <p>{tooltipInfo.marketplace.description}</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </button>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(marketplaceValue)}
            </div>
            <div className="text-sm text-gray-500">
              Estimated marketplace value
            </div>
          </div>
        </div>

        {/* Brokered Sale Estimation Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tooltipInfo.brokerage.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">
                {tooltipInfo.brokerage.title}
              </h3>
            </div>
            <button
              onMouseEnter={() => toggleTooltip('brokerage')}
              onMouseLeave={() => toggleTooltip('brokerage')}
              className="relative"
            >
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-xs text-gray-600 font-bold">i</span>
              </div>
              {showTooltip.brokerage && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                  <p>{tooltipInfo.brokerage.description}</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </button>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(brokerageValue)}
            </div>
            <div className="text-sm text-gray-500">
              Estimated brokered value
            </div>
          </div>
        </div>
      </div>

      {/* Overall Estimated Value */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Overall Estimated Value
        </h3>
        <div className="text-4xl font-bold text-primary mb-2">
          {formatCurrency(estimatedValue)}
        </div>
        <p className="text-gray-600">
          Based on comprehensive market analysis and AI-powered algorithms
        </p>
      </div>

      {/* Affiliate Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-1">
              Interested in {domain}?
            </h3>
            <p className="text-green-100">
              Check availability or make an offer with our affiliate partner
            </p>
          </div>
          <a
            href="https://godaddy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Search on GoDaddy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onNewSearch}
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
        >
          Value Another Domain
        </button>
        <button
          onClick={onBulkValuation}
          className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-200"
        >
          Bulk Valuation
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>
          * These are estimated values based on market analysis and AI algorithms. 
          Actual sale prices may vary based on market conditions, buyer interest, and negotiation.
        </p>
      </div>
    </div>
  );
};

export default ValuationResults;
