const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrder,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteAllOrders,
  deleteOrder,
  
} = require("../controllers/orderController");

router.route("/").get(getAllOrders);
router.route("/:id").get(getOrder);
router.route("/users/:id").get(getOrdersByUser);
router.route("/").post(createOrder);
router.route("/:id").put(updateOrder);
router.route("/").delete(deleteAllOrders);
router.route("/:id").delete(deleteOrder);

module.exports = router;