import React, { useState, useEffect } from 'react'
import "../assets/styles/showBill.css";
import { getBillByClient } from "../services/bill";
import Notification from './notication';

const notication = new Notification();

const ShowBill = () => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    let user = localStorage.getItem("user");
    if(user === null) {
      notication.warning({
        title: "Thông báo",
        message: "Vui lòng đăng nhập để thực hiện chức năng này!",
        handleAccept: () => {window.location.href = "/login"},
        handleCancel: () => {window.location.href = "/"},
        titleAccept: "Đăng nhập",
        titleCancel: "Trở về trang chủ"
      }
      );
    }
    else{
      user = JSON.parse(user);
      setUser(user);
      getBillByClient(user.id).then((res) => {
        let data = res.data.data;
        data.sort((a, b) => b.id - a.id);
        setAllBills(data);
        setBills(data.filter(bill => !bill.status));
      });
    }
  }, []);


  const [allBills, setAllBills] = useState([]);
  const [bills, setBills] = useState([]);
  const [take, setTake] = useState(0);

  const calTotal = (orders) => {
    let total = 0;
    orders.forEach(order => {
      total += order.CakeSize.price * order.quantity;
    });
    return total + " VND";
  }

  useEffect(() => {
    if (take) {
      setBills(allBills.filter(bill => bill.status));
    } else {
      setBills(allBills.filter(bill => !bill.status));
    }
  }, [take, allBills]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="container__header">
            <h1><i className="fa-solid fa-book-open-reader"></i> Cakes Shop </h1>
          </div>
          <div className="container__body">
            <div className="btn-switch-order">
              <button className={!take?"btn-target":""} onClick={()=>setTake(0)}>Đơn đang làm</button>
               <button className={take?"btn-target":""} onClick={()=>setTake(1)}>Đơn đã nhận</button>
            </div>
            <h2>Cảm ơn rất nhiều về đơn hàng của ban!</h2>
            <p>Chúng tôi đã nhận được đơn đặt hàng của bạn và đơn hàng hiện đang được xử lý.</p>
            {bills !== null && bills.length !== 0 ? bills.map((bill, index) => {
              return (
                <div key={index} className="container__list">
                  <p>Đơn hàng của bạn: #{bill.id} ({new Date(bill.delivery_date).toLocaleString()})</p>
                  <div className="table-container" role="table">
                    {bill.Orders?.map((cake, i) => {
                      return (
                        <div key={i} className="flex-table row" role="rowgroup">
                          <div className="flex-row first" role="cell">
                            <img className="img__cake" src={cake.Cake.CakeImages[0].path} alt="Harry potter" />
                          </div>
                          <div className="flex-row" role="cell">{cake.Cake.name}<br /> <span>Số lượng: {cake.quantity}</span></div>
                          <div className="flex-row" role="cell">{cake.CakeSize.price + " VND"}</div>
                        </div>
                      )
                    })}
  
                    <div className="flex-table row" role="rowgroup">
                      <div className="flex-row first" role="cell">Tổng cộng: </div>
                      <div className="flex-row" role="cell">{calTotal(bill.Orders)}</div>
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
            {/* <div className="container__barcode">
              <p>Theo dõi đơn hàng của bạn</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZf4UVrvG5gug1icYjer-V09hsxxatJa1hFQ&usqp=CAU" alt="barcode" />
              <p>SH4538879444760733</p>
            </div>
            <div className="container__social">
              Follow us <br />
              <i className="fa-brands fa-facebook"></i> <i className="fa-brands fa-instagram"></i>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowBill