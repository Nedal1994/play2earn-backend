const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
  level: String,
  paragraph: String,
  word1count: Number,
  word2count: Number,
  points: Number
});

module.exports = mongoose.model('Paragraph', paragraphSchema);
