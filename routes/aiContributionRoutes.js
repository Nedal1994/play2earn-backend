const express = require('express');
const router = express.Router();
const aiContributionController = require('../controllers/aiContributionController');

// Get all AI contributions
router.get('/', aiContributionController.getAllContributions);
// Create a new AI contribution record
router.post('/create', aiContributionController.createContribution);

module.exports = router;
