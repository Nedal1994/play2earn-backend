const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token.split(' ')[1], 'your_jwt_secret_key', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

// User registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.setPassword(password);
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await user.checkPassword(password)) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.send({ token });
});

// Create task
router.post('/create_task', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).send({ message: 'Task created successfully', task });
});

// Get tasks
router.get('/tasks', verifyToken, async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Update task
router.put('/update_task/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    res.send({ message: 'Task updated successfully', task });
});

// Delete task
router.delete('/delete_task/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.send({ message: 'Task deleted successfully' });
});

module.exports = router;
