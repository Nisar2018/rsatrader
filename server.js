const express = require("express");
const app = express();
const apiRoutes = require("./apiRoutes");

app.use(express.json());

// All backend API routes
app.use("/api", apiRoutes);

// Serve frontend build
const path = require("path");
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

module.exports = app;
