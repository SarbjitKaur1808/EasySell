import express from 'express'
import productCtrl from '../controllers/product.controller.js'
import authCtrl from '../controllers/auth.controller.js'


const router = express.Router()


router.route('/api/products/latest')
  .get(productCtrl.listLatest)

router.route('/api/products/related/:productId')
  .get(productCtrl.listRelated)

router.route('/api/products/categories')
  .get(productCtrl.listCategories)

router.route('/api/products')
  .get(productCtrl.list)

router.route('/api/products/:productId')
  .get(productCtrl.read)

router.route('/api/product/image/:productId')
  .get(productCtrl.photo, productCtrl.defaultPhoto)
router.route('/api/product/defaultphoto')
  .get(productCtrl.defaultPhoto)

router.route('/api/product/:shopId/:productId')
  .put(authCtrl.requireSignin, productCtrl.update)
  .delete(authCtrl.requireSignin, productCtrl.remove)

router.param('productId', productCtrl.productByID)

export default router
