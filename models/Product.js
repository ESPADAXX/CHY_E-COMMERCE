const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:trues
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    compareAtPrice:{
        type:Number,
        required:true
    },
    SKU:{
        type:String,
        required:true
    },
    variants:{
        type:Array,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    reviews:{
        type:Array,
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    averageRating :{
        type:Number,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:true
    },
    metaTitle:{
        type:String,
        required:true
    },
    metaDescription:{
        type:String,
        required:true
    },
    metaKeywords:{
        type:String,
        required:true
    }
});

// Export the model
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;