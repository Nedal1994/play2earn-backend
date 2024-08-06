// routes/audioTranscriptionRoutes.js
const express = require('express');
const router = express.Router();
const audioTranscriptionController = require('../controllers/audioTranscriptionController');

router.post('/create', audioTranscriptionController.createAudioTranscriptionTask);
router.get('/task', audioTranscriptionController.getAudioTranscriptionTask);
router.get('/', audioTranscriptionController.getAllAudioTranscriptionTasks);
router.post('/:id/submit', audioTranscriptionController.submitTranscription);
router.delete('/:id', audioTranscriptionController.deleteAudioTranscription);
router.post('/bulk-delete', audioTranscriptionController.bulkDeleteAudioTranscriptions);

module.exports = router;
