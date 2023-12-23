const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    estimatedDelivery: {
        type: String,
        required: true
    },
    regions: {
        type: Array,
        default: true
    }
});

// Export the model
const Shipping = mongoose.model('Shipping', ShippingSchema);
module.exports = Shipping;