import { useState, useEffect } from 'react';
import { SearchTracker } from '../utils/searchTracker';
import { validateDomain, sanitizeInput } from '../utils/security.js';
import { getSecureDonationLink } from '../config/security.js';
import API_CONFIG from '../config/api.js';
import DonationModal from './DonationModal';

export default function ValuationForm({ onResult }) {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Get total searches count
  const totalSearches = SearchTracker.getTotalSearches();

  // Check if donation modal should be shown after search completion
  useEffect(() => {
    if (totalSearches >= 3 && SearchTracker.shouldShowDonationPrompt('search')) {
      setShowDonationModal(true);
    }
  }, [totalSearches]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Sanitize and validate input
    const cleanDomain = sanitizeInput(domain);
    if (!cleanDomain) {
      setError('Please enter a valid domain name');
      return;
    }

    if (!validateDomain(cleanDomain)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }

    // Check rate limiting
    if (SearchTracker.isRateLimited()) {
      setError('Too many requests. Please wait a moment before trying again.');
      return;
    }

    setLoading(true);

    try {
      // Record the search
      SearchTracker.recordSearch(cleanDomain);

      const res = await fetch(`${API_CONFIG.baseURL}/api/value`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Client-Version': '2.0.0'
        },
        body: JSON.stringify({ domain: cleanDomain }),
        signal: AbortSignal.timeout(API_CONFIG.timeout)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        onResult(data);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout. Please try again.');
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Error fetching valuation. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const secureDonationLink = getSecureDonationLink();

  const handleDonate = () => {
    window.open(secureDonationLink, '_blank', 'noopener,noreferrer');
    SearchTracker.markDonationPromptShown('search');
  };

  const handleCloseDonationModal = () => {
    setShowDonationModal(false);
    SearchTracker.markDonationPromptShown('search');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain to value..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl border-2 border-gray-700 bg-surface text-text rounded-xl focus:border-primary focus:outline-none transition-all duration-300 placeholder-gray-500 shadow-lg"
            disabled={loading}
            maxLength={253}
            title="Please enter a valid domain name (e.g., example.com)"
          />
        </div>
        <button
          type="submit"
          className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px] sm:min-w-[160px]"
          disabled={loading || !domain.trim()}
        >
          {loading ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            'Check Value'
          )}
        </button>
      </form>

      {/* Search Statistics */}
      <div className="text-center mb-4">
        <p className="text-xs sm:text-sm text-text-muted">
          Total searches performed: <span className="text-primary font-semibold">{totalSearches}</span>
        </p>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={handleCloseDonationModal}
        onDonate={handleDonate}
      />

      {error && (
        <div className="w-full text-center mt-4">
          <p className="text-red-400 text-xs sm:text-sm bg-red-900/20 px-3 sm:px-4 py-2 rounded-lg border border-red-800">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
