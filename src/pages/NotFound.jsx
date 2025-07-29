import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1>404 - Not Found</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
};

export default NotFound;
