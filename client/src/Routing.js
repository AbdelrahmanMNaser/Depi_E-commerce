import React from 'react'
import Products from './pages/Products'
import Home from './pages/homePage'
import { Route, Routes } from 'react-router-dom'


const Routing = () => {
  return (
    
    <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/:CategoryName' element={<Products />} />
        <Route path="/" element={<Home />} />

        {/* <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} /> */}
    </Routes>


  )
}

export default Routing