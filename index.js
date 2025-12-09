// index.js (in the root directory)

const express = require("express");
const path = require("path"); 
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// Set the path to the root of the current deployment context.
// This assumes Vercel has moved the contents of 'frontend/build' here.
const staticRootPath = path.resolve(); 

// 1. API ROUTING: This must come BEFORE the static file serving
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Tell Express to serve files from the current directory's root
// This handles requests like /static/js/main.js
app.use(express.static(staticRootPath)); 

// 3. CATCH-ALL ROUTE: For every request that wasn't an API call or a static file, 
// serve the main index.html file from the root directory.
app.get('*', (req, res) => {
    // We assume index.html is also in the root of the deployment folder
    res.sendFile(path.join(staticRootPath, 'index.html'));
});

module.exports = app;