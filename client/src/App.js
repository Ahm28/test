import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
