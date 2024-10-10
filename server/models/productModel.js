const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    vendor: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    brand: {
      ref: "Brand",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    colorList: {
      type: Array,
      default: [],
    },
    imageURLs: {
      type: Array,
      default: []
    },
  },
  {
    timestamps: true
  }
);

module.exports = Product = mongoose.model("Product", ProductSchema);
