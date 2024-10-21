const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create a review
const createReview = async (req, res, next) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: review });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- GET APIs --------------------------> */

//@desc      Get all reviews
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ message: "All reviews", reviews: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews by product
const getAllReviewsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate([
      {
        path: "product",
        select: "title -_id",
      },
      {
        path: "user",
        select: "name -_id",
      },
    ]);
    res.status(200).json({
      message: `Reviews Found`,
      reviews: reviews,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Get all reviews by customer
const getAllReviewsByCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    const reviews = await Review.find({ user: customerId }).populate([
      {
        path: "product",
        select: "title -_id",
      },
      {
        path: "user",
        select: "name -_id",
      },
    ]);
    res.status(200).json({
      message: `Reviews Found`,
      reviews: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews by vendor (grouped by product)
const getAllReviewsByVendor = async (req, res, next) => {
  try {
    const vendorId = req.params.id;

    const products = await Product.find({ vendor: vendorId });
    const productIds = products.map((product) => product._id);

    const reviews = await Review.find({
      product: { $in: productIds },
    }).populate({
      path: "user",
      select: "name email -_id",
    });
    const groupedReviews = groupReviewsByProduct(products, reviews);

    res.status(200).json(groupedReviews);
  } catch (error) {
    next(error);
  }
};

// ================== Helper Function to group reviews by product ==================
const groupReviewsByProduct = (products, reviews) => {
  return products.map((product) => {
    const productReviews = reviews.filter(
      (review) => review.product.toString() === product._id.toString()
    );

    const starCounts = Array(5).fill(0); // Array to hold counts for 1-star to 5-star
    const totalRating = productReviews.reduce((acc, review) => {
      starCounts[review.rating - 1]++;
      return acc + review.rating;
    }, 0);

    if (productReviews.length === 0) {
      avgRating = 0;
    } else {
      avgRating = (totalRating / productReviews.length).toFixed(1);
    }

    if (productReviews.length > 0) {
      avgRating = (totalRating / productReviews.length).toFixed(1);
    } else {
      avgRating = 0;
    }

    return {
      product: product.title,
      reviews: productReviews,
      statistics: {
        starCounts,
        avgRating,
      },
    };
  });
};

// @desc    Get a review by ID
const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate({
      path: "user",
      select: "name email -_id",
    });
    res.status(200).json({ message: "Review found", review: review });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update a review by ID
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, req.body);
    await review.save();
    res.json({ message: "Review updated successfully", review: review });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// @desc    Delete a review by ID
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully", review: review });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createReview,
  getAllReviews,
  getAllReviewsByProduct,
  getAllReviewsByVendor,
  getAllReviewsByCustomer,
  getReview,
  updateReview,
  deleteReview,
};
