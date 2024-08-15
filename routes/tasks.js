// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/game', async (req, res) => {
  try {
    const tasks = await Task.find({ type: 'game' });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/participating', async (req, res) => {
  try {
    const tasks = await Task.find({ type: 'participating' });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;