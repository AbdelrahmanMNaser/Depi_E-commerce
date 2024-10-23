import React, { useState } from 'react';
import CartProductList from './CartProductList';
import CartSummary from './CartSummary';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 50, quantity: 1, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Product 2', price: 30, quantity: 2, image: '/path/to/image2.jpg' },
  ]);

  const handleAdd = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const handleRemove = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  const handleRemoveCompletely = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    // Handle checkout logic here, e.g., navigate to the checkout page
    console.log('Proceeding to checkout...');
  };

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row">
      <CartProductList
        cartItems={cartItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onRemoveCompletely={handleRemoveCompletely}
      />
      <CartSummary 
        totalPrice={totalPrice} 
        totalItems={totalItems} 
        onCheckout={handleCheckout} 
      />
    </div>
  );
};

export default CartPage;
