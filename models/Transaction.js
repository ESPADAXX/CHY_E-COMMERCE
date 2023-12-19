const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

// Export the model
const Transaction = mongoose.model('Shipping', TransactionSchema);
module.exports = Transaction;