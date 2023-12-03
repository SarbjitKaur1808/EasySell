import express from 'express'
import orderCtrl from '../controllers/order.controller.js'
import productCtrl from '../controllers/product.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import shopCtrl from '../controllers/shop.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.route('/orders/:userId')
    .post(authCtrl.requireSignin, productCtrl.decreaseQuantity, orderCtrl.create)

router.route('/orders/shop/:shopId')
    .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop)

router.route('/orders/user/:userId')
    .get(authCtrl.requireSignin, orderCtrl.listByUser)

router.route('/order/status_values')
    .get(orderCtrl.getStatusValues)

//?
router.route('/order/:shopId/cancel/:productId')
    .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update)

/*
router.route('/order/:orderId/charge/:userId/:shopId')
    .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update)*/

router.route('/order/status/:shopId')
    .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update)

router.route('/order/:orderId')
    .get(orderCtrl.read)

router.param('userId', userCtrl.getUserById)
router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)
router.param('orderId', orderCtrl.orderByID)

export default router