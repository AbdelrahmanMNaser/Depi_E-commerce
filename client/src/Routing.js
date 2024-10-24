import React from 'react'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails';
import { Route, Routes } from 'react-router-dom'
import CartPage from './components/CartPage';
import Signup from './pages/Signup';
import LoginPage from './pages/Login';

const Routing = () => {
  return (
    
    <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/products/:ProductName' element={<ProductDetails />} />
        <Route path='/search' element={<Products />} />
        <Route path='/:CategoryName' element={<Products />} />
        <Route path='/:SubCategoryName' element={<Products />} />
        <Route path='/Sign-up' element={<Signup />} />
        <Route path='/Log-in' element={<LoginPage />} />
        <Route path='/cart' element={<CartPage />} />
    </Routes>


  )
}

export default Routing