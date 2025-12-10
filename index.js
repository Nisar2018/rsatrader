// index.js (in root directory) - HYBRID SERVER with Ultimate Path Fix

const express = require("express");
const path = require("path"); 
const app = express();
const apiRoutes = require("./apiRoutes"); 

app.use(express.json());

// *******************************************************************
// FINAL PATH FIX: Use process.cwd() to anchor the path safely
// *******************************************************************
// This is the correct build path relative to the project root
const buildPath = path.join(process.cwd(), 'frontend', 'build'); 

// 1. API ROUTING
app.use("/api", apiRoutes); 

// 2. STATIC FILE SERVING: Serve files from the correctly anchored path
app.use(express.static(buildPath)); 

// 3. CATCH-ALL ROUTE: Serve the index.html from the same path
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;