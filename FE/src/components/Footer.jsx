import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer id="footer" className="border-top py-5" style={{backgroundColor: 'var(--gray-color)'}}>
      <Container style={{ backgroundColor: 'rgba(0,0,0,0)'}}>
        <Row className="text-center text-md-start" style={{color: "white"}}>
          <Col md={3} xs={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Sản phẩm</h5>
            <ul className="list-unstyled">
              <li>Bánh ngọt</li>
              <li>Bánh kem</li>
              <li>Bánh xốp</li>
            </ul>
          </Col>
          <Col md={3} xs={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Công ty</h5>
            <ul className="list-unstyled">
              <li>Tuyển dụng</li>
              <li>Nhượng quyền</li>
              <li>Về Cakes</li>
            </ul>
          </Col>
          <Col md={3} xs={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Hỗ trợ</h5>
            <ul className="list-unstyled">
              <li>FAQs</li>
              <li>Bảo mật</li>
              <li>Đơn hàng</li>
            </ul>
          </Col>
          <Col md={3} xs={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Liên Hệ</h5>
            <ul className="list-unstyled">
              <li>Email góp ý</li>
              <li>Hotline</li>
              <li>0982983423</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;