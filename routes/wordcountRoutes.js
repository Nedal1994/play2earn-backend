const express = require('express');
const router = express.Router();
const { getParagraphs, submitAnswer } = require('../controllers/wordcountController');

// Route to get paragraphs
router.get('/paragraphs', getParagraphs);

// Route to submit an answer
router.post('/submit-answer', submitAnswer);

module.exports = router;
