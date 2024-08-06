const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    rewards: {
        type: String,
        required: true,
    },
    total_earned: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Earnings', earningsSchema);