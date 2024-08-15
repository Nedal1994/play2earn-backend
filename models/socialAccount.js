// models/socialAccount.js
const mongoose = require('mongoose');

const socialAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, enum: ['twitter', 'linkedin'], required: true },
  accountId: { type: String, required: true },
  username: { type: String, required: true },
  accessToken: { type: String, required: true },
  accessTokenSecret: { type: String }, // For Twitter
  refreshToken: { type: String }, // For LinkedIn
  expiresAt: { type: Date }, // For LinkedIn
});

module.exports = mongoose.model('SocialAccount', socialAccountSchema);