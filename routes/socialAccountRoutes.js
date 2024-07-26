// routes/socialAccounts.js
const express = require('express');
const router = express.Router();
const socialAccountController = require('../controllers/socialAccountController');

router.get('/', socialAccountController.getAllSocialAccounts);
router.post('/link', socialAccountController.linkSocialAccount);
router.post('/unlink', socialAccountController.unlinkSocialAccount);

module.exports = router;
