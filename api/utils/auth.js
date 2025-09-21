const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      throw new Error('User not found');
    }
    return req;
  } catch (error) {
    throw new Error('Token is not valid');
  }
};

module.exports = { protect };