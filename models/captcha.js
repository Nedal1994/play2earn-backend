const mongoose = require('mongoose');

// CAPTCHA MongoDB Connection (temporary, just for testing)
const captchaConnection = mongoose.createConnection('mongodb+srv://sadhunitish:RKPnAJKCQMK2A6Vd@cluster0.ms0bxut.mongodb.net/captcha_database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

captchaConnection.on('connected', () => {
    // Successfully connected to CAPTCHA MongoDB
});

captchaConnection.on('error', (err) => {
    // Handle the error silently or implement custom error handling here
});


// Define your schemas
const audioCaptchaSchema = new mongoose.Schema({
    level: String,
    answer: String,
    url: String
}, { collection: 'captcha_audio' });

const textCaptchaSchema = new mongoose.Schema({
    level: String,
    answer: String,
    url: String
}, { collection: 'captcha_text' });

const imageCaptchaSchema = new mongoose.Schema({
    level: String,
    question: String,
    options: Array
}, { collection: 'captcha_images' });

// Use the connection to create models
const AudioCaptcha = captchaConnection.model('AudioCaptcha', audioCaptchaSchema);
const TextCaptcha = captchaConnection.model('TextCaptcha', textCaptchaSchema);
const ImageCaptcha = captchaConnection.model('ImageCaptcha', imageCaptchaSchema);

module.exports = {
    AudioCaptcha,
    TextCaptcha,
    ImageCaptcha
};
