const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        actualPrice: { type: Number, required: true },
        ourPrice: { type: Number, required: true },
        qty: { type: Number, required: true },
        per: { type: String, required: true },
      },
    ],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    trackingId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
