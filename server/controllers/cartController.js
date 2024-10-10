const cartModel = require("../models/cartModel");

// Helper function to add or update quantity
const addQuantityToProduct = (product, quantity, isUpdate) => {
  if (isUpdate) {
    product.quantity = quantity;
  } else {
    product.quantity += quantity;
  }
};

// @desc    Create a cart , ttl expire in 3 days
const createCart = async (req, res, next) => {
  try {
    const cart = new cartModel(req.body);
    await cart.save().then(() => {
      cartModel.collection.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 60 * 60 * 24 * 3 }
      );
    });
    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Get cart by user ID
const getCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findOne({ userID: id }).populate({
      path: "productList.product",
      select: "title unitPrice -_id",
      options: { strictPopulate: false }
    });
    res.status(200).json({ message: "Cart found", cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to cart
const addProductToCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productID, quantity } = req.body;
    const cart = await cartModel.findOne({ userID: id });
    const product = cart.productList.find(
      (product) => product.product == productID
    );
    if (product) {
      addQuantityToProduct(product, quantity, false);
    } else {
      cart.productList.push({ product: productID, quantity: quantity });
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product in cart
const updateProductInCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productID, quantity } = req.body;
    const cart = await cartModel.findOne({ userID: id });
    const product = cart.productList.find(
      (product) => product.product == productID
    );
    if (product) {
      addQuantityToProduct(product, quantity, true);
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Product updated in cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product from cart
const deleteProductFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productID } = req.body;
    const cart = await cartModel.findOne({ userID: id });
    cart.productList = cart.productList.filter(
      (product) => product.product != productID
    );
    if (cart.productList.length === 0) {
      await cartModel.deleteOne({ userID: id });
      res.status(200).json({ message: "Cart deleted successfully" });
    } else {
      await cart.save();
      res
        .status(200)
        .json({ message: "Product deleted from cart successfully", cart });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all products from cart
const deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findOne({ userID: id });
    cart.productList = [];
    await cartModel.deleteOne({ userID: id });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
};