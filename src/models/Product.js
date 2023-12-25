const {Schema,model} = require('mongoose');

const VariantSchema = new Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Assuming 'Account' is the model name for the user schema
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    images: {
        type: Array, // Assuming an array of image URLs
    },
});

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    compareAtPrice: {
        type: Number,
        required: true,
    },
    SKU: {
        type: String,
        required: true,
    },
    variants: {
        type: [VariantSchema],
        required: true,
    },
    reviews: {
        type: [ReviewSchema], // Array of review objects
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    averageRating: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true,
    },
    metaKeywords: {
        type: String,
        required: true,
    },
});

// Export the model
const Product = model('Product', ProductSchema);
module.exports = Product;
