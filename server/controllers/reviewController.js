const reviewModel = require("../models/reviewModel");

// @desc    Create a review
const createReview = async (req, res, next) => {
  try {
    const review = new reviewModel(req.body);
    await review.save();
    res.status(201).json({ message: "Review created successfully", "review": review });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel.find({});
    res.json({message: "All reviews", "reviews": reviews});
  } catch (error) {
    next(error);
  }
};

// @desc    Get a review by ID
const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findById(id);
    res.status(200).json({message: "Review found", "review": review});
  } catch (error) {
    next(error);
  }
};

// @desc    Update a review by ID
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findByIdAndUpdate(id, req.body);
    await review.save();
    res.json({ message: "Review updated successfully" , "review": review});
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review by ID
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully", "review": review });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview
};
