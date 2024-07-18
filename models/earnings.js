const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  points: { type: Number, required: true },
  rewards: { type: String, required: true },
  totalEarned: { type: Number, required: true },
});

module.exports = mongoose.model('Earnings', earningsSchema);
