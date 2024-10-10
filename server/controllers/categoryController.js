const categoryModel = require("../models/categoryModel");

// @desc    Create a category
const createCategory = async (req, res, next) => {
  try {
    const category = new categoryModel(req.body);
    await category.save();
    res.status(201).json({ message: "Category created successfully", "category": category });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find({});
    res.json({message: "All categories", "categories": categories});
  } catch (error) {
    next(error);
  }
};

// @desc    Get a category by ID
const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category by ID
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, req.body);
    await category.save();
    res.status(200).json({ message: "Category updated successfully" , "category": category});
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
