const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subCategory: {
      ref: "Category.sub_categories",
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    vendor: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    brand: {
      ref: "Brand",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    colorList: {
      type: Array,
      default: [],
    },
    imageURLs: {
      type: Array,
      default: [],
    },
    keywords: {
      type: Array,
      default: [],
    },
    features: [
      {
        title: {
          type: String,
          required: true,
          maxLength: 100,
        },
        description: {
          type: String,
          required: true,
          maxLength: 300,
        },
        imageURL: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);