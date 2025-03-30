import express from 'express';
import { addfriend, getGoogleAuthURL, handleGoogleCallback, login, signup, suggestFriends } from '../controllers/user.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);
router.post('/addfriend', addfriend);
router.post('/getsuggest', suggestFriends);
router.get('/auth/google',getGoogleAuthURL);
router.post('/auth/google/callback',handleGoogleCallback);
export default router;
