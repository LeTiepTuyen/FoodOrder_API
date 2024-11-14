const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Item", itemSchema);
