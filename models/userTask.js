// models/userTask.js
const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserTask', userTaskSchema);