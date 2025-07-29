// src/components/Header.jsx

import React from "react";
// 1. Import các component cần thiết từ thư viện
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    // 2. Dùng Navbar làm khung chính, với màu tối và bung ra trên màn hình lớn (lg)
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* 3. Dùng Container fluid để nội dung trải dài full màn hình */}
      <Container fluid>
        {/* 4. Tên/Logo của trang web */}
        <Navbar.Brand href="/">Quản lý</Navbar.Brand>

        {/* 5. Nút "hamburger" sẽ hiện ra trên màn hình nhỏ */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* 6. Nội dung sẽ được ẩn vào trong nút "hamburger" trên màn hình nhỏ */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* 7. Các link điều hướng */}
          <Nav className="me-auto">
            {/* 
              8. Dùng `as={NavLink}` để kết hợp sức mạnh của React Bootstrap và React Router.
                 - Nó tạo ra một link điều hướng đúng chuẩn của Single-Page App (không tải lại trang).
                 - Nó sẽ tự động thêm class "active" vào link khi bạn đang ở trang đó.
            */}
            <Nav.Link as={NavLink} to="/products">
              Sản phẩm
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories">
              Danh mục
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// 9. Export component để các file khác (như App.jsx) có thể sử dụng
export default Header;
