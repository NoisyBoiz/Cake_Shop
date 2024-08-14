import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getBillById, createBill, updateBill} from "../services/bill.js";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function BillForm() {
    let { id } = useParams();

    const convertDate = (date) => {
        let d = new Date(date);
        let y = d.getFullYear();
        let m = d.getMonth()+1;
        let day = d.getDate();
        let h = d.getHours();
        let min = d.getMinutes();

        return `${y}-${m<10?"0"+m:m}-${day<10?"0"+day:day}T${h<10?"0"+h:h}:${min<10?"0"+min:min}`;
    }

    useEffect(()=>{
        if(id!=="-1"){
            getBillById(id).then(rs=>{
                console.log(rs.data);
                const data = rs.data.data;
                console.log(data)
                document.querySelector("input[name='idClient']").value = data.id_client;
                document.querySelector("input[name='notice']").value = data.notice;
                document.querySelector("input[name='deliveryDate']").value = convertDate(data.delivery_date);
                document.querySelector("select[name='status']").selectedIndex = data.status;
            });
        }   
    },[]);

    const handleSubmit = () => {
        const idClient = Number(document.querySelector("input[name='idClient']").value);
        const notice = document.querySelector("input[name='notice']").value;
        const deliveryDate = document.querySelector("input[name='deliveryDate']").value;
        const status = Number(document.querySelector("select[name='status']").value);
        
        if(id==="-1"){
            createBill({"id_client": idClient,"notice": notice, "delivery_date": deliveryDate, "status": status}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Tạo đơn hàng",
                        message:"Tạo đơn hàng thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Tạo đơn",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            updateBill({"id":id,"id_client": idClient,"notice": notice, "delivery_date": deliveryDate, "status": status}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Câp nhật đơn hàng",
                        message:"Cập nhật đơn hàng thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật đơn hàng",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form category-form">
            <h1> {id==="-1"?"Thêm bánh":"Sửa bánh"} </h1>
            <div className="form-group">
                <label> Id Client </label>
                <input type="text" name="idClient" placeholder="Nhập id client"/>
            </div>
            <div className="form-group">
                <label> Lưu ý </label>
                <input type="text" name="notice" placeholder="Nhập lưu ý"/>
            </div>
            <div className="form-group">
                <label> Ngày giao hàng </label>
                <input type="datetime-local" name="deliveryDate"/>
            </div>
            <div className="form-group">
                <label> Trạng thái </label>
                <select name="status">
                    <option value="0"> Chưa giao hàng </option>
                    <option value="1"> Đã giao hàng </option>
                </select>
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default BillForm;