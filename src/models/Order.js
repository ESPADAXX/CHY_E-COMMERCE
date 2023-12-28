const { Schema, model } = require("mongoose");
const Product = require("./Product");
const Account = require("./Account");
const orderStatusEnum = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const paymentMethodEnum = [
  "cash",
  "credit_card",
  "paypal",
  "other"
];

const OrderSchema = new Schema({
  products: {
    type: [Product.schema],
    ref: "Product",
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: orderStatusEnum[0],
    enum: orderStatusEnum,
  },
  paymentMethod: {
    type: String,
    default: paymentMethodEnum[0],
    enum: paymentMethodEnum,
  },
  customer: {
    type: Account.schema,
    ref: "Account",
  },
  discount: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  trackingNumber: {
    type: String,
    default: "",
  },
  billingAddress: {
    type: String,
    required: true,
  },
  orderNotes: {
    type: String,
    default: "",
  },
});

// Export the model
const Order = model("Order", OrderSchema);
module.exports = Order;
