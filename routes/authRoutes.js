const express = require('express');
const {
    registerUser,
    registerAdmin,
    loginUser,
    loginAdmin,
    requestUserPasswordReset,
    resetUserPassword,
    requestAdminPasswordReset,
    resetAdminPassword
} = require('../controllers/authController');

const router = express.Router();

router.post('/register/user', registerUser);
router.post('/register/admin', registerAdmin);
router.post('/login/user', loginUser);
router.post('/login/admin', loginAdmin);
router.post('/request-password-reset/user', requestUserPasswordReset);
router.post('/reset-password/user/:token', resetUserPassword);
router.post('/request-password-reset/admin', requestAdminPasswordReset);
router.post('/reset-password/admin/:token', resetAdminPassword);

module.exports = router;
