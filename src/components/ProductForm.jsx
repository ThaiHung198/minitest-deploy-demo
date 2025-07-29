import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../api/productApi";
import categoryApi from "../api/categoryApi";
import toast from "react-hot-toast";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL nếu là trang edit

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();

    // Nếu có id, đây là trang edit, fetch dữ liệu sản phẩm
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await productApi.getById(id);
          setProduct(response.data);
        } catch (error) {
          console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
          toast.error("Không tìm thấy sản phẩm!");
          navigate("/products");
        }
      };
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Cập nhật sản phẩm
        await productApi.update(id, {
          ...product,
          price: Number(product.price),
        });
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        // Thêm sản phẩm mới
        await productApi.add({ ...product, price: Number(product.price) });
        toast.success("Thêm sản phẩm thành công!");
      }
      navigate("/products");
    } catch (error) {
      console.error("Lỗi khi thêm/sửa sản phẩm:", error);
      toast.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2>{id ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL Hình ảnh</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Lưu thay đổi" : "Thêm mới"}
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
