const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const register = async (req, res, next) => {
  try {
    const { email, password, role = 'user' } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists'));
    }

    const user = await User.create({ email, password, role });
    const token = generateToken(user._id);

    // Set cookie (HttpOnly for security)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000 // 30 mins
    });

    return res.status(201).json(new ApiResponse(201, {
      user: { id: user._id, email: user.email, role: user.role }
    }, 'User registered successfully'));
  } catch (error) {
    next(new ApiError(500, 'Registration failed'));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000
    });

    return res.json(new ApiResponse(200, {
      user: { id: user._id, email: user.email, role: user.role }
    }, 'Login successful'));
  } catch (error) {
    next(new ApiError(500, 'Login failed'));
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.json(new ApiResponse(200, null, 'Logged out successfully'));
};

const getCurrentUser = (req, res) => {
  return res.json(new ApiResponse(200, {
    user: req.user
  }));
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};