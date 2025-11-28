const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // <-- THIS IS THE MISSING LINE
const { connectToDatabase } = require('./config'); // Assuming connection function is in a separate file

const app = express();
//const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 1. Serve Static Files from the frontend/build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Import API routes
const apiRoutes = require('./apiRoutes');

// Use API routes
app.use('/api', apiRoutes);

// 2. Catch-all: Serve the React index.html for all other routes
// This MUST be the LAST route defined. It ensures client-side routing works.
// If the request isn't for /api, Express sends the React app.
app.get('*', (req, res) => { // <-- ADD THIS CATCH-ALL BLOCK
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// IMPORTANT: Export the app instance for Vercel
module.exports = app;


