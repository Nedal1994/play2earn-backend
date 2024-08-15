const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error in user route:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;