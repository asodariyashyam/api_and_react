import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import SignIn from "../pages/SignIn";
import AddProduct from "../pages/Product/AddProduct";
import FetcheData from "../pages/Product/FetcheData";
import AddToCart from "../pages/Buyre/AddToCart";
import BuyerProduct from "../pages/Buyre/BuyerProduct";
import Details from "../pages/Details";
import TotalBey from "../pages/TotalBey";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/addproduct"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fetchedata"
        element={
          <ProtectedRoute>
            <FetcheData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addtocart/:cartData"
        element={
          <ProtectedRoute>
            <AddToCart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyerproduct"
        element={
          <ProtectedRoute>
            <BuyerProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />
      <Route
        path="/totalBey"
        element={
          <ProtectedRoute>
            <TotalBey />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
