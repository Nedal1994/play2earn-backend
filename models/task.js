// models/task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  points: { type: Number, required: true },
  type: { type: String, enum: ['game', 'participating'], required: true },
});

module.exports = mongoose.model('Task', TaskSchema);