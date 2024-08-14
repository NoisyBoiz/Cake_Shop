import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getOrderById, createOrder, updateOrder} from "../services/order.js";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function OrderForm() {
    let { id } = useParams();

    useEffect(()=>{
        if(id!=="-1"){
            getOrderById(id).then(rs=>{
                const data = rs.data;
                document.querySelector("input[name='idBill']").value = data.id_bill;
                document.querySelector("input[name='idCake']").value = data.id_cake;
                document.querySelector("input[name='size']").value = data.size;
                document.querySelector("input[name='quantity']").value = data.quantity;
            });
        }   
    },[]);

    const handleSubmit = () => {
        const idBill = Number(document.querySelector("input[name='idBill']").value);
        const idCake = Number(document.querySelector("input[name='idCake']").value);
        const size = document.querySelector("input[name='size']").value;
        const quantity = Number(document.querySelector("input[name='quantity']").value);
            
           
        if(id==="-1"){
            createOrder({"id_bill":idBill, "id_cake": idCake, "size": size, "quantity": quantity}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Thêm chi tiết đơn",
                        message:"Thêm chi tiết đơn thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Thêm chi tiết đơn",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            updateOrder({"id":id,"id_bill":idBill, "id_cake": idCake, "size": size, "quantity": quantity}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Cập nhật chi tiết đơn",
                        message:"Cập nhật chi tiết đơn thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật chi tiết đơn",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form category-form">
            <h1> {id==="-1"?"Thêm chi tiết đơn":"Sửa chi tiết đơn"} </h1>
            <div className="form-group">
                <label> Id đơn </label>
                <input type="text" name="idBill" placeholder="Nhập Id đơn"/>
            </div>
            <div className="form-group">
                <label> Id bánh </label>
                <input type="text" name="idCake" placeholder="Nhập Id bánh"/>
            </div>
            <div className="form-group">
                <label> Kích thước </label>
                <input type="text" name="size" placeholder="Nhập kích thước"/>
            </div>
            <div className="form-group">
                <label> Số lượng </label>
                <input type="number" name="quantity" placeholder="Nhập số lượng"/>
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default OrderForm;