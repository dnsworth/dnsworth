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
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent px-8 py-6">
          <h2 className="text-3xl font-bold text-background mb-2">{domain}</h2>
          <p className="text-background/90 text-lg">Domain Valuation Results</p>
        </div>

        {/* Main Valuation */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gradient mb-4">
              {formatCurrency(valuation?.estimatedValue)}
            </div>
            <p className="text-text-muted text-xl">Estimated Market Value</p>
          </div>

          {/* Valuation Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface border border-gray-700 rounded-xl p-6 text-center hover:border-primary transition-all duration-300">
              <div className="text-2xl font-bold text-primary mb-3">
                {formatCurrency(valuation?.auctionValue)}
              </div>
              <p className="text-text-muted">Auction Value</p>
            </div>
            <div className="bg-surface border border-gray-700 rounded-xl p-6 text-center hover:border-secondary transition-all duration-300">
              <div className="text-2xl font-bold text-secondary mb-3">
                {formatCurrency(valuation?.marketplaceValue)}
              </div>
              <p className="text-text-muted">Marketplace Value</p>
            </div>
            <div className="bg-surface border border-gray-700 rounded-xl p-6 text-center hover:border-accent transition-all duration-300">
              <div className="text-2xl font-bold text-accent mb-3">
                {formatCurrency(valuation?.brokerageValue)}
              </div>
              <p className="text-text-muted">Brokerage Value</p>
            </div>
          </div>

          {/* Confidence & Details */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted text-lg">Confidence Level:</span>
              <span className="font-bold text-primary text-xl">{confidence || 'N/A'}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-lg">Last Updated:</span>
              <span className="font-bold text-secondary text-xl">{formatDate(lastUpdated)}</span>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Estimates are automatically generated using historical market data and are not formal appraisals or investment advice. Actual sale prices can differ significantly. No warranties are offered—see our Terms of Service for full details.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-surface border-t border-gray-700 px-8 py-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-secondary flex-1"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={onNewSearch}
            className="btn-primary flex-1"
          >
            Search Another Domain
          </button>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="px-8 py-6 bg-surface border-t border-gray-700">
            <h3 className="font-bold text-primary text-xl mb-4">Detailed Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-muted">
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
        <div className="bg-gradient-to-r from-secondary to-accent px-8 py-6">
          <h2 className="text-3xl font-bold text-background mb-2">Bulk Valuation Results</h2>
          <p className="text-background/90 text-lg">{domains?.length || 0} domains analyzed</p>
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
                  Estimated Value
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-accent uppercase tracking-wider">
                  Confidence
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
                    {formatCurrency(item.valuation?.estimatedValue)}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-secondary">
                    {item.confidence || 'N/A'}%
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
    <section className="py-16">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {results.isBulk ? renderBulkResults(results) : renderSingleResult(results)}
        </div>
      </div>
    </section>
  );
};

export default ValuationResults;
