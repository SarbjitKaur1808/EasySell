import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

// Define routes
router.route('/users/signup')
    .post(userCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);
router.param('userId', userCtrl.getUserById)
router.get('/users/:userId', userCtrl.read);
router.get('/users', userCtrl.list);
router.put('/users/:userId', userCtrl.update);
router.route('/api/users/:userId').delete(userCtrl.remove)
export default router;
