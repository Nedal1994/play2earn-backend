const express = require('express');
const router = express.Router();
const audioTranscriptionController = require('../controllers/audioTranscriptionController');
const multer = require('multer');

// Use Multer with memory storage to handle any file upload without specifying a key
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for creating a new audio transcription task
// Using `upload.any()` to accept any file without specifying the field name
router.post('/create', upload.any(), audioTranscriptionController.createAudioTranscriptionTask);

// Route for fetching a specific transcription task
router.get('/task/:id', audioTranscriptionController.getAudioTranscriptionTask);

// Route for fetching all transcription tasks
router.get('/', audioTranscriptionController.getAllAudioTranscriptionTasks);

// Route for submitting a transcription
router.post('/:id/submit', audioTranscriptionController.submitTranscription);

// Route for deleting a specific transcription task
router.delete('/:id', audioTranscriptionController.deleteAudioTranscription);

// Route for bulk deletion of transcription tasks
router.post('/bulk-delete', audioTranscriptionController.bulkDeleteAudioTranscriptions);

// Route for streaming audio files stored in GridFS
router.get('/audio/:filename', audioTranscriptionController.streamAudio);

// Route for adding transcription, difficulty level, and points to an existing audio file
router.post('/add-details', audioTranscriptionController.addDetailsToAudio);





module.exports = router;
