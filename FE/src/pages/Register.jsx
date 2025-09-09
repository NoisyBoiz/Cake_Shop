import React, { useState } from 'react';
import "../assets/styles/login.css";
import {registerClient} from "../services/client.js";
import { Link } from "react-router-dom";

function register(){
    const localStorage = window.localStorage;
    const [message, setMessage] = useState("");

    const submit = () => {
        const name = document.querySelector("input[name='name']").value;
        const email = document.querySelector("input[name='email']").value;
        const phone_number = document.querySelector("input[name='phone']").value;
        const address = document.querySelector("input[name='address']").value;
        const password = document.querySelector("input[name='password']").value;
        const comfirmPassword = document.querySelector("input[name='comfirm-password']").value;
        if(name == "") return setMessage("Tên không được để trống");
        if(email == "") return setMessage("Email không được để trống");
        if(phone_number == "") return setMessage("Số điện thoại không được để trống");
        if(address == "") return setMessage("Địa chỉ không được để trống");
        if(password == "") return setMessage("Password không được để trống");
        if(comfirmPassword == "") return setMessage("Xác nhận mật khẩu không được để trống");
        if(password !== comfirmPassword) return setMessage("Mật khẩu không trùng khớp");

        registerClient({name,email,phone_number,address,password}).then(rs=>{
            if(rs.data.status===200) {
                console.log(rs.data.data);
                localStorage.setItem("user",JSON.stringify(rs.data.data));
                window.location.href = "/login";
            }
            else{
                setMessage(rs.data.message);
            }
        });
    }

    return(
        <div className="form-login-container">
            <Link to="/" className="btn-go-home"> Trang chủ </Link>
            <div className="form-content">
                <div className="image-holder">
                    <img src="https://i.pinimg.com/564x/da/68/c6/da68c6d7cdcfa9aa6713c4c0a0b52b0e.jpg"/>
                </div>
                <div className="login-form">
                    <h1> Đăng ký </h1>
                    <div className="form-group">
                        <label> Tên </label>
                        <input type="text" placeholder="Nhập tên" className="form-control" name="name"/>
                    </div>
                    <div className="form-group">
                        <label> Email </label>
                        <input type="text" placeholder="Email" className="form-control" name="email"/>
                    </div>
                    <div className="form-group">
                        <label> Số điện thoại </label>
                        <input type="text" placeholder="Nhập số điện thoại" className="form-control" name="phone"/>
                    </div>
                    <div className="form-group">
                        <label> Địa chỉ </label>
                        <input type="text" placeholder="Nhập địa chỉ" className="form-control" name="address"/>
                    </div>
                    <div className="form-group">
                        <label> Mật khẩu </label>
                        <input type="password" placeholder="Nhập mật khẩu" className="form-control" name="password" />
                    </div>
                    <div className="form-group">
                        <label> Xác nhận mật khẩu </label>
                        <input type="password" placeholder="Xác nhận mật khẩu" className="form-control" name="comfirm-password" />
                    </div>
                    <p className='form-error'> {message} </p>
                    <button className="btn-register" onClick={() => submit()}> Đăng ký </button>
                    <Link to="/login"> Bạn đã có tài khoản, Đăng nhập! </Link>
                </div>
                
            </div>
        </div>
    )
}

export default register;