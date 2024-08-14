import React, { useState, useEffect } from "react";
import "../assets/styles/user.css";
import Notification from './notication';
import { changeInfor, changePassword } from "../services/client";
import Load from './Load';

const notification = new Notification();


function User() {
    const [load, setLoad] = useState(false);
    const [state, setState] = useState("show");
    const [user, setUser] = useState({});
    const localStorage = window.localStorage;
    
    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user !== null)
            setUser(JSON.parse(user));
        else{
            window.location.href = "/homepage";
        }
    }, []);

    const submitChangeInfor = () => {
        const name = document.querySelector("input[name='name']").value;
        const phone_number = document.querySelector("input[name='phone_number']").value;
        const address = document.querySelector("input[name='address']").value;
        const password = document.querySelector("input[name='password']").value;
        if(name === "" || phone_number === "" || address === "" || password === ""){
            notification.error({
                title: "Thông báo",
                message: "Vui lòng điền đầy đủ thông tin",
            });
            return;
        }
        let data = {
            id: user.id,
            name: name,
            phone_number: phone_number,
            address: address,
            password: password
        }
        console.log(data);
        setLoad(true);
        changeInfor(data).then((res) => {
            if(res.status === 200){
                notification.success({
                    title: "Thông báo",
                    message: "Cập nhật thông tin thành công",
                });
                setUser({
                    id: user.id,
                    name: name,
                    email: user.email,
                    phone_number: phone_number,
                    address: address
                });
                localStorage.setItem("user", JSON.stringify({
                    id: user.id,
                    name: name,
                    email: user.email,
                    phone_number: phone_number,
                    address: address
                }));
                setState("show");
            }
            else{
                notification.error({
                    title: "Thông báo",
                    message: res.data.message,
                });
            }
            setLoad(false);
        });
    }

    const submitChangePassword = () => {
        const oldPassword = document.querySelector("input[name='oldPassword']").value;
        const newPassword = document.querySelector("input[name='newPassword']").value;
        const confirmPassword = document.querySelector("input[name='confirmPassword']").value;
        if(oldPassword === "" || newPassword === "" || confirmPassword === ""){
            notification.error({
                title: "Thông báo",
                message: "Vui lòng điền đầy đủ thông tin",
            });
            return;
        }
        if(newPassword !== confirmPassword){
            notification.error({
                title: "Thông báo",
                message: "Mật khẩu không khớp",
            });
            return;
        }
        let data = {
            id: user.id,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        setLoad(true);
        changePassword(data).then((res) => {
            console.log(res);
            if(res.status === 200){
                notification.success({
                    title: "Thông báo",
                    message: "Đổi mật khẩu thành công",
                });
                setState("show");
            }
            else{
                notification.error({
                    title: "Thông báo",
                    message: res.data.message,
                });
            }
            setLoad(false);
        });
    }

    return (
        <div className="wrapper">
            <div className="container">
                <main className="userPage">
                    {load?<Load/>:""}
                    {state === "show"?
                    <div className="user-show-infor">
                        <h1> Thông tin cá nhân </h1>
                        <ul>
                            <li> Tên </li>
                            <li> {user.name} </li>
                            <li> Email </li>
                            <li> {user.email} </li>
                            <li> Điện thoại </li>
                            <li> {user.phone_number} </li>
                            <li> Địa chỉ </li>
                            <li> {user.address} </li>
                        </ul>
                        <button className="btn-change-infor" onClick={() => setState("changeInfor")}> Cập nhật thông tin </button>
                        <button className="btn-change-password" onClick={() => setState("changePassword")}> Đổi mật khẩu </button>
                    </div>:""}

                    {state === "changeInfor"?
                    <div className="user-change-infor">
                        <h1> Cập nhật thông tin </h1>
                        <div className="user-form">
                            <label> Tên </label>
                            <input type="text" placeholder="Tên" name="name" defaultValue={user.name}/>
                            <label> Điện thoại </label>
                            <input type="text" placeholder="Điện thoại" name="phone_number" defaultValue={user.phone_number}/>
                            <label> Địa chỉ </label>
                            <input type="text" placeholder="Địa chỉ" name="address" defaultValue={user.address}/>
                            <label> Xác nhận mật khẩu </label>
                            <input type="password" name="password" placeholder="Xác nhận mật khẩu"/>
                        </div>
                        <div className="btn-user-group">   
                            <button className="btn-cancel" onClick={() => {setState("show")}}> Hủy </button>
                            <button className="btn-update" onClick={() => {submitChangeInfor()}}> Cập nhật </button>
                        </div>
                    </div>: ""}

                    {state === "changePassword"?
                    <div className="user-change-password">
                        <h1> Đổi mật khẩu </h1>
                        <div className="user-form">
                            <label> Mật khẩu cũ </label>
                            <input type="password" name="oldPassword" placeholder="Mật khẩu cũ" />
                            <label> Mật khẩu mới </label>
                            <input type="password" name="newPassword" placeholder="Mật khẩu mới"/>
                            <label> Nhập lại mật khẩu mới </label>
                            <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu mới"/>
                        </div>
                        <div className="btn-user-group">  
                            <button className="btn-cancel" onClick={() => setState("show")}> Hủy </button>
                            <button className="btn-update" onClick={() => submitChangePassword()}> Đổi mật khẩu </button>
                        </div>
                    </div>:""}
                </main>
            </div>
        </div>
    );
}

export default User;