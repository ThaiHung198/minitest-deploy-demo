// src/api/productApi.js - PHIÊN BẢN HOÀN CHỈNH VÀ CÓ DEBUG

import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    // Tạo một bản sao của params để không ảnh hưởng đến dữ liệu gốc
    const newParams = { ...params };

    // Kiểm tra nếu có tham số `q` (từ khóa tìm kiếm)
    if (newParams.q) {
      // Đổi nó thành `name_like` để tìm kiếm không phân biệt hoa/thường
      newParams.name_like = newParams.q;
      // Xóa tham số `q` cũ đi để tránh xung đột
      delete newParams.q;
    }

    // LOG ĐỂ DEBUG: Xem chính xác các tham số cuối cùng được gửi đến server
    console.log("Gửi đi request với params đã biến đổi:", newParams);

    const url = "/products";
    // Gửi đi các tham số đã được chỉnh sửa
    return axiosClient.get(url, { params: newParams });
  },

  getById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },

  remove: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
