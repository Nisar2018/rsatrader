const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./config'); // Assuming connection function is in a separate file

const app = express();
//const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import API routes
const apiRoutes = require('./apiRoutes');



// Use API routes
app.use('/api', apiRoutes);

// IMPORTANT: Export the app instance for Vercel
module.exports = app;


