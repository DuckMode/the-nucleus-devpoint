import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../models/auth.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', validate(registerSchema), register);

// Login user
router.post('/login', validate(loginSchema), login);

// Get current user (protected route)
router.get('/me', authenticate, getCurrentUser);

export default router;
