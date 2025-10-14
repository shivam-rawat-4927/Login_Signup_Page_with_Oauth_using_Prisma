import express from 'express'
import passport from 'passport';
import {googleLoginController} from '../controllers/googleAuthController.js'
const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),googleLoginController);

export default router;