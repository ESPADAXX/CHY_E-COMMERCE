const {Schema,model} = require('mongoose');
const Order = require('./Order')
const User= require('./Account')
const TransactionSchema = Schema({
    order: {
        type: Order.schema,
        ref:'Order',
        required: true
    },
    user: {
        type: User.schema,
        ref: 'User',
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
const Transaction = model('Transaction', TransactionSchema);
module.exports = Transaction;