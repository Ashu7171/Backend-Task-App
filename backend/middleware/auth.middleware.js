const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/User.model');

const auth = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    let token;
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.header('Authorization')?.startsWith('Bearer ')) {
      token = req.header('Authorization').split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Unauthorized: No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ApiError(401, 'Invalid token'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = auth;