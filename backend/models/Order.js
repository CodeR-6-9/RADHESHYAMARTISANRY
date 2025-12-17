const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // Customer Details
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
  },

  // What they bought
  items: [
    {
      productId: Number,
      title: String,
      quantity: Number,
      price: Number,
      variant: String, // e.g., "Ocean Green"
    },
  ],

  // Payment Details
  amount: { type: Number, required: true },
  paymentId: { type: String },
  orderId: { type: String },
  status: { type: String, default: "Paid" },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
