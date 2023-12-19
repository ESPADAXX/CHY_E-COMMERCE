const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required:true,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        default: 'cash'
    },
    customer: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    tax:{
        type: Number,
        default: 0
    },
    shippingAddress:{
        type: Object,
        required: true
    },
    trackingNumber:{
        type: String,
        default: ''
    },
    billingAddress:{
        type: Object,
        required: true
    },
    orderNotes:{
        type: String,
        default: ''
    }
})

// Export the model
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;