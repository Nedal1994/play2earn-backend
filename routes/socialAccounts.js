const express = require('express');
const router = express.Router();
const SocialAccount = require('../models/socialAccount');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// Load environment variables
require('dotenv').config();

// Check if Twitter credentials are available
if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
  console.error('Twitter API credentials are missing. Please check your .env file.');
  process.exit(1);
}

// Check if LinkedIn credentials are available
if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
  console.error('LinkedIn API credentials are missing. Please check your .env file.');
  process.exit(1);
}

// Configure Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: "http://localhost:5001/api/social-accounts/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    done(null, { profile, token, tokenSecret });
  }
));

// Configure LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/api/social-accounts/linkedin/callback",
    scope: ['openid', 'profile', 'email', 'w_member_social']
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, { profile, accessToken, refreshToken });
  }
));

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  async function(req, res) {
    try {
      const { profile, token, tokenSecret } = req.user;
      await SocialAccount.findOneAndUpdate(
        { userId: req.user._id, platform: 'twitter' },
        {
          accountId: profile.id,
          username: profile.username,
          accessToken: token,
          accessTokenSecret: tokenSecret
        },
        { upsert: true, new: true }
      );
      res.send('<script>window.close();</script>');
    } catch (error) {
      console.error('Error saving Twitter account:', error);
      res.status(500).send('Failed to save Twitter account');
    }
  }
);

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  async function(req, res) {
    try {
      const { profile, accessToken, refreshToken } = req.user;
      await SocialAccount.findOneAndUpdate(
        { userId: req.user._id, platform: 'linkedin' },
        {
          accountId: profile.id,
          username: profile.displayName,
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000) // Set expiration to 1 hour from now
        },
        { upsert: true, new: true }
      );
      res.send('<script>window.close();</script>');
    } catch (error) {
      console.error('Error saving LinkedIn account:', error);
      res.status(500).send('Failed to save LinkedIn account');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const socialAccounts = await SocialAccount.find({ userId: req.user._id });
    res.json(socialAccounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/unlink', async (req, res) => {
  const { platform } = req.body;
  try {
    await SocialAccount.findOneAndDelete({ userId: req.user._id, platform });
    res.json({ message: 'Account unlinked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;