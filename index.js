// index.js (in root directory)
const express = require("express");
// const path = require("path"); // REMOVE/ENSURE THIS IS GONE
const app = express();
const apiRoutes = require("./apiRoutes");

app.use(express.json());

// REMOVE: app.use(express.static(...));
// REMOVE: app.get('*', (...));

// API ROUTING ONLY
app.use("/api", apiRoutes); 

module.exports = app;