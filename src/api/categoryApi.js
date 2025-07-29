import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => {
    const url = "/categories";
    return axiosClient.get(url);
  },
  // Thêm các hàm add, update, remove tương tự productApi nếu cần
};

export default categoryApi;
