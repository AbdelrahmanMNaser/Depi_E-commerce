import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductInfo from "../components/ProductInfo";
import ProductFeatures from "../components/ProductFeatures";
import ProductSimilar from "../components/ProductSimilar";
import Reviews from "../components/Reviews";

import { fetchProductById } from "../redux/slices/ProductSlice";
import { fetchReviewsByProduct } from "../redux/slices/ReviewSlice";
import Loading from './../components/Loading';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, status: productStatus } = useSelector((state) => state.products);
  const productId = localStorage.getItem('visitedProduct');
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProduct(productId));
    }
  }, [dispatch, productId]);  


  if (productStatus === 'loading') {
    return <Loading />;
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