// Utility functions for formatting data

/**
 * Format currency amount to USD format
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount || amount === 0) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to readable format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format domain name with proper casing
 * @param {string} domain - The domain to format
 * @returns {string} Formatted domain string
 */
export const formatDomain = (domain) => {
  if (!domain) return '';
  
  return domain.toLowerCase().trim();
};

/**
 * Format confidence percentage
 * @param {number} confidence - Confidence value (0-100)
 * @returns {string} Formatted confidence string
 */
export const formatConfidence = (confidence) => {
  if (!confidence || confidence === 0) return 'N/A';
  
  return `${Math.round(confidence)}%`;
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatLargeNumber = (num) => {
  if (!num || num === 0) return '0';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  
  return num.toString();
};
