const mongoose = require('mongoose');

const audioTranscriptionSchema = new mongoose.Schema({
    file_id: {  // This stores the GridFS file ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    filename: {
        type: String,  // Optionally store the filename as well
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

module.exports = mongoose.models.AudioTranscription || mongoose.model('audioTranscription', audioTranscriptionSchema);
