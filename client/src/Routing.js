import React from 'react'
import Products from './pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarDemo from './components/NavbarDemo'

const Routing = () => {
  return (
    <BrowserRouter>
    <NavbarDemo />
      <Routes>
        <Route path='/products' element={<Products />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Routing