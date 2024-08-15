const mongoose = require('mongoose');

const aiContributionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  taskCompleted: { type: Number, required: true },
  aiModelImproved: { type: Boolean, required: true },
});

module.exports = mongoose.model('AIContribution', aiContributionSchema);

