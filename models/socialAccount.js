// models/socialAccount.js
const mongoose = require('mongoose');

const socialAccountSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    linked_status: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('SocialAccount', socialAccountSchema);