const ApiError = require('../utils/ApiError');

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied: Insufficient permissions'));
    }
    next();
  };
};

module.exports = requireRole;