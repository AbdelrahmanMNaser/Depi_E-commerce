import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  fetchAllProducts,
  fetchProductById,
} from "../redux/slices/ProductSlice";
import { fetchReviewsByProduct } from "../redux/slices/ReviewSlice";

import ProductInfo from "../components/ProductInfo";
import ProductFeatures from "../components/ProductFeatures";
import ProductSimilar from "../components/ProductSimilar";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    products = [],
  } = useSelector((state) => state.products);
  const { ProductName } = useParams();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const product = products.find((product) => product.title === ProductName);

  useEffect(() => {
    if (product) {
      dispatch(fetchProductById(product._id));
    }
  }, [dispatch, product]);

  const {
    reviews = [],
    reviewsStatus,
    reviewsError,
  } = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (product) {
      dispatch(fetchReviewsByProduct(product._id));
    }
  }, [dispatch, product]);

  console.log("reviews", reviews);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <ProductInfo product={product} />
      <ProductFeatures product={product} />
      <Reviews reviews={reviews} />
      <ProductSimilar />
    </>
  );
};
export default ProductDetails;
