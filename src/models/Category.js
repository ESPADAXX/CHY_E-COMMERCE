const {Schema,model} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    thumbnail: {
        type: String

    },
    images: {
        type: [String]

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Category = model('Category', CategorySchema);
module.exports = Category;