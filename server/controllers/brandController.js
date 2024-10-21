const Brand = require("../models/brandModel");
const Product = require('../models/productModel');

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create a brand
const createBrand = async (req, res, next) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({ message: "Brand created successfully", "brand": brand });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- GET APIs --------------------------> */

// @desc    Get all brands
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.json({message: "All brands", "brands": brands});
  } catch (error) {
    next(error);
  }
};


// @desc    Get brands by category

const getBrandsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find products by category
    const products = await Product.find({ category: categoryId }).select('brand');    

    // Extract unique brand IDs
    const brandIds = [...new Set(products.map(product => product.brand))];

    const brands = await Brand.find({ _id: { $in: brandIds } });

    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a brand by ID
const getBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.status(200).json({message: "Brand found", "brand": brand});
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update a brand by ID
const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(id, req.body);
    await brand.save();
    res.json({ message: "Brand updated successfully" , "brand": brand});
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// @desc    Delete a brand by ID
const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    res.json({ message: "Brand deleted successfully", "brand": brand });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createBrand,
  getAllBrands,
  getBrandsByCategory,
  getBrand,
  updateBrand,
  deleteBrand
};
