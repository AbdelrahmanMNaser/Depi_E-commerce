import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../components/CheckoutSummary";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    city: "",
    street: "",
    paymentMethod: "CreditCard",
    cardType: "",
  });

  const { productDetails } = useSelector((state) => state.cart);

  const cartTotal =
    productDetails?.length > 0
      ? productDetails.reduce(
          (acc, item) => acc + (item.unitPrice || 0) * (item.quantity || 0),
          0
        )
      : 0;

  useEffect(() => {
    if (!productDetails?.length) {
      navigate("/cart");
    }
  }, [productDetails, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = {
        items: productDetails,
        total: cartTotal,
        shippingAddress: {
          street: userInfo.street,
          city: userInfo.city,
        },
        paymentMethod: userInfo.paymentMethod,
        cardType: userInfo.cardType,
      };

      // Clear cart first
      await dispatch(deleteCart()).unwrap();

      // Reset form
      setUserInfo({
        city: "",
        street: "",
        paymentMethod: "CreditCard",
        cardType: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="checkout-page min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <form
            onSubmit={handleSubmit}
            className="flex-grow bg-white p-6 shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Shipping Address
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={userInfo.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your street address"
                  required
                />
              </div>

              <div className="payment-method">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Credit Card", "PayPal", "Cash On Delivery"].map(
                    (method) => (
                      <label
                        key={method}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          userInfo.paymentMethod === method
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={userInfo.paymentMethod === method}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700">{method}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {userInfo.paymentMethod === "CreditCard" && (
                <div className="card-types">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Card Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["Visa", "MasterCard"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                          userInfo.cardType === type
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="cardType"
                          value={type}
                          checked={userInfo.cardType === type}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                  transition-colors font-medium"
              >
                Complete Order
              </button>
            </div>
          </form>

          <CheckoutSummary
            productDetails={productDetails}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
