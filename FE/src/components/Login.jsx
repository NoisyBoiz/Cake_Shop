import React, { useState } from 'react';
import "../assets/styles/login.css";
import {loginClient} from "../services/client.js";
import { Link } from "react-router-dom";

function login(){
    const localStorage = window.localStorage;
    const [message, setMessage] = useState("");

    const submit = () => {
        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;
        if(email == "") return setMessage("Email không được để trống");
        if(password == "") return setMessage("Password không được để trống");
        loginClient({email, password}).then(rs=>{
            if(rs.data.status===200) {
                localStorage.setItem("user",JSON.stringify(rs.data.data));
                window.location.href = "/";
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
                <div className="login-form">
                    <h1 className="login-label"> Đăng nhập </h1>
                    <div className="form-group">
                        <label> Email </label>
                        <input type="text" placeholder="Email" className="form-control" name="email"/>
                    </div>
                    <div className="form-group">
                        <label> Mật khẩu </label>
                        <input type="password" placeholder="Mật khẩu" className="form-control" name="password" />
                    </div>
                    <p className='form-error'> {message} </p>
                    <button className="btn-login" onClick={() => submit()}> Login </button>
                    <Link to="/register"> Bạn chưa có tài khoản, Đăng ký! </Link>
                </div>
                <div className="image-holder">
                    <img src="https://i.pinimg.com/564x/8d/7b/a7/8d7ba7bba2c9fce5a701196e9f278a9b.jpg"/>
                </div>
            </div>
        </div>
    )
}

export default login;