const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountType: {
        type: String,
        required: true
    },
    discountValue: {
        type: Number,
        default: "unread"
    },
    validFrom: {
        type: Date,
        required: true
    },
    validUntil:{
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        required: true
    },
    applicableProducts: {
        type: Array,
        required: true
    },
});

// Export the model
const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;