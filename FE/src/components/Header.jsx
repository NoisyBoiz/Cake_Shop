import React from 'react'
import { Fragment } from "react"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Header() {
    const [user, setUser] = useState(null);
    const localStorage = window.localStorage;

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user !== null)
            setUser(JSON.parse(user));
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <div className="cakes__header">
            <div className="cakes__header--content">
                <div className="cakes__header--content__image">
                    <Link to="/homepage" ><img className="image__logo" src="src/assets/images/logocake.png" alt="" /></Link>

                </div>
                <div className="cakes__header--content__body">
                    <div className="cakes__header--content__category">
                        <div className="cakes__header--link">
                            <Link to="/homepage/intro">Trang chủ</Link>
                        </div>
                        <div className="cakes__header--link">
                            <Link to="/homepage/category">Danh mục</Link>
                        </div>
                        <div className="cakes__header--link">
                            <Link to="/homepage/product">Sản phẩm</Link>
                        </div>
                        <div className="cakes__header--link">
                            <Link to="/homepage/footer">Liên hệ</Link>
                        </div>
                        <div className="cakes__header--link">
                            <Link to="/show-bill">Tra cứu đơn hàng</Link>
                        </div>
                    </div>
                </div>
                <div className="header-login">
                    {user !== null ? <>
                        <Link to="/user" className="header-user-name"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg> {user.name} </Link>
                        <button onClick={() => logout()}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5ZM15 16L20 12L15 8V11H9V13H15V16Z"></path></svg> Logout </button>
                    </> :
                        <><Link to="/login">Đăng nhập</Link><Link to="/register">Đăng ký</Link></>}
                </div>
            </div>
        </div>

    )
}

export default Header