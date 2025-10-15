import express from 'express'
import { RegisterController ,LoginController,ProfileController } from '../controllers/authController.js';
const Router = express.Router();
import { authenticateToken } from '../middleware/authMiddleware.js';
import githubRoutes from './githubRoutes.js'
import googleRoutes from './googleRoutes.js'

// OAuth Routes  
Router.use('/google',googleRoutes);
Router.use('/github',githubRoutes);

// Manual Register Routes
Router.post('/register',RegisterController);
Router.post('/login',LoginController);
Router.get('/profile', authenticateToken, ProfileController);

export default Router