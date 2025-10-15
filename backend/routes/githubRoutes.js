import express from 'express'
import passport from 'passport';
import {githubLoginController} from '../controllers/githubAuthController.js'
const router = express.Router();

router.get('/', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }),githubLoginController);

export default router;
