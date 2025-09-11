import React, { useState } from 'react';
import "../assets/styles/login.css";
import {login} from "../services/users.js";
import { Link } from "react-router-dom";

function Login(){
    const localStorage = window.localStorage;
    const [message, setMessage] = useState("");

    const submit = () => {
        const username = document.querySelector("input[name='username']").value;
        const password = document.querySelector("input[name='password']").value;
        if(username == "") return setMessage("Email không được để trống");
        if(password == "") return setMessage("Password không được để trống");
        login({username, password}).then(rs=>{
            if(rs.data.status===200) {
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
                        <label> Tên đăng nhập </label>
                        <input type="text" placeholder="Tên đăng nhập" className="form-control" name="username"/>
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

export default Login;