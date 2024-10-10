const express = require("express");

const router = express.Router();


const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");


router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;