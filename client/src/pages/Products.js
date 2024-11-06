import React, { useEffect, useState } from "react";
import { useParams, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsByKeyword,
} from "../redux/slices/ProductSlice";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import Filter from "../components/Filter";

function Products() {
  const dispatch = useDispatch();
  const {
    products = [],
    status,
    error,
  } = useSelector((state) => state.products);
  
  const filters = useSelector((state) => state.products.filters); // Get filters from Redux
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility

  const { CategoryName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const categories = useSelector((state) => state.categories.categories);

  const category = Array.isArray(categories)
    ? categories.find((category) => category.name === CategoryName)
    : null;

  const categoryId = category?._id;

  useEffect(() => {
    if (keyword) {
      dispatch(fetchProductsByKeyword(keyword));
    } else if (categoryId) {    

      dispatch(fetchProductsByCategory(categoryId));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, categoryId, keyword]);

  useEffect(() => {
    if (status === "succeeded") {
      const filtered = products.filter((product) =>
        Object.keys(filters).every((key) => {
          if (!filters[key] || filters[key].length === 0) return true; // Skip empty filters

          if (key === "unitPrice") {
            return (
              product.unitPrice >= filters[key][0] &&
              product.unitPrice <= filters[key][1]
            );
          } else if (
            ["category", "subCategory", "brand", "vendor"].includes(key)
          ) {
            return filters[key].includes(product[key]?.name);
          } else {
            return Array.isArray(product[key])
              ? product[key].some((item) => filters[key].includes(item))
              : filters[key].includes(product[key]);
          }
        })
      );
      setFilteredProducts(filtered);
    }
  }, [products, filters, status]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="container flex flex-col sm:flex-row">
      <div className="sm:w-1/4 p-4">
        <div className="sm:hidden">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={toggleFilter}
          >
            Filter
          </button>
          {showFilter && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
              <div className="fixed inset-0 bg-white p-4 z-50 overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-black"
                  onClick={toggleFilter}
                >
                  Close
                </button>
                <Filter categoryId={categoryId} />
              </div>
            </>
          )}
        </div>
        <div className="hidden sm:block">
          <Filter categoryId={categoryId} />
        </div>
      </div>
      <div className="w-full p-4">
        {status === "loading" && <Loading />}
        {status === "failed" && <div className="text-red-500">{error}</div>}
        {status === "succeeded" && (
          <div className="flex flex-wrap m-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;