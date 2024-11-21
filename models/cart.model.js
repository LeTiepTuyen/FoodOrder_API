const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  is_order: {
    type: Boolean,
    required: true,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
