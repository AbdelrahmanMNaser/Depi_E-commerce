const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");



// @desc    Create an order
const createOrder = async (req, res, next) => {
  try {
    const { id } = req.body;
    const cart = await cartModel.findOne({ userId: id });
    const order = new orderModel({
      userId: id,
      productList: cart.productList,
      totalPrice: cart.totalPrice,
      totalPriceAfterTax: cart.totalPriceAfterTax,
    });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders by user ID
const getOrdersForUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await orderModel.find({ userId: id });
    res.status(200).json({ message: "Orders found", orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ message: "All orders", orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get an order by ID
const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an order by ID
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findByIdAndUpdate(id, req.body);
    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrdersForUser,
  getAllOrders,
  getOrder,
  updateOrder,
};
