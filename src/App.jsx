import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
// import CategoryList from './pages/CategoryList'; // Bỏ comment khi đã tạo
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />

        {/* <Route path="/categories" element={<CategoryList />} /> */}
        {/* Thêm các route cho thêm/sửa category ở đây */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
