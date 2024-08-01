// models/audioTranscription.js
const mongoose = require('mongoose');

const audioTranscriptionSchema = new mongoose.Schema({
    audio_url: {
        type: String,
        unique: true,
        required: true
    },
    transcription: {
        type: String,
        default: ''
    },
    difficulty_level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    points: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.AudioTranscription || mongoose.model('AudioTranscription', audioTranscriptionSchema);
