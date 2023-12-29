const {Schema , model} = require('mongoose');
const Product = require("./Product")
const OfferSchema = new Schema({
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
        type: [Product.schema],
        ref: 'Product',
        required: true
    },
});

// Export the model
const Offer = model('Offer', OfferSchema);
module.exports = Offer;