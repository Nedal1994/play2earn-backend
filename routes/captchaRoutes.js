const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captchaController');

router.get('/audio/:level', captchaController.getAudioCaptchaByLevel);
router.get('/text/:level', captchaController.getTextCaptchaByLevel);
router.get('/image/:level', captchaController.getImageCaptchaByLevel);

module.exports = router;
