const express = require('express');
const router = express.Router();
const AIContribution = require('../models/aicontribution');

// Get all AI contributions
router.get('/', async (req, res) => {
  try {
    const aiContributions = await AIContribution.find();
    res.json(aiContributions);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
