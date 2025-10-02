import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Setup console cleanup for development
import { setupConsoleCleanup } from './utils/console-cleanup.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

setupConsoleCleanup();
