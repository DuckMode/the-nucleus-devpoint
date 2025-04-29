import express from 'express';
import { getAllUsers, getUserById } from '../controllers/users.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

export default router;
