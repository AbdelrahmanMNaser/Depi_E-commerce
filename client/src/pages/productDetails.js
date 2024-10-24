import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FeaturesComponent from './../components/ProductFeatures';
import ProductDetailsHead from './../components/ProductDetailsHead';
import ProductList from './../components/ProductList';
import Reviews from './../components/Reviews';

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state? location.state : {
    name: 'Product Name',
    price: '$69',
    rating: 4.9,
    reviewCount: 234,
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-quick-preview-02-detail.jpg',
    imageAlt: 'Image Alt Text',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return(
    <>
        <ProductDetailsHead product =  {product}/>
        <FeaturesComponent />
        <Reviews />
        <ProductList />
        </>
  )
}
export default ProductDetails;