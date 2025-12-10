// index.js (in root directory) - HYBRID SERVER

const express = require("express");
const path = require("path"); 
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// 1. API ROUTING: This must come BEFORE the static file serving
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Look for static assets in the correct build folder
// This is the most reliable path structure relative to the project root
app.use(express.static(path.join(__dirname, 'frontend', 'build'))); 

// 3. CATCH-ALL ROUTE: Serve the main index.html file for all client-side routes (e.g., /login, /dashboard)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app;