const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// MongoDB connection
mongoose.connect('mongodb+srv://sadhunitish:RKPnAJKCQMK2A6Vd@cluster0.ms0bxut.mongodb.net/captcha_database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Schema definitions
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

// Models
const AudioCaptcha = mongoose.model('AudioCaptcha', audioCaptchaSchema);
const TextCaptcha = mongoose.model('TextCaptcha', textCaptchaSchema);
const ImageCaptcha = mongoose.model('ImageCaptcha', imageCaptchaSchema);

// Routes
app.get('/api/captcha/audio/:level', async (req, res) => {
    const { level } = req.params;
    console.log(`Fetching audio captchas for level: ${level}`);
    try {
        const captchas = await AudioCaptcha.find({ level });
        console.log('Fetched audio captchas:', captchas);
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching audio captchas:', error);
        res.status(500).send('Error fetching audio captchas');
    }
});

app.get('/api/captcha/text/:level', async (req, res) => {
    const { level } = req.params;
    console.log(`Fetching text captchas for level: ${level}`);
    try {
        const captchas = await TextCaptcha.find({ level });
        console.log('Fetched text captchas:', captchas);
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching text captchas:', error);
        res.status(500).send('Error fetching text captchas');
    }
});

app.get('/api/captcha/image/:level', async (req, res) => {
    const { level } = req.params;
    console.log(`Fetching image captchas for level: ${level}`);
    try {
        const captchas = await ImageCaptcha.find({ level });
        console.log('Fetched image captchas:', captchas);
        res.json(captchas);
    } catch (error) {
        console.error('Error fetching image captchas:', error);
        res.status(500).send('Error fetching image captchas');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
