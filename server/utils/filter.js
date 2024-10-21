// Function to filter by name
const filterByName = (query) => {
  if (query.name) {
    return { title: { $regex: query.name, $options: "i" } };
  }
  return {};
};

// Function to filter by brand ID
const filterByBrand = (query) => {
  if (query.brand) {
    return { brand: query.brand };
  }
  return {};
};

// Function to filter by vendor ID
const filterByVendor = (query) => {
  if (query.vendor) {
    return { vendor: query.vendor };
  }
  return {};
};

// Function to filter by price range
const filterByPriceRange = (query) => {
  if (query.minPrice && query.maxPrice) {
    // Convert minPrice and maxPrice to numbers
    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      return { unitPrice: { $gte: minPrice, $lte: maxPrice } };
    } else {
      console.error("minPrice and maxPrice should be valid numbers");
    }
  }

  return {};
};

// Function to filter by category
const filterByCategory = (query) => {
  if (query.category) {
    return { category: query.category };
  }
  return {};
};

// Function to filter by subcategory
const filterBySubcategory = (query) => {
  if (query.sub_category) {
    return { sub_category: query.sub_category };
  }
  return {};
};

// Function to filter by available colors
const filterByColor = (query) => {
  if (query.color) {
    return { colorList: { $in: [query.color] } };
  }
  return {};
};

// Function to filter by availabile sizes
const filterBySize = (query) => {
  if (query.size) {
    return { size: query.size };
  }
  return {};
};

// Function to return the filters
const getFilters = (query) => {
  return {
    ...filterByName(query),
    ...filterByBrand(query),
    ...filterByVendor(query),
    ...filterByCategory(query),
    ...filterBySubcategory(query),
    ...filterByPriceRange(query),
    ...filterByColor(query),
    ...filterBySize(query),
  };
};

// export
module.exports = {
  getFilters,
};
