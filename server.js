const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Define User schema and model if not already defined
const userSchema = new mongoose.Schema({
    rank: String,
    username: String,
    points: Number,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Leaderboard route
app.get('/leaderboard', async (req, res) => {
    try {
        const usersData = await User.find().sort({ points: -1 });
        usersData.forEach((user, index) => user.rank = (index + 1).toString());
        res.json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Include other routes from main branch
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

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/aicontributions', aiContributionRoutes);
app.use('/api/earnings', earningRoutes);
app.use('/api/social-accounts', socialAccountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/audio-transcription', audioTranscriptionRoutes);

// Server setup
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
