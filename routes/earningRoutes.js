// routes/earnings.js
const express = require('express');
const router = express.Router();
const earningController = require('../controllers/earningController');

// Get all earnings
router.get('/', earningController.getAllEarnings);

module.exports = router;
