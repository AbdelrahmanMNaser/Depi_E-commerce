import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products = [], status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [status, dispatch]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <div className="loader">Loading...</div>;
      case "succeeded":
        return (
          <div className="w-3/4 flex flex-wrap -m-2">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        );
      case "failed":
        return <div className="text-red-600">{error}</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Products;
