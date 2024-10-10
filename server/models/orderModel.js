const mongoose = require("mongoose");
const timezoneToCountry = require("../utils/timezoneConverter");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productList: [
      {
        ref: "Product",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    },
    totalPriceAfterTax: {
      type: Number,
      required: true,
    },
    ShippingAddress: {
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
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
