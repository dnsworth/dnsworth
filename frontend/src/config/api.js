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
  // Use environment variable or fallback to production backend
  API_CONFIG.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dnsworth.onrender.com';
}

// Debug logging to see what URL is being used
console.log('🔧 API_CONFIG.baseURL:', API_CONFIG.baseURL);
console.log('🔧 import.meta.env.PROD:', import.meta.env.PROD);
console.log('🔧 import.meta.env.VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('🔧 Using backend URL:', API_CONFIG.baseURL);

export default API_CONFIG;
