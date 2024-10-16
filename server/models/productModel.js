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
    status: {
      type: String,
      enum: ["Active", "Inactive", "Discontinued"],
      default: "Active",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true
  }
);

ProductSchema.methods.updateStock = function (quantity) {
  this.stock = quantity;
  return this.save();
};

ProductSchema.methods.markAsDiscontinued = function () {
  this.status = "Discontinued";
  return this.save();
};
module.exports = Product = mongoose.model("Product", ProductSchema);
