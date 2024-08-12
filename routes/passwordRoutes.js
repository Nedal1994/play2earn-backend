const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/requestUserPasswordReset', passwordController.requestUserPasswordReset);
router.post('/requestAdminPasswordReset', passwordController.requestAdminPasswordReset);
router.post('/resetUserPassword/:token', passwordController.resetUserPassword);
router.post('/resetAdminPassword/:token', passwordController.resetAdminPassword);

module.exports = router;
