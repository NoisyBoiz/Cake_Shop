import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {getClientById, createClient, updateClient } from "../services/client.js";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function ClientForm() {
    let { id } = useParams();

    useEffect(()=>{
        if(id!=="-1"){
            getClientById(id).then(rs=>{
                const data = rs.data.data;
                document.querySelector("input[name='name']").value = data.name;
                document.querySelector("input[name='phone_number']").value = data.phone_number;
                document.querySelector("input[name='address']").value = data.address;
                document.querySelector("input[name='email']").value = data.email;
                document.querySelector("input[name='password']").value = data.password;
            });
        }   
    },[]);

    const handleSubmit = () => {
        console.log(id);
        if(id==="-1"){
            const name = document.querySelector("input[name='name']").value;
            const phone_number = document.querySelector("input[name='phone_number']").value;
            const address = document.querySelector("input[name='address']").value;
            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;
            createClient({name,phone_number,address,email,password}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Thêm người dùng",
                        message:"Thêm người dùng thành công"
                    });
                }
                else{
                    notification.error({
                        title:"Thêm người dùng",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            const name = document.querySelector("input[name='name']").value;
            const phone_number = document.querySelector("input[name='phone_number']").value;
            const address = document.querySelector("input[name='address']").value;
            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;
            updateClient({id, name, phone_number, address, email, password}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Cập nhật người dùng",
                        message:"Cập nhật người dùng thành công"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật người dùng",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form admin-form">
            <h1> {id==="-1"?"Thêm người dùng":"Sửa người dùng"} </h1>
            <div className="form-group">
                <label>Tên</label>
                <input type="text" name="name" placeholder="Nhập tên"/>
            </div>
            <div className="form-group">
                <label>Điện thoại</label>
                <input type="text" name="phone_number" placeholder="Nhập số điện thoại"/>
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input type="text" name="address" placeholder="Nhập địa chỉ"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" name="email" placeholder="Nhập email"/>
            </div>
            <div className="form-group">
                <label>Mật khẩu</label>
                <input type="text" name="password" placeholder="Nhập mật khẩu"/>
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default ClientForm;