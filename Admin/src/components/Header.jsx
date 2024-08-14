import React from 'react'
import { Fragment } from "react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const localStorage = window.localStorage;
    const [user, setUser] = useState(null);
    const [target, setTarget] = useState(null);

    useEffect(() => {
        let user = localStorage.getItem("user");
        if(user === null) {
            window.location.href = "/login";
        }
        setUser(JSON.parse(user));
    },[]);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    useEffect(() => {
        let location = window.location.href;
        if(location.includes("/admin") || location.includes("/adminForm")) {setTarget(1);return}
        if(location.includes("/client") || location.includes("/clientForm")) {setTarget(2);return}
        if(location.includes("/category") || location.includes("/categoryForm")) {setTarget(3);return}
        if(location.includes("/cake") || location.includes("/cakeForm")) {setTarget(4);return}
        if(location.includes("/bill") || location.includes("/billForm")) {setTarget(5); return}
        if(location.includes("/order") || location.includes("/orderForm")){setTarget(6); return}
        setTarget(0);
    },[window.location.href]);

    return (
        <div className="cakes__header--content">
            <div className="cakes__header--content__image">
                <Link to="./homepage" ><img className="image__logo" src="src/assets/images/logocake.png" alt="" /></Link>
            </div>
            <div className="cakes__header--content__body">
                <div className="cakes__header--content__category">
                    <div className="cakes__header--link">
                        <Link to="/" className={target==0?"navbar-target":""}> Trang chủ </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/admin" className={target==1?"navbar-target":""}> Admin </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/client" className={target==2?"navbar-target":""}> Client </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/category" className={target==3?"navbar-target":""}> Danh mục </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/cake" className={target==4?"navbar-target":""}> Bánh </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/bill" className={target==5?"navbar-target":""}> Đơn hàng </Link>
                    </div>
                    <div className="cakes__header--link">
                        <Link to="/order" className={target==6?"navbar-target":""}> Chi tiết đơn </Link>
                    </div>
                </div>
            </div>
            <div className="header-login">
                {user!==null?<>
                    <div className="header-user-name"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg> {user.name} </div> 
                    <button onClick={() => logout()}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5ZM15 16L20 12L15 8V11H9V13H15V16Z"></path></svg> Logout </button> 
                </>:""}
            </div>
        </div>
    )
}

export default Header