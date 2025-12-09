// index.js (in the root directory)

const express = require("express");
const path = require("path"); 
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// Define the static directory using path.resolve. This is generally safer
// for finding files relative to the project root on Vercel.
const staticPath = path.resolve('frontend', 'build'); 

// 1. API ROUTING: This must come BEFORE the catch-all
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Tell Express to serve files from the build directory
// This handles requests like /static/js/main.js
app.use(express.static(staticPath)); 

// 3. CATCH-ALL ROUTE: For every request that wasn't an API call or a static file, 
// serve the main index.html file.
app.get('*', (req, res) => {
    // Send the index.html from the resolved static path location
    res.sendFile(path.join(staticPath, 'index.html'));
});

module.exports = app;