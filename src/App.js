import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Components//Home"
import Navbar from './Components/UI/Navbar'
import Login from './Components/Login'
import CustomerReg from './Components/CustomerReg'
import ProductPage from './Components/products/ProductPage'
import Checkout from './Components/Checkout'
import SellerReg from './Components/SellerReg'
import SuccessfulOrder from './Components/UI/SuccessfulOrder'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerReg />} />
        <Route path="/product/:productID" element={<ProductPage />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/newseller" element={<SellerReg />} />
        <Route path="/sucessfulorder" element={<SuccessfulOrder />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
