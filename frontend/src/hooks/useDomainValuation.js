import { useState, useCallback, useEffect } from 'react';
import { domainValuation, handleApiError, warmUpApi } from '../utils/api';

export const useDomainValuation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isWarmedUp, setIsWarmedUp] = useState(false);

  // Warm up the API when the hook is initialized
  useEffect(() => {
    const initializeApi = async () => {
      try {
        console.log('🔥 Warming up API connection...');
        const success = await warmUpApi();
        setIsWarmedUp(success);
        if (success) {
          console.log('✅ API connection ready');
        } else {
          console.log('⚠️  API warmup failed, will retry on first request');
        }
      } catch (error) {
        console.log('⚠️  API warmup error:', error.message);
      }
    };

    initializeApi();
  }, []);

  // Single domain search
  const searchDomain = useCallback(async (domain) => {
    if (!domain || domain.trim().length === 0) {
      setError('Please enter a valid domain name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await domainValuation.getSingle(domain);
      setResults(data);
      
      // Add to search history
      setSearchHistory(prev => [
        { domain, timestamp: new Date(), results: data },
        ...prev.slice(0, 9) // Keep last 10 searches
      ]);
      
      return data;
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      setResults(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Bulk domain search
  const searchBulkDomains = useCallback(async (domains) => {
    if (!domains || domains.length === 0) {
      setError('Please enter at least one domain name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await domainValuation.getBulk(domains);
      setResults(data);
      
      // Add to search history
      setSearchHistory(prev => [
        { 
          domains: domains, 
          timestamp: new Date(), 
          results: data,
          isBulk: true 
        },
        ...prev.slice(0, 9)
      ]);
      
      return data;
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      setResults(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear results and error
  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  // Clear search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  // Get recent searches
  const getRecentSearches = useCallback(() => {
    return searchHistory.slice(0, 5);
  }, [searchHistory]);

  // Manual warm-up function
  const manualWarmUp = useCallback(async () => {
    try {
      setLoading(true);
      const success = await warmUpApi();
      setIsWarmedUp(success);
      return success;
    } catch (error) {
      console.error('Manual warmup failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    results,
    searchHistory,
    isWarmedUp,
    
    // Actions
    searchDomain,
    searchBulkDomains,
    clearResults,
    clearHistory,
    getRecentSearches,
    manualWarmUp,
  };
};
