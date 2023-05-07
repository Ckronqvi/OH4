import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SalesListing from "./pages/listing/SalesListing";
import Register from "./pages/register/register";
import AddListing from "./pages/addListing/addListing"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/salesListing/:id" element={<SalesListing />} />
          <Route path="/addListing" element={<AddListing />} />
        </Routes>
      </div>
    </Router>
  );
}