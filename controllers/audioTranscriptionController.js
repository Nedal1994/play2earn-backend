// controllers/audioTranscriptionController.js
const AudioTranscription = require('../models/audioTranscription');

exports.createAudioTranscriptionTask = async (req, res) => {
    const { audio_url, transcription, difficulty_level, points } = req.body;

    try {
        // Check if an audio transcription task with the same audio_url already exists
        const existingTask = await AudioTranscription.findOne({ audio_url });
        if (existingTask) {
            return res.status(400).json({ error: 'A transcription task for this audio already exists.' });
        }

        const newTask = new AudioTranscription({ audio_url, transcription, difficulty_level, points });
        await newTask.save();
        res.status(201).json({ message: 'Audio transcription task created successfully', task: newTask });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAudioTranscriptionTasks = async (req, res) => {
    try {
        const tasks = await AudioTranscription.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAudioTranscriptionTask = async (req, res) => {
    try {
        // Fetch a random audio transcription task from the database
        const task = await AudioTranscription.aggregate([{ $sample: { size: 1 } }]);

        if (!task.length) {
            return res.status(404).json({ message: 'No audio transcription tasks available' });
        }

        res.status(200).json(task[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitTranscription = async (req, res) => {
    const { id } = req.params;
    const { transcription } = req.body;

    try {
        // Fetch the task by ID
        const task = await AudioTranscription.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Audio transcription task not found' });
        }

        // Compare user's transcription with the correct transcription
        const isCorrect = task.transcription.trim().toLowerCase() === transcription.trim().toLowerCase();

        let points = 0;
        if (isCorrect) {
            // Assign points based on difficulty level
            if (task.difficulty_level === 'easy') points = 5;
            else if (task.difficulty_level === 'medium') points = 10;
            else if (task.difficulty_level === 'hard') points = 15;
        }

        // Return the result and points awarded
        res.status(200).json({
            // isCorrect,
            pointsAwarded: isCorrect ? points : 0,
            message: isCorrect ? 'Correct transcription!' : 'Incorrect transcription.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAudioTranscription = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await AudioTranscription.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Audio transcription task not found' });
        }

        res.status(200).json({ message: 'Audio transcription task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.bulkDeleteAudioTranscriptions = async (req, res) => {
    const { ids } = req.body;

    try {
        const deleteResult = await AudioTranscription.deleteMany({ _id: { $in: ids } });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No audio transcription tasks found to delete' });
        }

        res.status(200).json({ message: `${deleteResult.deletedCount} audio transcription tasks deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};