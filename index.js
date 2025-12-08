// index.js (in the root directory)
const express = require("express");
const path = require("path"); // 1. ADD: Import the path module
const app = express();
const apiRoutes = require("./apiRoutes");

// If you need CORS/Body Parser (optional, depending on your setup)
// app.use(cors()); 
app.use(express.json());

// --- FRONTEND ROUTING ---

// 2. ADD: Serve static files (JS, CSS, images) from the React build folder
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// --- API ROUTING ---
app.use("/api", apiRoutes);

// --- CATCH-ALL ROUTE ---

// 3. ADD: Catch-all route to serve the React app for all non-API requests
// This must be the LAST route defined.
app.get('*', (req, res) => {
  // Check if the request is not for a known file type (like /static/...)
  // and send index.html if it's a client-side route (e.g., /dashboard, /login).
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});


module.exports = app;