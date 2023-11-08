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
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Order = model("Order", orderSchema);

module.exports = Order;
