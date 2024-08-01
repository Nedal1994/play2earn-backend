// controllers/earningsController.js
const Earnings = require('../models/earning');

// Get all earnings
exports.getAllEarnings = async (req, res) => {
    try {
        const earnings = await Earnings.find();
        res.json(earnings);
    } catch (err) {
        console.error('Error in earnings controller:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
