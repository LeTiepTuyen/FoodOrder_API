const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  total_money: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  is_payment: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
