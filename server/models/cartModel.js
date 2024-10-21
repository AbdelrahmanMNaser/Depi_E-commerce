const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productList: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPriceAfterTax: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

// pre

// Pre-save middleware to calculate totalPrice and totalPriceAfterTax
CartSchema.pre("save", function (next) {
  const VatValue = 0.14;
  this.totalPrice = this.productList.reduce(
    (total, product) => total + product.quantity * product.unitPrice,
    0
  );
  this.totalPriceAfterTax = this.totalPrice + this.totalPrice * VatValue;
  next();
});

module.exports = mongoose.model("Cart", CartSchema);