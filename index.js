const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// const taskRoutes = require('./routes/taskRoutes'); // Comment this out or remove

dotenv.config();

const server = express();

// Middleware
server.use(bodyParser.json());

// Routes
server.use('/api/auth', authRoutes);
server.use('/api/admin', adminRoutes);
server.use('/api/users', userRoutes);
// server.use('/api/tasks', taskRoutes); // Comment this out or remove

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Server setup
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
