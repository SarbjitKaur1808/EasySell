import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Define routes
router.post('/users/signup', userController.create);
router.param('userId', userController.getUserById)
router.get('/users/:userId',userController.read);
router.get('/users', userController.list);
router.put('/users/:userId', userController.update);
<<<<<<< HEAD

router.delete('/user/:userId', userController.remove);
export default router;
=======
router.delete('/users/:userId', userController.remove);
export default router;
>>>>>>> 89f03b00f0146d7c62da22434ad58442bc42d262
