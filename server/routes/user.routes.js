import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Define routes
router.post('/signup', userController.signup);
router.param('userId', userController.getUserById)
router.get('/users/:userId',userController.getUserById);
router.put('/users/:userId', userController.update);
export default router;
