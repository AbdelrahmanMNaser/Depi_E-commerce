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
    totalPriceAfterTax: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      country: {
        type: String,
        default: function () {
          return timezoneToCountry(
            Intl.DateTimeFormat().resolvedOptions().timeZone
          );
        },
      },
      city: {
        type: String,
      },
      street: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum : ["Pending", "Paid", "Failed"]
    },
    shipmentStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum : ["Pending", "Shipped", "Delivered", "Cancelled"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
