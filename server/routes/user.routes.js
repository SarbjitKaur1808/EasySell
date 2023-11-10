import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Define routes
router.post('/signup', userController.signup);
router.put('/update', userController.update);
export default router;
