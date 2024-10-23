const Product = require("../models/productModel");

const { getFilters } = require("../utils/filter");

const { sortByPrice, sortByBestSelling } = require("../utils/sort");

/* <---------------------------- POST APIs --------------------------> */

// @desc    Create a product
const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- GET APIs --------------------------> */

// @desc    Get all products
const getAllProducts = async (req, res, next) => {
  try {

    const filters = getFilters(req.query);

    // const sort = {
    //   ...sortByPrice(req.query),
    // };

    const products = await Product.find(filters)
      .populate([
        {
          path: "category",
          select: "name",
        },
        {
          path: "brand",
          select: "name",
        },
        {
          path: "vendor",
          select: "name",
        },
      ]);

    res.status(200).json({
      message: "All products",
      products: products,
      ProductCount: products.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const filters = getFilters(req.query);    

    const products = await Product.find({ category: categoryId, ...filters })
      .populate([
      {
        path: "category",
        select: "name",
      },
      {
        path: "brand",
        select: "name",
      },
      {
        path: "vendor",
        select: "name",
      },
      ]);
    ;

    res.status(200).json({
      message: `Products Found`,
      products: products,
      productCount: products.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get  products by vendor
const getProductsByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;

    const products = await Product.find({ vendor: vendorId });

    res.status(200).json({
      message: `Products Found`,
      products: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a product by ID
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
    .populate([
      {
        path: "category",
        select: "name",
      }
      ,{
        path: "brand",
        select: "name",
      },
      {
        path: "vendor",
        select: "name",
      }
    ]);
      
    res.status(200).json({ message: "Product found", product: product });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- PUT APIs --------------------------> */

// @desc    Update a product by ID
const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body);
    await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    next(error);
  }
};

/* <---------------------------- DELETE APIs --------------------------> */

// ================== Helper Function ==================
const checkOrdersForProducts = async (productIds) => {
  const orders = await Order.find({ product: { $in: productIds } });
  return orders.length > 0;
};

// @desc    Delete  products by category
const deleteProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    const productIds = products.map((product) => product._id);

    if (await checkOrdersForProducts(productIds)) {
      return res
        .status(400)
        .json({ message: "Cannot delete products with existing orders" });
    }

    await Product.deleteMany({ category: categoryId });
    res.json({ message: "Products deleted successfully", products: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  products by brand
const deleteProductsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brand: brandId });
    const productIds = products.map((product) => product._id);

    if (await checkOrdersForProducts(productIds)) {
      return res
        .status(400)
        .json({ message: "Cannot delete products with existing orders" });
    }

    await Product.deleteMany({ brand: brandId });
    res.json({ message: "Products deleted successfully", products: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete  products by vendor
const deleteProductsByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendor: vendorId });
    const productIds = products.map((product) => product._id);

    if (await checkOrdersForProducts(productIds)) {
      return res
        .status(400)
        .json({ message: "Cannot delete products with existing orders" });
    }

    await Product.deleteMany({ vendor: vendorId });
    res.json({ message: "Products deleted successfully", products: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product by ID
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (await checkOrdersForProducts([id])) {
      return res
        .status(400)
        .json({ message: "Cannot delete product with existing orders" });
    }

    const product = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", product: product });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByVendor,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProductsByCategory,
  deleteProductsByBrand,
  deleteProductsByVendor,
};
