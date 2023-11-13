import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Define routes
router.post('/users/signup', userController.create);
router.param('userId', userController.getUserById)
router.get('/users/:userId',userController.read);
router.get('/users', userController.list);
router.put('/users/:userId', userController.update);
router.delete('/users/:userId', userController.remove);
export default router;
