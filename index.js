// index.js (in root directory) - PURE API HANDLER

const express = require("express");
// const path = require("path"); // REMOVE: Path module is no longer needed
const app = express();
const apiRoutes = require("./apiRoutes");

app.use(express.json());

// API ROUTING ONLY
app.use("/api", apiRoutes); 

// REMOVE: express.static and app.get('*') catch-all

module.exports = app;