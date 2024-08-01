const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = 5000;

app.use(cors());  // Enable CORS
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    rank: String,
    username: String,
    points: Number,
});

const User = mongoose.model('User', userSchema);

app.get('/leaderboard', async (req, res) => {
    try {
        const usersData = await User.find().sort({ points: -1 });
        usersData.forEach((user, index) => user.rank = (index + 1).toString());
        res.json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
