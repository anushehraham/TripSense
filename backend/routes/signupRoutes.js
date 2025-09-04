import express from 'express';
import { createSignup, getAllSignups, getSignupById, loginUser } from '../controllers/signupController.js';

const router = express.Router();

// POST /api/signup - Create a new user signup
router.post('/', createSignup);

// POST /api/signup/login - Login user
router.post('/login', loginUser);

// GET /api/signup - Get all signups (for admin purposes)
router.get('/', getAllSignups);

// GET /api/signup/:id - Get signup by ID
router.get('/:id', getSignupById);

export default router;
