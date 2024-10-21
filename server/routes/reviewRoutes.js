const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getAllReviewsByProduct,
  getAllReviewsByVendor,
  getAllReviewsByCustomer,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

router.route("/").get(getAllReviews);
router.route("/products/:productId").get(getAllReviewsByProduct);
router.route("/vendors/:id").get(getAllReviewsByVendor);
router.route("/customers/:id").get(getAllReviewsByCustomer);
router.route("/:id").get(getReview);
router.route("/").post(createReview);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

module.exports = router;