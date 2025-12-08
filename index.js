const express = require("express");
const app = express();
const apiRoutes = require("./apiRoutes"); // apiRoutes.js is in the same directory

app.use(express.json());

app.use("/api", apiRoutes); // All API requests start with /api/...

module.exports = app; // Correctly exports the Express app