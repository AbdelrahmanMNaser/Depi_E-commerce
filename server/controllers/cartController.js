const Cart = require("../models/cartModel");

// Helper function to add or update quantity
const addQuantityToProduct = (product, quantity, isUpdate) => {
  if (isUpdate) {
    product.quantity = quantity;
  } else {
    product.quantity += quantity;
  }
};

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create a cart , ttl expire in 3 days
const createCart = async (req, res, next) => {
  try {
    const cart = new Cart(req.body);
    await cart.save().then(() => {
      Cart.collection.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 60 * 60 * 24 * 3 }
      );
    });
    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    next(error);
  }
};

/* <--------------------------- GET APIs --------------------------> */

// @desc    Get cart by user ID
const getCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate({
      path: "productList.product",
      populate: [
        {
          path: "category",
          select: "name",
        },
        {
          path: "brand",
          select: "name",
        },
      ],
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
    const { productID, quantity, unitPrice } = req.body;
    const cart = await Cart.findById(id);
    console.log("productID: ", productID);

    const product = cart.productList.find(
      (product) => product.product.toString() === productID.toString()
    );

    console.log("check: ", product);

    if (product) {
      console.log("repetitive");
      res.status(400).json({ message: "Product already exists in cart" });
    }
    cart.productList.push({
      product: productID,
      quantity: quantity,
      unitPrice: unitPrice,
    });
    await Cart.findByIdAndUpdate(id, cart);

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

/* <--------------------------- PUT APIs --------------------------> */

// @desc    Update product in cart
const updateProductInCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productID, quantity } = req.body;
    const cart = await Cart.findOne({ userID: id });
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

/* <--------------------------- DELETE APIs --------------------------> */

// @desc    Delete product from cart
const deleteProductFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productID } = req.body;
    const cart = await Cart.findOne({ userID: id });
    cart.productList = cart.productList.filter(
      (product) => product.product != productID
    );
    if (cart.productList.length === 0) {
      await Cart.deleteOne({ userID: id });
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
const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    cart.productList = [];
    await Cart.deleteOne({ userID: id });
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
  deleteCart,
};
