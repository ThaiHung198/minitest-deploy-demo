// src/pages/ProductList.jsx - PHIÊN BẢN CHUẨN CHO "CÁCH 2" (CÓ NÚT BẤM)

import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Pagination,
  InputGroup,
  FormControl,
  Row,
  Col,
  Form, // Đảm bảo đã import Form
} from "react-bootstrap";
import { Link } from "react-router-dom";
import productApi from "../api/productApi";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState({ by: "id", order: "asc" });

  // State lưu giá trị đang gõ trong ô input
  const [searchTerm, setSearchTerm] = useState("");

  // State chỉ lưu giá trị SAU KHI nhấn nút "Tìm kiếm"
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const PRODUCTS_PER_PAGE = 5;

  // HÀM GỌI API - MẮT XÍCH QUAN TRỌNG
  const fetchProducts = useCallback(async () => {
    try {
      const params = {
        _page: page,
        _limit: PRODUCTS_PER_PAGE,
        _sort: sort.by,
        _order: sort.order,
        // Phải dùng `activeSearchTerm` ở đây
        q: activeSearchTerm,
      };
      console.log("Đang gọi API với params:", params);
      const response = await productApi.getAll(params);
      const totalCount = Number(response.headers["x-total-count"]) || 0;
      setProducts(response.data);
      setTotalPages(Math.ceil(totalCount / PRODUCTS_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Không thể tải danh sách sản phẩm!");
    }
    // `useEffect` phải theo dõi `activeSearchTerm`
  }, [page, sort, activeSearchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await productApi.remove(id);
        toast.success("Xóa sản phẩm thành công!");
        if (products.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchProducts();
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        toast.error("Xóa sản phẩm thất bại!");
      }
    }
  };

  const handleSort = (column) => {
    setSort((prevSort) => ({
      by: column,
      order:
        prevSort.by === column && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  // HÀM SUBMIT FORM - MẮT XÍCH QUAN TRỌNG
  const handleSearchSubmit = (e) => {
    console.log("Nút đã được nhấn! Sẽ tìm kiếm với từ khóa:", searchTerm);
    e.preventDefault(); // Ngăn trang tải lại
    setActiveSearchTerm(searchTerm);
    setPage(1);
  };

  return (
    <div className="container-fluid mt-4">
      <h2>Quản lý sản phẩm</h2>
      <Link to="/products/add" className="btn btn-primary mb-3">
        Thêm sản phẩm mới
      </Link>

      <Row className="mb-3">
        <Col md={6}>
          {/* KHUNG TÌM KIẾM - MẮT XÍCH QUAN TRỌNG */}
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <FormControl
                placeholder="Tìm kiếm theo tên hoặc id..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Tìm kiếm
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        {/* ... nội dung bảng không đổi ... */}
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              ID {sort.by === "id" && (sort.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Tên sản phẩm{" "}
              {sort.by === "name" && (sort.order === "asc" ? "▲" : "▼")}
            </th>
            <th>Hình ảnh</th>
            <th
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
            >
              Giá {sort.by === "price" && (sort.order === "asc" ? "▲" : "▼")}
            </th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <img src={product.image} alt={product.name} width="100" />
                </td>
                <td>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </td>
                <td>
                  <Link
                    to={`/products/edit/${product.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Sửa
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không tìm thấy sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === page}
              onClick={() => setPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default ProductList;
