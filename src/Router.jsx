import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth"
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Order";
import Cart  from '/src/pages/Cart/Cart.jsx';
import Results from "./pages/Results/Results"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from "./components/protected route/ProtectedRoute"
const stripePromise = loadStripe('pk_test_51RyyDF5RtzVrbD9TVR1ZOnN8PjlDCTog4w4VLAFLUX7s1tEQEthA2jGOMGt2sgLmQkBSi6UMUEcci8V9KgLla5mF0049OB0bZr');


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={
          <ProtectedRoute msg={"you must log in to pay"} redirect={"/payment"}>
      
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>

          </ProtectedRoute>

          
          
          } />
        <Route path="/orders" element={
          <ProtectedRoute msg={"you must log in to access your orders"} redirect={"/orders"}> 
            <Orders />
          </ProtectedRoute>
          
          
         } />
        <Route path="/category/:categoryName" element={<Results/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route  path="/products/:productId" element={<ProductDetail/>}/>
        
      </Routes>
    </Router>
  );
}

export default Routing;
