console.log('Starting test server...');

import express from 'express';
console.log('Express imported');

const app = express();
const PORT = 8000;

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

console.log('About to start server...');

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
});

console.log('Server startup initiated');

