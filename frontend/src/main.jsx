import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { injectSpeedInsights } from '@vercel/speed-insights'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Inject Vercel Speed Insights for performance monitoring
injectSpeedInsights()
