import axios from "axios";

const axiosClient = axios.create({
  // ĐẢM BẢO DÒNG NÀY PHẢI CÓ ĐẦY ĐỦ "http://localhost"
  baseURL: "http://localhost:3001",

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
