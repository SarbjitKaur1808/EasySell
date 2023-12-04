import { Order, CartItem } from '../models/order.model.js'
import errorHandler from './../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    try {
        req.body.order.user = req.profile
        const order = new Order(req.body.order)
        let result = await order.save()
        res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listByShop = async (req, res) => {
    try {
        let orders = await Order.find({ "products.shop": req.shop._id })
            .populate({ path: 'products.product', select: '_id name price' })
            .sort('-created')
            .exec()
        res.json(orders)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/*
const update = async (req, res) => {
    console.log("Update function called");
    try {

        console.log("Request Body:", req.body);
        console.log("cartItemId:", req.body.cartItemId);
        console.log("Status to be updated:", req.body.status);

        let order = await Order.update({ 'products._id': req.body.cartItemId }, {
            '$set': {
                'products.$.status': req.body.status
            }
        })

        console.log("Order update result:", order);

        res.json(order)
    } catch (err) {
        console.error("Error occurred in update function:", err);

        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
} */

const update = async (req, res) => {
    console.log("Update function called");
    try {
        console.log("Request Params:", req.params);
        console.log("Request Body:", req.body);

        const { shopId, productId } = req.params;
        const { status, cartItemId } = req.body; // Include cartItemId if needed for specific updates

        let orderUpdateResult;

        if (productId && cartItemId) {
            // Route: /order/:shopId/cancel/:productId
            // Cancel a specific cart item within an order
            orderUpdateResult = await Order.updateOne(
                { 'products._id': cartItemId, 'products.product': productId },
                { '$set': { 'products.$.status': 'Cancelled' } }
            );
        } else if (shopId && status) {
            // Route: /order/status/:shopId
            // Update the status of all orders for a shop
            orderUpdateResult = await Order.updateMany(
                { 'products.shop': shopId },
                { '$set': { 'products.$[].status': status } }
            );
        } else {
            return res.status(400).json({ error: "Invalid request parameters" });
        }

        console.log("Order update result:", orderUpdateResult);
        res.json(orderUpdateResult);
    } catch (err) {
        console.error("Error occurred in update function:", err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}


const getStatusValues = (req, res) => {
    res.json(CartItem.schema.path('status').enumValues)
}

const orderByID = async (req, res, next, id) => {
    try {
        let order = await Order.findById(id).populate('products.product', 'name price').populate('products.shop', 'name').exec()
        if (!order)
            return res.status('400').json({
                error: "Order not found"
            })
        req.order = order
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let orders = await Order.find({ "user": req.profile._id })
            .sort('-created')
            .exec()
        res.json(orders)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const read = (req, res) => {
    return res.json(req.order)
}

export default {
    create,
    listByShop,
    update,
    getStatusValues,
    orderByID,
    listByUser,
    read
}