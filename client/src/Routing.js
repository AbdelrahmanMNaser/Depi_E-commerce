import React from "react";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CheckoutPage from "./pages/Checkout";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:ProductName" element={<ProductDetails />} />
      <Route path="/search" element={<Products />} />
      <Route path="/:CategoryName" element={<Products />} />
      <Route path="/:SubCategoryName" element={<Products />} />
      <Route path="/Sign-up" element={<Signup />} />
      <Route path="/Log-in" element={<LoginPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Routing;
