const express = require('express');
// const { getAdminProfile, updateAdminProfile, requestPasswordReset, resetPassword } = require('../controllers/adminController');
const { getAdminProfile, updateAdminProfile } = require('../controllers/adminController');

const router = express.Router();

router.get('/profile/:id', getAdminProfile);
router.put('/profile/:id', updateAdminProfile);
// router.post('/reset-password', requestPasswordReset);
// router.post('/reset/:token', resetPassword);

module.exports = router;

