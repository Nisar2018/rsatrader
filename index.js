// index.js (in the root directory)

const express = require("express");
const path = require("path"); // <-- Must be included
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// 1. API ROUTING: This must come BEFORE the static file serving
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Look for static assets in the correct build folder
// Use path.join to ensure correct relative path from Express function to build folder
app.use(express.static(path.join(__dirname, 'frontend', 'build'))); 

// 3. CATCH-ALL ROUTE: For every request that wasn't an API call or a static file, 
// serve the main index.html file. This is crucial for React Router.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app;