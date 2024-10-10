const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrder,
  getOrdersForUser,
  createOrder,
  updateOrder
} = require("../controllers/orderController");

router.route("/").get(getAllOrders);
router.route("/:id").get(getOrder);
router.route("/:id").get(getOrdersForUser);
router.route("/").post(createOrder);
router.route("/:id").put(updateOrder);

module.exports = router;