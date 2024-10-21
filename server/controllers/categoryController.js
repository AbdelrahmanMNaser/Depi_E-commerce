const Category = require("../models/categoryModel");

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create a category
const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category: category });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- GET APIs --------------------------> */

// @desc    Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json({ message: "All categories", categories: categories });
  } catch (error) {
    next(error);
  }
};



// @desc    Get a category by ID
const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update a category by ID
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ message: "Category updated successfully", category: category });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// @desc    Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
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
  deleteCategory,
};
