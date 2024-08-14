const { AudioCaptcha, TextCaptcha, ImageCaptcha } = require('../models/captcha');

exports.getAudioCaptchaByLevel = async (req, res) => {
    const { level } = req.params;
    try {
        const captchas = await AudioCaptcha.find({ level });
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching audio captchas:', error);
        res.status(500).send('Error fetching audio captchas');
    }
};

exports.getTextCaptchaByLevel = async (req, res) => {
    const { level } = req.params;
    try {
        const captchas = await TextCaptcha.find({ level });
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching text captchas:', error);
        res.status(500).send('Error fetching text captchas');
    }
};

exports.getImageCaptchaByLevel = async (req, res) => {
    const { level } = req.params;
    try {
        const captchas = await ImageCaptcha.find({ level });
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching image captchas:', error);
        res.status(500).send('Error fetching image captchas');
    }
};
