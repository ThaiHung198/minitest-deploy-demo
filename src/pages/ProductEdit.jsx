// src/pages/ProductEdit.jsx (Nội dung đúng)

import React from "react";
import ProductForm from "../components/ProductForm";

const ProductEdit = () => {
  // Trang này chỉ cần render ProductForm là đủ.
  // Component ProductForm sẽ tự động lấy `id` từ URL và biết rằng nó đang ở chế độ "Sửa".
  return <ProductForm />;
};

export default ProductEdit;
