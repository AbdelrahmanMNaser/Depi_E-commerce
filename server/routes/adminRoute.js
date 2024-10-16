const express = require('express');
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getAllProducts 
} = require('../controllers/ProductController');
const { 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/OrderController');
const { 
  getAllUsers, 
  deleteUser 
} = require('../controllers/UserController'); // Assuming you have a UserController

const router = express.Router();
router.post('/products', protect, checkAdmin, createProduct);
router.put('/products/:id', protect, checkAdmin, updateProduct);
router.delete('/products/:id', protect, checkAdmin, deleteProduct);
router.get('/products', protect, checkAdmin, getAllProducts);
router.get('/orders', protect, checkAdmin, getAllOrders);
router.put('/orders/:id/status', protect, checkAdmin, updateOrderStatus); // Update order status
router.get('/users', protect, checkAdmin, getAllUsers);
router.delete('/users/:id', protect, checkAdmin, deleteUser); // Delete a user

module.exports = router;
