import React, { Fragment } from 'react'
import '../assets/styles/payment.css';
import { useState } from "react";
import  { createTotalBill } from "../services/bill";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Notification from './notication';
import Load from './Load';


const notication = new Notification();

const Payment = () => {

  const [user, setUser] = useState(null);
  const [send, setSend] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if(user === null) {
      notication.warning({
        title: "Thông báo",
        message: "Vui lòng đăng nhập để thực hiện mua hàng!",
        handleAccept: () => {window.location.href = "/login"},
        handleCancel: () => {window.location.href = "/"},
        titleAccept: "Đăng nhập",
        titleCancel: "Trở về trang chủ"
      }
      );
    }
    else{
      setUser(JSON.parse(user));
    }
  }, []);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;
  // const [totalProducts,setTotalProducts] = useState(0);

  cart.forEach((e) => {
      totalPrice += e.moreInfo.price*e.quantity;
  });

  const submit = () => {
      setSend(true);
      let data = {};
      data.id_client = user.id;
      data.delivery_date = document.getElementById("delivery_date").value;
      data.notice = document.getElementById("notice").value;
      let list_order = [];

      cart.map((e,i)=>{
        let rel = {};
        rel.id_cake = e.id;
        rel.name_cake = e.name;
        rel.size = e.moreInfo.size;
        rel.quantity = e.quantity;
        list_order.push(rel);
      })
      console.log(cart);

      data.list_order = list_order;

      createTotalBill(data).then((response) => {
        if (response.data.status === 200) {
          localStorage.removeItem("cart");
          notication.comfirm({
            title: "Thông báo",
            message: "Đặt hàng thành công!",
            handleAccept: () => {window.location.href = "/show-bill"},
            handleCancel: () => {window.location.href = "/"},
            titleAccept: "Xem đơn hàng",
            titleCancel: "Trở về trang chủ"
          });
        } else {
          notication.error({
            title: "Thông báo",
            message: response.data.message,
          });
          // navigate("/show-bill");
        }
        setSend(false);
      });
  }

  return (
    <main className="payment">
      {send?<Load/>:""}
      <div className="search__order--title">Thanh toán hóa đơn</div>
      <div className="payment__container">
        <div className="payment__container--form">
          <div className="payment__container--form__body">
              <div className="form__title">Thông tin giao hàng</div>
              <div className="form__input">
                <label> Ngày giao hàng </label>
                <input type="datetime-local" name="delivery_date" id="delivery_date"/>
              </div>
              <div className="form__input">
                <label> Lưu chú </label>
                <input className="notice" name="notice" id="notice" type="text" placeholder="Ghi chú"/>
              </div>
              <div className="form__title">Phương thức giao hàng</div>
              <div className="form__input--else">
                <div className="form__input--date">
                  <span>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc) </span>
                </div>
              </div>
              <div className="form__title">Phương thức thanh toán</div>
              <div className="form__input--else">
                <div className="form__input--date">
                  <span>Thanh toán trục tiếp khi nhận hàng</span>
                </div>
              </div>
              <div>
                <button className="btn__submit" onClick={() => submit()}>HOÀN TẤT ĐẶT HÀNG</button>
              </div>
          </div>
        </div>
        <div className="payment__container--order">
          <span></span>
          <ul className="list-group">
            <li className="list-group-item title">ĐƠN HÀNG</li>
            <li className="list-group-item divider"></li>
            <div className="list__product">
              {cart.map((e,i)=>{
                    return (
                      <Fragment key={i}>
                        <li className="list-group-item text-1">
                        <span className="title-6">{e.name}</span>
                        <span className="title-6-1">{e.moreInfo.price * e.quantity + " VND"}</span>
                    </li>
                    <li className="list-group-item text-1-1">
                        <span className="title-6-2">Size: {e.moreInfo.size}</span>
                        <span className="title-6-3">x {e.quantity}</span>
                    </li>
                      </Fragment>
                      
                    )
                  })}
            </div>
                <li className="list-group-item divider-1"></li>
                <li className="list-group-item text-1">
                    <span className="title-3">Đơn hàng</span>
                    <span className="title-3-1"><span className="current-price"> {totalPrice}</span> VND</span>
                </li>
                <li className="list-group-item text-2-2">
                    <span className="title-3">Giảm</span>
                    <span className="title-4-1">- <span className="discount">0</span> VND</span>
                </li>
                <li className="list-group-item text-2-3">
                    <span className="title-21">Phí vận chuyển</span>
                    <span className="title-22"><span className="shipping-fee">0</span> VND</span>
                </li>
                <li className="list-group-item text-2-3 payment-fee-input">
                    <span className="title-21">Phí thanh toán</span>
                    <span className="title-22"><span className="card-fee">0</span> VND</span>
                </li>

                <li className="list-group-item divider-1"></li>
                <li className="list-group-item">
                    <span className="title-5">TỔNG CỘNG</span>
                    <span className="title-5-2"><span className="total-price">{totalPrice}</span> VND</span>
                </li>
              </ul>
        </div>
      </div>
    </main>
  )
}

export default Payment