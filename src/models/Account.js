const {Schema, model} = require('mongoose');
const Roles=['client','moderator','admin']
const AccountSchema = new Schema({
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
        type: String,
        required: false,
        unique : true,
    },
    address: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required : false
    },
    isVerified: {
        type: Boolean,
        default: false
        },
    verificationCode: {
        type: String
    },
    wishlist: {
        type: Array,
        required : false
    },
    role: {
        type: String,
        enum: Roles,
        default:Roles[0]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required : false
    },
    lastLogin: {
        type: Date,
        required : false
    }

});

// Export the model
const Account = model('Account', AccountSchema);
module.exports = Account;