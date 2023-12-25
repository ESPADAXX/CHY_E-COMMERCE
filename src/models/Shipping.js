const { Schema, model} = require('mongoose');

const validShippingTypes = ['air', 'sea', 'land', 'express']; // Add more types as needed

const ShippingSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: validShippingTypes,
    },
    cost: {
        type: Number,
        required: true,
    },
    estimatedDelivery: {
        type: String,
        required: true,
    },
    regions: {
        type: Array,
        default: [], // Set default to an empty array if needed
    },
});

// Export the model
const Shipping = model('Shipping', ShippingSchema);
module.exports = Shipping;
