require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRoutes = require('./routes/v1/auth.routes');
const ApiError = require('./utils/ApiError');
const ApiResponse = require('./utils/ApiResponse');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Vite default
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json(new ApiResponse(200, null, 'Backend is running!'));
});

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }
  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json(new ApiResponse(404, null, 'Route not found'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});