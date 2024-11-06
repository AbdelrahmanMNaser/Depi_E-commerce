const Order = require("../models/orderModel");
const Product = require("../models/productModel");

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create an order
const createOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();

    for (let product of order.productList) {
      await Product.findByIdAndUpdate(product.product, {
        $inc: { stock: -product.quantity },
      });
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- GET APIs --------------------------> */

// @desc    Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: "productList.product",
      populate: [
        {
          path: "category",
        },
        {
          path: "brand",
        },
        {
          path: "vendor",
          select: "name",
        },
      ],
    });
    res.status(200).json({ message: "All orders", orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders by user ID
const getOrdersByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ userId: id }).populate({
      path: "productList.product",
      select: "title unitPrice vendor category brand",
    });

    res.status(200).json({ message: "Orders found", orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders by status
const getOrdersByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const orders = await Order.find({
      status: status,
    });
    res.status(200).json({ message: "Orders found", orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get an order by ID
const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update an order by ID
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// @desc    Delete all orders
const deleteAllOrders = async (req, res, next) => {
  try {
    await Order.deleteMany({});
    res.json({ message: "All orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an order by ID
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  orders by user ID
const deleteOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await Order.deleteMany({ userId: userId });
    res.json({ message: "Orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  orders by vendor ID
const deleteOrdersByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    // Assuming vendorId is stored in userId field
    await Order.deleteMany({ "productList.vendor": vendorId });
    res.json({ message: "Orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  orders by product ID
const deleteOrdersByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Order.deleteMany({ "productList.product": productId });
    res.json({ message: "Orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  orders by category ID
const deleteOrdersByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await Order.deleteMany({ "productList.category": categoryId });
    res.json({ message: "Orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  orders by brand ID
const deleteOrdersByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;

    await Order.deleteMany({ "productList.brand": brandId });
    res.json({ message: "Orders deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrdersByStatus,
  getOrder,
  updateOrder,
  deleteAllOrders,
  deleteOrder,
  deleteOrdersByUser,
  deleteOrdersByVendor,
  deleteOrdersByProduct,
  deleteOrdersByCategory,
  deleteOrdersByBrand,
};
