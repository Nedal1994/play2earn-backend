// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check for token in various places
  const token = req.header('Authorization')?.split(' ')[1] || 
                (req.cookies ? req.cookies.token : null) || 
                req.query.token;

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Authenticated user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};