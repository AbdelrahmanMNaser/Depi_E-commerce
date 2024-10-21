const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
);

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    sub_categories: [SubCategorySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);