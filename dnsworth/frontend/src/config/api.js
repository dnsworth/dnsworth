// API configuration for frontend
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Client-Version': '2.0.0'
  }
};

// Production API configuration
if (import.meta.env.PROD) {
  // Use the correct backend URL that matches the actual deployment
  API_CONFIG.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dnsworth.onrender.com';
}

export default API_CONFIG;
