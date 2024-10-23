import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProductsState,
  fetchAllProducts,
  fetchProductsByCategory,
} from "../redux/slices/ProductSlice";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Products() {
  const dispatch = useDispatch();
  const {
    products = [],
    status,
    error,
  } = useSelector((state) => state.products);

  const { CategoryName } = useParams(); // Get category name from URL
  const categories = useSelector((state) => state.categories.categories); // Get categories from state
  

  // Ensure categories is an array before using .find
  const category = Array.isArray(categories)
    ? categories.find((category) => category.name === CategoryName)
    : null; // Use case-insensitive comparison

  const categoryId = category ? category._id : null; // Get the ID if found

  useEffect(() => {
    dispatch(resetProductsState()); // Clear current product
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId)); // Fetch by category ID
    } else {
      dispatch(fetchAllProducts()); // Fetch all products if no category is found
    }
  }, [dispatch, categoryId]); 

  return (
    <div className="container mx-auto p-4">
      {status === "loading" && <Loading />}
      {status === "failed" && <div className="text-red-500">{error}</div>}
      {status === "succeeded" && (
        <div className="w-3/4 flex flex-wrap -m-2">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
