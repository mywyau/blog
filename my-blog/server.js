const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 6060;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'http://your-api-server-url', // Replace with your actual API server URL
  changeOrigin: true,
}));

// Handle all other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
