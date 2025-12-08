// index.js (in the root directory) - Should only handle API calls
const express = require("express");
const app = express();
const apiRoutes = require("./apiRoutes");

app.use(express.json());
app.use("/api", apiRoutes); // Only handles /api/...

module.exports = app;