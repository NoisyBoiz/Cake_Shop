import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {getAdminById, createAdmin, updateAdmin } from "../services/admin";
import "../assets/styles/form.css"
import Notification from "../components/notication.jsx";

const notification = new Notification();
function AdminForm() {
    let { id } = useParams();

    useEffect(()=>{
        if(id!=="-1"){
            getAdminById(id).then(rs=>{
                const data = rs.data.data;
                document.querySelector("input[name='name']").value = data.name;
                document.querySelector("input[name='email']").value = data.email;
                document.querySelector("input[name='password']").value = data.password;
            });
        }   
    },[]);

    const handleSubmit = () => {
        console.log(id);
        if(id==="-1"){
            const name = document.querySelector("input[name='name']").value;
            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;
            createAdmin({name, email, password}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Tạo Admin",
                        message:"Tạo Admin thành công!"
                    });
                }
                else{
                    notification.error({
                        title:"Tạo Admin",
                        message: rs.data.message
                    });
                }
            });
        }
        else{
            const name = document.querySelector("input[name='name']").value;
            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;
            updateAdmin({id, name, email, password}).then(rs=>{
                if(rs.data.status===200) {
                    notification.success({
                        title:"Cập nhật Admin",
                        message:"Cập nhật Admin thành công"
                    });
                }
                else{
                    notification.error({
                        title:"Cập nhật Admin",
                        message: rs.data.message
                    });
                }
            });
        }
    }

    return (
        <div className="form admin-form">
            <h1> {id==="-1"?"Thêm Admin":"Sửa Admin"} </h1>
            <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input type="text" name="name" placeholder="Nhập tên" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="Nhập email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input type="text" name="password" placeholder="Nhập mật khẩu" />
            </div>
            <button onClick={()=>handleSubmit()}>Gửi</button>
        </div>
    );
}

export default AdminForm;