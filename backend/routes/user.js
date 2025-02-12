import express from 'express';
import { login, signup } from '../controllers/user.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);


export default router;
