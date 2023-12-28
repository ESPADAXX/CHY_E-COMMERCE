const { Schema, model } = require('mongoose');
const Account = require('./Account');
const NotifSchema = new Schema({
   user: {
        type: Account.schema,
        ref: 'Account', 
    },
    type: {
        type: String,

        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unread"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Notification = model('Notification', NotifSchema);
module.exports = Notification;