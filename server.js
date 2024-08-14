const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');





const captchaRoutes = require('./routes/captchaRoutes');  // Import CAPTCHA routes

const server = express();

// Middleware
server.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.26:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
server.use(bodyParser.json());



// CAPTCHA MongoDB Connection
const captchaConnection = mongoose.createConnection('mongodb+srv://sadhunitish:RKPnAJKCQMK2A6Vd@cluster0.ms0bxut.mongodb.net/captcha_database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

captchaConnection.on('connected', () => {
    // Successfully connected to CAPTCHA MongoDB
});

captchaConnection.on('error', (err) => {
    // Handle the error without logging
});


server.use('/api/captcha', captchaRoutes); // Add CAPTCHA routes

// Error Handling Middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 Middleware
server.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the captchaConnection for use in models
module.exports = { captchaConnection };

