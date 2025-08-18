import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { setupConsoleCleanup } from './utils/console-cleanup.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Setup console cleanup for development
setupConsoleCleanup();

// Inject Vercel Speed Insights for performance monitoring (only in production)
if (import.meta.env.PROD) {
  injectSpeedInsights();
}
