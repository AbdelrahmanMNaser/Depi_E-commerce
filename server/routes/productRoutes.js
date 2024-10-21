const express = require("express");

const router = express.Router();


const {
  getAllProducts,
  getProductsByVendor,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductsByCategory,
  deleteProductsByVendor,
} = require("../controllers/productController");


router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);
router.route("/vendor/:vendorId").get(getProductsByVendor);
router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);
router.route("/category/:categoryId").delete(deleteProductsByCategory);
router.route("/vendor/:vendorId").delete(deleteProductsByVendor);


module.exports = router;