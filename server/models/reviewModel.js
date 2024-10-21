const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product: {
      ref: "Product",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
      maxLength: 50,
    },
    reviewText: {
      type: String,
      required: true,
      maxLength: 500
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
