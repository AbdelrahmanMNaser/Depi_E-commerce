import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductInfo from "../components/ProductInfo";
import ProductFeatures from "../components/ProductFeatures";
import ProductSimilar from "../components/ProductSimilar";
import Reviews from "../components/Reviews";

import { fetchProductById } from "../redux/slices/ProductSlice";
import { fetchReviewsByProduct } from "../redux/slices/ReviewSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products = [], status: productStatus } = useSelector((state) => state.products);
  const reviews = useSelector((state) => state.reviews.reviews);
  const reviewStatus = useSelector((state) => state.reviews.status);

  const productId = localStorage.getItem('visitedProduct');

  useEffect(() => {
    if (productId && productStatus === 'idle') {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, productStatus]);

  useEffect(() => {
    if (reviewStatus === 'idle' && productId) {
      dispatch(fetchReviewsByProduct(productId));
    }
  }, [dispatch, productId, reviewStatus]);

  const product = products.find((product) => product._id === productId);

  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductInfo product={product} />
      <ProductFeatures product={product} />
      <ProductSimilar productId={productId} />
      <Reviews reviews={reviews}  />
    </div>
  );
};

export default ProductDetails;