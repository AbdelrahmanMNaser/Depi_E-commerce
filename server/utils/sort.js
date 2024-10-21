// Fenction to set the sort

/* const setSort = (query) => {
  if (query.sort_by) {
    return { [query.sort_by]: query.sort_order || "asc" };
  }
  return {};
} */

// Function to sort products by price
const sortByPrice = (products, sort) => {
  if (sort.price) {
    return products.sort((a, b) => {
      return sort.price === "asc" ? a.price - b.price : b.price - a.price;
    });
  }
  return products;
};

// Function to sort products by best selling
const sortByBestSelling = async (Order) => {
  const orders = await Order.aggregate([
    { $unwind: "$productList" },
    { $group: { _id: "$productList.product", count: { $sum: "$productList.quantity" } } },
    { $sort: { count: -1 } }
  ]);

  const sortedProductIds = orders.map(order => order._id);
  return sortedProductIds;
};


setSort = (query) => {
  if (query.sort_by) {
    return { [query.sort_by]: query.sort_order || "asc" };
  }
  return {};
}



module.exports = {
  setSort,
  sortByPrice,
  sortByBestSelling
};