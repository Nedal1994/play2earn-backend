const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/authMiddleware');

// Create a new task
router.post('/create_task', auth, async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).send({ message: 'Task created successfully', task });
});

// Update a task
router.put('/update_task/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    res.send({ message: 'Task updated successfully', task });
});

// Delete a task
router.delete('/delete_task/:id', auth, async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.send({ message: 'Task deleted successfully' });
});

// Get all tasks
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

module.exports = router;
