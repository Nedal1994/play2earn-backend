const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    username: String,
    points: Number,
});

const User = mongoose.model('User', userSchema);

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Define initial user data
        const usersData = [
            { username: 'josephschroeder', points: 1500000 },
            { username: 'dpark', points: 700000 },
            { username: 'alexjohns', points: 300000 },
            { username: 'jennifer06', points: 120000 },
            { username: 'amandawright', points: 80000 },
            { username: 'tina19', points: 60000 },
            { username: 'sean78', points: 11000 },
            { username: 'michaelwilliams', points: 8000 },
            { username: 'johndoe', points: 7700 },
            { username: 'christina74', points: 5200 },
            { username: 'jackjack', points: 1800 },
            { username: 'garrett32', points: 700 },
            { username: 'jessicaw5', points: 600 },
            { username: 'kendall777', points: 500 },
            { username: 'tyrike12', points: 400 },
            { username: 'corinnevv', points: 300 },
            { username: 'dylanr', points: 180 },
            { username: 'izzy44', points: 40 },
            { username: 'justinbrand', points: 12 },
            { username: 'chris44', points: 5200 },
            { username: 'james2', points: 1800 },
            { username: 'garbear', points: 700 },
            { username: 'heidiw', points: 600 },
            { username: 'joelll', points: 500 },
            { username: 'david11', points: 400 },
            { username: 'reese', points: 300 },
            { username: 'laura89', points: 180 },
            { username: 'hannahgal', points: 40 },
            { username: 'gina54', points: 12 },
            { username: 'gillian89', points: 12 },
        ];

        // Insert the initial data
        await User.insertMany(usersData);
        console.log('Initial data seeded');

        // Close the connection
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
