import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({
    city: '',
    street: '',
    paymentMethod: 'CreditCard', // Default payment method
    cardType: '', // Track the selected card type
  });

  const cartItems = useSelector((state) => state.cart.productsList);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="checkout-page max-w-1xl mx-auto p-3 bg-gray-100">
      <div className="flex justify-between gap-6">
        {/* Shipping Address Form */}
        <form onSubmit={handleSubmit} className="checkout-form bg-white p-4 shadow-md rounded-md w-2/3">
          <h2 className="text-4xl font-bold mb-4">Shipping Address</h2>

          <input
            type="text"
            name="street"
            value={userInfo.street}
            onChange={handleInputChange}
            className="border p-3 w-full mb-4 rounded-md text-lg"
            placeholder="Enter your street address"
            required
          />

          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleInputChange}
            className="border p-3 w-full mb-6 rounded-md text-lg"
            placeholder="Enter your city"
            required
          />

          <div className="mb-4">
            <label className="block text-sm mb-2">Payment Method</label>
            <div className="flex space-x-9">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CreditCard"
                  checked={userInfo.paymentMethod === 'CreditCard'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Credit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={userInfo.paymentMethod === 'PayPal'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                PayPal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={userInfo.paymentMethod === 'CashOnDelivery'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* Conditionally render card type options if Credit Card is selected */}
          {userInfo.paymentMethod === 'CreditCard' && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Card Type</label>
              <div className="flex space-x-9">
                <label className={`flex items-center ${userInfo.cardType === 'Visa' ? 'border-2 border-blue-500 p-2 rounded' : ''}`}>
                  <input
                    type="radio"
                    name="cardType"
                    value="Visa"
                    checked={userInfo.cardType === 'Visa'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <img src="https://sa.visamiddleeast.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-6 mr-2" /> Visa
                </label>
                <label className={`flex items-center ${userInfo.cardType === 'MasterCard' ? 'border-2 border-red-500 p-2 rounded' : ''}`}>
                  <input
                    type="radio"
                    name="cardType"
                    value="MasterCard"
                    checked={userInfo.cardType === 'MasterCard'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/772px-Mastercard-logo.svg.png" alt="MasterCard" className="h-6 mr-2" /> MasterCard
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">
            Submit Order
          </button>
        </form>

        {/* Order Summary Section */}
        <div className="order-summary bg-white p-4 shadow-md rounded-md w-2/5">
          <h2 className="text-2xl font-bold text-right">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-1 border-b">
              <div>{item.name} (x{item.quantity})</div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="text-right text-xl font-bold mt-2">Total: ${cartTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;