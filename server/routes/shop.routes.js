import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import shopCtrl from '../controllers/shop.controller.js'

const router = express.Router()

router.route('/shops')
    .get(shopCtrl.list)

router.route('/shop/:shopId')
    .get(shopCtrl.read)

router.route('/shops/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.create)
    //Do we need to add userCtrl.isOwner in the argument??
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

router.route('/shops/:shopId')
    .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
    .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

router.route('/shops/logo/:shopId')
    .get(shopCtrl.photo, shopCtrl.defaultPhoto)

router.route('/shops/defaultphoto')
    .get(shopCtrl.defaultPhoto)

router.param('shopId', shopCtrl.shopByID)
router.param('userId', userCtrl.getUserById)

export default router