// index.js (in the root directory)

const express = require("express");
const path = require("path"); // <-- ADD: Node.js path module is crucial here
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// 1. API ROUTING: This must come BEFORE the catch-all
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Look for static assets in the build folder
app.use(express.static(path.join(__dirname, 'frontend', 'build'))); 

// 3. CATCH-ALL ROUTE: For every request that wasn't an API call or a static file, 
// serve the main React application entry point (index.html).
// This is critical for client-side routing (e.g., /dashboard, /login).
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app;