const AIContribution = require('../models/aiContribution');

// Get all AI contributions
exports.getAllContributions = async (req, res) => {
    try {
        const aiContributions = await AIContribution.find();
        res.json(aiContributions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new AI contribution record
exports.createContribution = async (req, res) => {
    const { username, task_completed, ai_model_improved } = req.body;

    const aiContribution = new AIContribution({
        username,
        task_completed,
        ai_model_improved,
    });

    try {
        const newAIContribution = await aiContribution.save();
        res.status(201).json(newAIContribution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};