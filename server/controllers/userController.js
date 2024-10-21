const userModel = require("../models/userModel");

/* <---------------------------- POST APIs --------------------------> */


// @desc    Create a user
const createUser = async (req, res, next) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};


/* <---------------------------- GET APIs --------------------------> */

// @desc    Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all vendors (using role)
const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await userModel.find({ role: "vendor" });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all customers (using role)
const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await userModel.find({ role: "customer" });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};


// @desc    Get a user by ID
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update a user by ID
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// @desc    Delete a user by ID
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createUser,
  getAllUsers,
  getAllVendors,
  getAllCustomers,
  getUser,
  updateUser,
  deleteUser,
};
