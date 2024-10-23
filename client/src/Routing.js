import React from 'react'
import Products from './pages/Products'
import { Route, Routes } from 'react-router-dom'
import CartPage from './components/CartPage';

const Routing = () => {
  return (
    
    <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/:CategoryName' element={<Products />} />
         {/* Add CartPage Route */}
        <Route path='/cart' element={<CartPage />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} /> */}
    </Routes>


  )
}

export default Routing