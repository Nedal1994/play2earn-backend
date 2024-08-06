const express = require('express');
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

const connectDB = require('./config/db');

const bodyParser = require('body-parser');

dotenv.config();

const server = express();

// Middleware
server.use(bodyParser.json());

// Connect to MongoDB
connectDB();

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

// Server setup
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
