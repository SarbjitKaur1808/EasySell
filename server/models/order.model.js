import mongoose from 'mongoose'
const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: 'products' },
    quantity: Number,
    shop: { type: mongoose.Schema.ObjectId, ref: 'shops' },
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
})
const CartItem = mongoose.model('cartitems', CartItemSchema)

const OrderSchema = new mongoose.Schema({
    products: [CartItemSchema],
    customer_name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    customer_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    delivery_address: {
        street: { type: String, required: 'Street is required' },
        city: { type: String, required: 'City is required' },
        state: { type: String },
        zipcode: { type: String, required: 'Zip Code is required' },
        country: { type: String, required: 'Country is required' }
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'users' }
})

const Order = mongoose.model('orders', OrderSchema)

export { Order, CartItem }
