require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const earningsRoutes = require('./routes/earnings');
const aiContributionRoutes = require('./routes/aicontribution');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/earnings', earningsRoutes);
app.use('/api/aicontributions', aiContributionRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
