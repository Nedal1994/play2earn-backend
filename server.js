// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const taskRoutes = require('./routes/tasks');
const socialAccountsRoutes = require('./routes/socialAccounts');
const userRoutes = require('./routes/user');
const earningsRoutes = require('./routes/earnings');
const aiContributionRoutes = require('./routes/aicontribution');
const transactionRoutes = require('./routes/transactions');
const recommendationRoutes = require('./routes/recommendations');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session configuration (required for passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Here you should fetch the user from the database and pass it to done(null, user)
  // For example:
  // User.findById(id, (err, user) => done(err, user));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/earnings', earningsRoutes);
app.use('/api/aicontributions', aiContributionRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/social-accounts', socialAccountsRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred on the server' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});