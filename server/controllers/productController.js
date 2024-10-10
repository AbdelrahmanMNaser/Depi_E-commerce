const productModel = require("../models/productModel");

// @desc    Create a product
const createProduct = async (req, res, next) => {
  try {
    const product = new productModel(req.body);
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find().populate({
      path: "vendor category brand",
      select: "name -_id",
    });
    res.json({ message: "All products", products: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a product by ID
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById(id)
      .populate("user category brand");
    res.status(200).json({ message: "Product found", product: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a product by category
const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const product = await productModel
      .find({ category: category })
      .populate("user category brand");
    res.status(200).json({ message: "Product found", product: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product by ID
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product by ID
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", product: product });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
