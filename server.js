const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const aiContributionRoutes = require('./routes/aiContributionRoutes');
const earningRoutes = require('./routes/earningRoutes');
const socialAccountRoutes = require('./routes/socialAccountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const audioTranscriptionRoutes = require('./routes/audioTranscriptionRoutes');
const wordcountRoutes = require('./routes/wordcountRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

dotenv.config();

const server = express();

// Middleware
server.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.26:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
    credentials: true, // Allow credentials like cookies to be sent
}));
server.use(bodyParser.json()); // Parse JSON bodies

// Routes
server.use('/api/auth', authRoutes);
server.use('/api/tasks', taskRoutes);
server.use('/api/admin', adminRoutes);
server.use('/api/users', userRoutes);
server.use('/api/surveys', surveyRoutes);
server.use('/api/aicontributions', aiContributionRoutes);
server.use('/api/earnings', earningRoutes);
server.use('/api/social-accounts', socialAccountRoutes);
server.use('/api/transactions', transactionRoutes);
server.use('/api/recommendations', recommendationRoutes);
server.use('/api/audio-transcription', audioTranscriptionRoutes);
server.use('/api/wordcount', wordcountRoutes);
server.use('/api/leaderboard', leaderboardRoutes);
server.use('/api/password', passwordRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

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
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
