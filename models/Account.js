const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: Array,
        default : [],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    wishlist: {
        type: Array,
        default: []
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;