import React, { useState, useEffect } from 'react'
import "../assets/styles/showBill.css";
import { getOrder } from "../services/orders";
import { useNotification } from '../components/Notification';

const Order = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    getOrder().then((res) => {
      if(res && res.status==200){
        let data = res.data.data;
        data.sort((a, b) => b.id - a.id);
        console.log(data);
        setAllOrders(data);
        setOrders(data.filter(order => order.status == 'status'));
      }
    }).catch((err) => {
      if(err?.response?.status == '401') {
          showNotification({
              title: "Thông báo",
              message: "Vui lòng đăng nhập để thực hiện chức năng này!",
              handleAccept: () => {window.location.href = "/login"},
              handleCancel: () => {window.location.href = "/"},
              titleAccept: "Đăng nhập",
              titleCancel: "Trở về trang chủ",
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
  }, []);

  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('pending');

  const calTotal = (order) => {
    let total = 0;
    order.OrderDetails.forEach(detail => {
      total += detail.price * detail.quantity;
    });
    return total + " VND";
  }

  useEffect(() => {
    setOrders(allOrders.filter(bill => bill.status === status));
  }, [status, allOrders]);

  return (
    <>
        <div className="container" style={{minHeight: '80vh'}}>
          <div className="container__body">
            <div className="btn-switch-order">
              <button className={status === 'pending' ? "btn-target" : ""} onClick={() => setStatus('pending')}>Đơn đang làm</button>
              <button className={status === 'completed' ? "btn-target" : ""} onClick={() => setStatus('completed')}>Đơn đã nhận</button>
              <button className={status === 'cancelled' ? "btn-target" : ""} onClick={() => setStatus('cancelled')}>Đơn đã hủy</button>
            </div>
            {orders && orders.length !== 0 ? orders.map((order, index) => {
              return (
                <div key={index} className="container__list">
                  <p>Đơn hàng của bạn: #{order.id} ({new Date(order.delivery_date).toLocaleString()})</p>
                  <div className="table-container" role="table">
                    {order.OrderDetails.map((detail, i) => {
                      return (
                        <div key={i} className="flex-table row" role="rowgroup">
                          <div className="flex-row first" role="cell">
                            <img className="img__cake" src={detail.Cake.Images[0].path} alt="Harry potter" />
                          </div>
                          <div className="flex-row" role="cell">{detail.Cake.name}<br /> <span>Số lượng: {detail.quantity}</span></div>
                          <div className="flex-row" role="cell">{detail.price * detail.quantity + " VND"}</div>
                        </div>
                      )
                    })}
  
                    <div className="flex-table row" role="rowgroup">
                      <div className="flex-row first" role="cell">Tổng cộng: </div>
                      <div className="flex-row" role="cell">{calTotal(order)}</div>
                    </div>
                  </div>
                </div>
              )
            })
              : 
              <div className="empty-data"> 
                  <div className="empty-data-content">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M511.9 175c-9.1-75.6-78.4-132.4-158.3-158.7C390 55.7 416 116.9 416 192h28.1L327.5 321.5c-2.5-.6-4.8-1.5-7.5-1.5h-48V192h112C384 76.8 315.1 0 256 0S128 76.8 128 192h112v128h-48c-2.7 0-5 .9-7.5 1.5L67.9 192H96c0-75.1 26-136.3 62.4-175.7C78.5 42.7 9.2 99.5.1 175c-1.1 9.1 6.8 17 16 17h8.7l136.7 151.9c-.7 2.6-1.6 5.2-1.6 8.1v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-2.9-.9-5.4-1.6-8.1L487.1 192h8.7c9.3 0 17.2-7.8 16.1-17z"></path></svg>
                      <h1> Trống! <p> Có vẻ như bạn không có đơn hàng nào! </p> </h1> 
                  </div>
              </div>
            }
          </div>
      </div>
    </>
  )
}

export default Order