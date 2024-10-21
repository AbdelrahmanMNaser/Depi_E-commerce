const { query } = require("express");
const Product = require("../models/productModel");
const { getFilters } = require("../utils/filter");

// Apply search on keywords of product
const search = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const filters = getFilters(req.query);

    const products = await Product.find({
      keywords: { $in: [keyword] },
      ...filters,
    });

    res.status(200).json({
      products: products,
      ProductCount: products.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
