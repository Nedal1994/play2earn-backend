const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).send({ message: 'Task created successfully', task });
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    res.send({ message: 'Task updated successfully', task });
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.send({ message: 'Task deleted successfully' });
};
