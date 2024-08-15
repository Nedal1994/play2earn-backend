const express = require('express');
const router = express.Router();
const AIContribution = require('../models/aicontribution');

// Get all AI contributions
router.get('/', async (req, res) => {
  try {
    const aiContributions = await AIContribution.find();
    res.json(aiContributions);
  } catch (err) {
    console.error('Error in fetching AI contributions:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new AI contribution record
router.post('/', async (req, res) => {
  const aiContribution = new AIContribution({
    taskCompleted: req.body.taskCompleted,
    aiModelImproved: req.body.aiModelImproved,
  });

  try {
    const newAIContribution = await aiContribution.save();
    res.status(201).json(newAIContribution);
  } catch (err) {
    console.error('Error in creating AI contribution:', err);
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
});

module.exports = router;