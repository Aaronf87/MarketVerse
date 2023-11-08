const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      // This is expecting an array of ObjectId's from the Product model
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Order = model("Order", orderSchema);

module.exports = Order;
