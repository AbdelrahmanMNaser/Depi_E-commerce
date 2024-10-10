const express = require('express');
const router = express.Router();

const {
  createCart,
  getCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} = require('../controllers/cartController');

router.route('/').post(createCart);
router.route('/:id').get(getCart);
router.route('/:id').put(addProductToCart);
router.route('/:id').patch(updateProductInCart);
router.route('/:id').delete(deleteProductFromCart);
router.route('/:id').delete(deleteAllProductsFromCart);

module.exports = router;