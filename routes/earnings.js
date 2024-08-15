const express = require('express');
const router = express.Router();
const Earnings = require('../models/earnings');

router.get('/', async (req, res) => {
  try {
    const earnings = await Earnings.find();
    res.json(earnings);
  } catch (err) {
    console.error('Error in earnings route:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;