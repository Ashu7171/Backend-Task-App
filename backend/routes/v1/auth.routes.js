const express = require('express');
const { register, login, logout, getCurrentUser } = require('../../controllers/auth.controller');
const validate = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('../../validators/auth.validator');
const auth = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', auth, getCurrentUser);

module.exports = router;