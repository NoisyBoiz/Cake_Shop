import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { addToCart } from "../services/carts.js"
import { useNotification } from '../components/Notification';

const ProductItem = ({ cake }) => {
  const min = 1;
  const max = 10;
  const [quantity, setQuantity] = useState(min);
  const [indexSize, setIndexSize] = useState(0);
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    const data = {
      id_cake: cake.id,
      id_size: cake.Sizes[indexSize].id,
      quantity,
    };
    addToCart(data).then(res => {
      if (res && res.status === 200) {
        showNotification({
          title: "Thông báo",
          message: "Thêm vào giỏ hàng thành công!",
          type: "success"
        });
      }
    }).catch((err) => {
      if (err?.response?.status == '401') {
        showNotification({
          title: "Thông báo",
          message: "Vui lòng đăng nhập để thực hiện chức năng này!",
          handleAccept: () => { window.location.href = "/login" },
          handleCancel: () => {},
          titleAccept: "Đăng nhập",
          titleCancel: "Đóng",
          type: "warning"
        });
      }
      else {
        showNotification({
          title: "Lỗi",
          message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
          type: "error"
        });
      }
    })
  }

  const updateQuantity = (newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < min) {
      newQuantity = min;
    } else if (newQuantity > max) {
      newQuantity = max;
    }
    setQuantity(newQuantity);
  };

  return (
    <Card
      className="mb-4 border-0 rounded-4 product-card h-100"
      style={{
        boxShadow: "0 0 00.6rem 0 rgba(0,0,0,0.2)"
      }}
    >
      {/* Ảnh sản phẩm */}
      <div className="d-flex justify-content-center align-items-center pt-3">
        <Card.Img
          variant="top"
          src={cake?.Images[0]?.path}
          alt={cake.name}
          className="rounded-3"
          style={{
            height: '200px',
            width: "90%",
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Tên bánh */}
        <Card.Title className="fw-semibold text-center text-dark mb-2">
          {cake.name}
        </Card.Title>

        <Card.Text className="cake-description" style={{ margin: "0 0 0.5rem 0" }}>
          {cake.description}
        </Card.Text>

        <div className="mt-auto">
          <span className="py-0 fw-bold" style={{ color: "var(--primary-color)" }}>
            {(cake?.Sizes[indexSize].origin_price * (1 - (cake?.Sizes[indexSize].discount || 0))).toLocaleString()} VND
          </span>
          {cake?.Sizes[indexSize].origin_price !== null && (
            <span
              text="dark"
              className="me-2 text-decoration-line-through px-2 py-1"
              style={{ fontSize: '0.9rem' }}
            >
              {cake?.Sizes[indexSize].origin_price.toLocaleString()} VND
            </span>
          )}
        </div>

        {/* Kích thước */}
        <div className="mb-2">
          <div className="fw-semibold mb-2">Kích thước</div>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {cake?.Sizes.map((size, i) => (
              <button
                key={i} className={`button-size ${indexSize === i ? "active" : ""}`}
                onClick={() => setIndexSize(i)}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        {/* Số lượng */}
        <div className="mb-2">
          <div className="fw-semibold mb-2">Số lượng</div>
          <div className="quantity-group mx-auto">
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= min}
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              min={min}
              max={max}
              onChange={(e) => updateQuantity(parseInt(e.target.value))}
              className="quantity-input text-center"
            />

            <button
              className="quantity-btn"
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= max}
            >
              +
            </button>
          </div>
        </div>


        {/* Nút thêm giỏ hàng */}
        <button
          className="w-100 fw-bold mt-1 button-add-cart"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
