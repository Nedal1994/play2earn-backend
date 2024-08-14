const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

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
<<<<<<< HEAD
server.use(bodyParser.json());
server.use(cors()); // Enable CORS for all origins
=======
server.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  credentials: true, // Allow credentials like cookies to be sent
}));
server.use(bodyParser.json()); // Parse JSON bodies
>>>>>>> 118607403fdc49fa8b0dbec5d9f9c0d036f3d7ff

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
<<<<<<< HEAD
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
=======
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB', err);
});
>>>>>>> 118607403fdc49fa8b0dbec5d9f9c0d036f3d7ff

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

