const express = require("express");
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  getProductByStatus 
} = require("../controllers/productController");

const checkAdmin = require("../middleware/authMiddleware");



router.post("/", checkAdmin, createProduct);
router.put("/:id", checkAdmin, updateProduct);
router.delete("/:id", checkAdmin, deleteProduct);
router.put("/:id/featured", checkAdmin, toggleFeatured);
router.get("/status/:status", checkAdmin, getProductByStatus);

module.exports = router;