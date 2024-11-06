const mongoose = require("mongoose");
const timezoneToCountry = require("../utils/timezoneConverter");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productList: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      city: {
        type: String,
      },
      street: {
        type: String,
      },
      country: {
        type: String,
        default: function () {
          return timezoneToCountry(
            Intl.DateTimeFormat().resolvedOptions().timeZone
          );
        },
      },
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed"],
    },
    shipmentStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
