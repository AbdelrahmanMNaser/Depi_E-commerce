import React from 'react';

const CartSummary = ({ totalPrice, totalItems, onCheckout }) => {
  return (
    <div className="w-full lg:w-1/4 p-4 bg-gray-100 shadow-md rounded-lg ml-4">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="text-lg font-bold mb-2">Total Items: {totalItems}</div>
      <div className="text-lg font-bold mb-2">Total Price: {totalPrice} $</div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4"
        onClick={onCheckout} 
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
