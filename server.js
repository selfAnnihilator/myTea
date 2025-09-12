// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Import and use the news API route
const newsHandler = require('./api/news');

// Create a wrapper for the Vercel function
app.get('/api/news', async (req, res) => {
  // Mock VercelRequest and VercelResponse objects
  const mockRequest = {
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body
  };
  
  // Create a mock response object that mimics VercelResponse
  const mockResponse = {
    statusCode: 200,
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      res.status(this.statusCode).json(data);
    }
  };
  
  try {
    await newsHandler.default(mockRequest, mockResponse);
  } catch (error) {
    console.error('Error in news API handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve static files from the React app build (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint available at http://localhost:${PORT}/api/news`);
});