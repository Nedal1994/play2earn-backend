// controllers/taskController.js
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, type, status, difficulty_level, points, reward } = req.body;

    if (difficulty_level < 1 || difficulty_level > 10) {
        return res.status(400).json({ error: 'Difficulty level must be between 1 and 10' });
    }

    try {
        const task = new Task({ title, description, type, status, difficulty_level, points, reward });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Participate in a task
exports.participateInTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (!task.participants.includes(req.user.id)) {
            task.participants.push(req.user.id);
            await task.save();
        }
        res.json({ message: 'Participated in task', task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Complete a task
exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = 'completed';
        task.completedBy = req.user.id;
        await task.save();
        res.json({ message: 'Task completed', pointsAwarded: task.points, reward: task.reward });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks of type 'game' with optional pagination
exports.getGameTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const tasks = await Task.find({ type: 'game' })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalTasks = await Task.countDocuments({ type: 'game' });

        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            tasks
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all tasks of type 'participating' with optional pagination
exports.getParticipatingTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const tasks = await Task.find({ type: 'participating' })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalTasks = await Task.countDocuments({ type: 'participating' });

        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            tasks
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a task
exports.getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get task progress
exports.getTaskProgress = async (req, res) => {
    try {
        const progress = { completionPercentage: 75, pointsEarned: 100 }; // Example data
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, type, status, difficulty_level, points, reward } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, type, status, difficulty_level, points, reward },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Bulk delete tasks
exports.bulkDeleteTasks = async (req, res) => {
    const { taskIds } = req.body;

    try {
        const deletedTasks = await Task.deleteMany({ _id: { $in: taskIds } });

        if (!deletedTasks) {
            return res.status(404).json({ error: 'No tasks found to delete' });
        }

        res.json({ message: 'Tasks deleted successfully', deletedTasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
