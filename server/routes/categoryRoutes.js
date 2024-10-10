const express = require("express");
const router = express.Router();


const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");


router.route("/").get(getAllCategories);
router.route("/:id").get(getCategory);
router.route("/").post(createCategory);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;