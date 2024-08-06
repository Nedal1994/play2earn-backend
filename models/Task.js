const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['game', 'participating'],
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    difficulty_level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    points: {
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
