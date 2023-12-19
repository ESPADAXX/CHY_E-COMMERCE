const mongoose = require('mongoose');

const NotifSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
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
const Notification = mongoose.model('Notification', NotifSchema);
module.exports = Notification;