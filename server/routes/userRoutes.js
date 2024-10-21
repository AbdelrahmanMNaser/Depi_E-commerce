const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  getAllVendors,
  getAllCustomers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/?role=vendor").get(getAllVendors);
router.route("/:id").get(getUser);
router.route("/").post(createUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
