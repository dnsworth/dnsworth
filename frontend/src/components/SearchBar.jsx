import { useState } from 'react';

const SearchBar = ({ onSearch, loading = false, placeholder = "Enter domain to value..." }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim() && !loading) {
      onSearch(domain.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="domain-search" className="sr-only">
            Domain to value
          </label>
          <input
            id="domain-search"
            name="domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors duration-200 placeholder-gray-400"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !domain.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
