import React from 'react';
import { Link } from 'react-router-dom';

const MyCart = () => {
  return (
    <Link to="/cart" className="flex items-center text-black">
      <i className="fas fa-shopping-cart mr-2"></i> My Cart
    </Link>
  );
};

export default MyCart;