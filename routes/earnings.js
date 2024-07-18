const express = require('express');
const router = express.Router();
const Earnings = require('../models/earnings');

// Get all earnings
router.get('/', async (req, res) => {
  try {
    const earnings = await Earnings.find();
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new earnings record
router.post('/', async (req, res) => {
  const earnings = new Earnings({
    points: req.body.points,
    rewards: req.body.rewards,
    totalEarned: req.body.totalEarned,
  });

  try {
    const newEarnings = await earnings.save();
    res.status(201).json(newEarnings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
