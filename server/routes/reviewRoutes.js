const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

router.route("/").get(getAllReviews);
router.route("/:id").get(getReview);
router.route("/").post(createReview);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

module.exports = router;