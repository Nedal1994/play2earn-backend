// controllers/taskController.js

const Task = require('../models/task');

// GET /api/tasks/game
exports.getGameTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tasks/participating
exports.getParticipatingTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const tasks = await Task.find({ participants: req.user.id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/tasks/:taskId/participate
exports.participateInTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task.participants.includes(req.user.id)) {
      task.participants.push(req.user.id);
      await task.save();
    }
    res.json({ message: 'Participated in task', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tasks/:taskId/progress
exports.getTaskProgress = async (req, res) => {
  try {
    const progress = { completionPercentage: 75, pointsEarned: 100 }; // Example data
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/tasks/:taskId/complete
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    task.completedBy = req.user.id;
    await task.save();
    res.json({ message: 'Task completed', pointsAwarded: task.points });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
