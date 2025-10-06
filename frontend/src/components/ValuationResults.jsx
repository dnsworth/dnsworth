import { useState } from 'react';

const ValuationResults = ({ results, onNewSearch, loading }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!results) return null;

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderSingleResult = (data) => {
    const { domain, valuation, confidence, lastUpdated } = data;
    
    return (
      <div className="card overflow-hidden animate-fade-in">
        {/* Affiliate Content */}
        <div className="bg-green-50 border border-green-200 rounded-t-lg px-2 md:px-6 py-2 md:py-4 flex items-center justify-between gap-1 md:gap-4">
          <p className="text-green-800 text-xs md:text-sm font-medium flex-1 leading-tight">
            Interested in <strong className="font-bold">{domain}</strong>? Check availability or make an offer with our trusted partner.
          </p>
          <a 
            href="https://www.tkqlhce.com/click-101518597-12527405" 
            target="_top" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-lg font-medium transition-colors duration-200 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
          >
            Dynadot.com
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent px-3 md:px-8 py-3 md:py-6">
          <h2 className="text-xl md:text-3xl font-bold text-background mb-1 md:mb-2">{domain}</h2>
          <p className="text-background/90 text-sm md:text-lg">Domain Valuation Results</p>
        </div>

          {/* Valuation Breakdown */}
          <div className="p-3 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
            <div className="bg-surface border border-gray-700 rounded-lg md:rounded-xl p-3 md:p-6 text-center hover:border-primary transition-all duration-300">
              <div className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-3">
                {formatCurrency(valuation?.auctionValue)}
              </div>
              <p className="text-text-muted text-xs md:text-base">Auction Value</p>
            </div>
            <div className="bg-surface border border-gray-700 rounded-lg md:rounded-xl p-3 md:p-6 text-center hover:border-secondary transition-all duration-300">
              <div className="text-sm md:text-2xl font-bold text-secondary mb-1 md:mb-3">
                {formatCurrency(valuation?.marketplaceValue)}
              </div>
              <p className="text-text-muted text-xs md:text-base">Marketplace Value</p>
            </div>
            <div className="bg-surface border border-gray-700 rounded-lg md:rounded-xl p-3 md:p-6 text-center hover:border-accent transition-all duration-300">
              <div className="text-sm md:text-2xl font-bold text-accent mb-1 md:mb-3">
                {formatCurrency(valuation?.brokerageValue)}
              </div>
              <p className="text-text-muted text-xs md:text-base">Brokerage Value</p>
            </div>
          </div>

          {/* Confidence & Details */}
          <div className="border-t border-gray-700 pt-4 md:pt-6">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm md:text-lg">Confidence Level:</span>
              <span className="font-bold text-primary text-base md:text-xl">{confidence || 'N/A'}%</span>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-700 pt-4 md:pt-6 mt-4 md:mt-6">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Estimates are automatically generated using historical market data and are not formal appraisals or investment advice. Actual sale prices can differ significantly. No warranties are offered—see our Terms of Service for full details.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-surface border-t border-gray-700 px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-secondary flex-1 text-sm md:text-base py-3 md:py-4"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={onNewSearch}
            className="btn-primary flex-1 text-sm md:text-base py-3 md:py-4"
          >
            Search Another Domain
          </button>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="px-4 md:px-8 py-4 md:py-6 bg-surface border-t border-gray-700">
            <h3 className="font-bold text-primary text-lg md:text-xl mb-3 md:mb-4">Detailed Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-text-muted text-sm md:text-base">
              <p><strong className="text-text">Domain Length:</strong> {domain.length} characters</p>
              <p><strong className="text-text">TLD:</strong> {domain.split('.').pop()}</p>
              <p><strong className="text-text">Primary Market:</strong> {valuation?.auctionValue > valuation?.marketplaceValue ? 'Auction' : 'Marketplace'}</p>
              <p><strong className="text-text">Value Range:</strong> {formatCurrency(Math.min(valuation?.auctionValue || 0, valuation?.marketplaceValue || 0))} - {formatCurrency(Math.max(valuation?.auctionValue || 0, valuation?.marketplaceValue || 0))}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBulkResults = (data) => {
    const { domains, valuations } = data;
    
    return (
      <div className="card overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-accent px-4 md:px-8 py-4 md:py-6">
          <h2 className="text-xl md:text-3xl font-bold text-background mb-1 md:mb-2">Bulk Valuation Results</h2>
          <p className="text-background/90 text-sm md:text-lg">{domains?.length || 0} domains analyzed</p>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-gray-700">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-secondary uppercase tracking-wider">
                  Auction
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-accent uppercase tracking-wider">
                  Marketplace
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Brokerage
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-gray-700">
              {valuations?.map((item, index) => (
                <tr key={index} className="hover:bg-surface transition-colors duration-200">
                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-text">
                    {item.domain}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-primary font-semibold">
                    {formatCurrency(item.valuation?.auctionValue)}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-secondary font-semibold">
                    {formatCurrency(item.valuation?.marketplaceValue)}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-accent font-semibold">
                    {formatCurrency(item.valuation?.brokerageValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal Disclaimer */}
        <div className="px-8 py-4 bg-surface border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Estimates are automatically generated using historical market data and are not formal appraisals or investment advice. Actual sale prices can differ significantly. No warranties are offered—see our Terms of Service for full details.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-surface border-t border-gray-700 px-8 py-6">
          <button
            onClick={onNewSearch}
            className="btn-primary w-full"
          >
            Search More Domains
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="pb-2 -mt-2">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {results.isBulk ? renderBulkResults(results) : renderSingleResult(results)}
        </div>
      </div>
    </section>
  );
};

export default ValuationResults;
