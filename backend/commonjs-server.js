const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 8000;

// Basic middleware
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', env: process.env.NODE_ENV });
});

// Contact form test route (without email for now)
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
      success: true, 
      message: 'Contact form received (email disabled for testing)',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CommonJS server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`ZOHO_APP_PASSWORD: ${process.env.ZOHO_APP_PASSWORD ? 'SET' : 'NOT SET'}`);
});

