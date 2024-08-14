// controllers/leaderboardController.js

const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
    try {
        // Find all users sorted by total_rewards in descending order
        const users = await User.find()
            .sort({ total_rewards: -1 })
            .select('username profile_pic_url total_rewards tasks_completed')
            .lean();

        // Add rank to each user dynamically
        const leaderboard = users.map((user, index) => ({
            rank: index + 1, // Assign rank based on position in sorted array
            username: user.username,
            profile_pic_url: user.profile_pic_url,
            total_rewards: user.total_rewards,
            tasks_completed: user.tasks_completed,
        }));

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leaderboard data' });
    }
};
