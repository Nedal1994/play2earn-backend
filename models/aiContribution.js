const mongoose = require('mongoose');

const aiContributionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    task_completed: {
        type: Number,
        required: true
    },
    ai_model_improved: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('AIContribution', aiContributionSchema);