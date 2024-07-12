const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_pic_url: {
        type: String,
        default: null,
    },
    tasks_completed: {
        type: Number,
        default: 0,
    },
    total_rewards: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
