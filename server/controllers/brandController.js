const brandModel = require("../models/brandModel");

// @desc    Create a brand
const createBrand = async (req, res, next) => {
  try {
    const brand = new brandModel(req.body);
    await brand.save();
    res.status(201).json({ message: "Brand created successfully", "brand": brand });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all brands
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandModel.find({});
    res.json({message: "All brands", "brands": brands});
  } catch (error) {
    next(error);
  }
};

// @desc    Get a brand by ID
const getBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findById(id);
    res.status(200).json({message: "Brand found", "brand": brand});
  } catch (error) {
    next(error);
  }
};

// @desc    Update a brand by ID
const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndUpdate(id, req.body);
    await brand.save();
    res.json({ message: "Brand updated successfully" , "brand": brand});
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a brand by ID
const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndDelete(id);
    res.json({ message: "Brand deleted successfully", "brand": brand });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand
};
