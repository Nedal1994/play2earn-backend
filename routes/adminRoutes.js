const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get Admin Profile
router.get('/profile/:id', adminController.getAdminProfile);

// Update Admin Profile
router.put('/profile/:id', adminController.updateAdminProfile);

// Request Password Reset
router.post('/request-password-reset', adminController.requestPasswordReset);

// Reset Password
router.post('/reset-password/:token', adminController.resetPassword);

module.exports = router;
