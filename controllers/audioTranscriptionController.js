const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const AudioTranscription = require('../models/AudioTranscription'); // Make sure this line is included


let gfsBucket;
mongoose.connection.once('open', () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'audios' });
});


exports.streamAudio = (req, res) => {
    const { filename } = req.params;

    // Set the appropriate content type
    res.set('Content-Type', 'audio/wav');

    const readstream = gfsBucket.openDownloadStreamByName(filename);

    readstream.on('error', (error) => {
        res.status(500).json({  message: 'Error streaming file' });
    });

    readstream.on('end', () => {
        res.end();
    });

    // Stream the file to the response
    readstream.pipe(res);
};





exports.createAudioTranscriptionTask = async (req, res) => {
    try {
        const { transcription, difficulty_level, points } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files[0]; // Get the first file

        // Manually generating an ObjectId for the file
        const file_id = new mongoose.Types.ObjectId();

        const uploadStream = gfsBucket.openUploadStreamWithId(file_id, file.originalname);

        uploadStream.end(file.buffer, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error uploading file to GridFS' });
            }

            // Create the transcription task with the file ID from GridFS
            const newTask = new AudioTranscription({
                file_id: file_id, // Use the manually generated ID
                filename: file.originalname,
                transcription,
                difficulty_level,
                points
            });

            await newTask.save();

            res.status(201).json({
                message: 'Audio transcription task created successfully',
                task: newTask
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the transcription task.' });
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
        const taskId = req.params.id;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        // Fetch the task from the database
        const task = await AudioTranscription.findById(taskId);

        // Check if the task was found
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Respond with the found task
        res.status(200).json(task);
    } catch (error) {
        // Log the error and respond with an internal server error message
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.submitTranscription = async (req, res) => {
    try {
        const task = await AudioTranscription.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const isCorrect = task.transcription.toLowerCase() === req.body.transcription.toLowerCase();
        const points = isCorrect ? task.points : 0;

        res.status(200).json({
            isCorrect,
            points,
            message: isCorrect ? 'Correct!' : 'Try again!',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAudioTranscription = async (req, res) => {
    try {
        const taskId = req.params.id;
        console.log(`Attempting to delete task with ID: ${taskId}`);

        // Find the transcription task by ID
        const task = await AudioTranscription.findById(taskId);
        if (!task) {
            console.log('Task not found in database.');
            return res.status(404).json({ message: 'Task not found' });
        }

        // Attempt to delete the file from GridFS
        try {
            await gfsBucket.delete(new mongoose.Types.ObjectId(task.file_id));
        } catch (err) {
            if (err.message.includes('File not found')) {
                console.warn(`File with id ${task.file_id} not found in GridFS.`);
            } else {
                return res.status(500).json({ message: 'Failed to delete file from GridFS', error: err });
            }
        }

        // Delete the transcription task from the collection
        try {
            await task.deleteOne();
            console.log('Task and associated file deleted successfully.');
            res.status(200).json({ message: 'Task and file deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to delete transcription task', error: err });
        }

    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'An error occurred while deleting the transcription task.' });
    }
};




exports.bulkDeleteAudioTranscriptions = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'No valid IDs provided for deletion.' });
        }

        const deleteResult = await AudioTranscription.deleteMany({ _id: { $in: ids } });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No audio transcription tasks found to delete.' });
        }

        res.status(200).json({ message: `${deleteResult.deletedCount} audio transcription tasks deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addDetailsToAudio = async (req, res) => {
    try {
        const { filename, transcription, difficulty_level, points } = req.body;

        // Find the file in GridFS
        const file = await mongoose.connection.db.collection('audios.files').findOne({ filename: filename });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Create a new transcription document
        const newTranscription = new AudioTranscription({
            file_id: file._id,
            filename: filename,
            transcription: transcription,
            difficulty_level: difficulty_level,
            points: points
        });

        await newTranscription.save();

        res.status(201).json({
            message: 'Details added successfully',
            data: newTranscription
        });
    } catch (error) {
        console.error('Error adding details:', error);
        res.status(500).json({ error: 'An error occurred while adding details.' });
    }
};

