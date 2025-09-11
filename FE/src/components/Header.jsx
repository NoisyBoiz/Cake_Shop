import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

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
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm" style={{justifyContent: 'center', padding: '0', color: "var(--second-color)"}}>
            <Container style={{maxWidth: '100vw', backgroundColor: 'var(--primary-color)', fontWeight: '700', fontSize: "1.2rem"}}> 
                <Navbar.Brand as={Link} to="/home">
                    <img src="src/assets/images/logocake.png" alt="Logo" style={{height: '48px'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto" >
                        <Nav.Link as={Link} to="/home/intro" style={{color: "var(--second-color)"}}>Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/home/category" style={{color: "var(--second-color)"}}>Danh mục</Nav.Link>
                        <Nav.Link as={Link} to="/home/product" style={{color: "var(--second-color)"}}>Sản phẩm</Nav.Link>
                        <Nav.Link as={Link} to="/home/footer" style={{color: "var(--second-color)"}}>Liên hệ</Nav.Link>
                        <Nav.Link as={Link} to="/cart" style={{color: "var(--second-color)"}}>Giỏ hàng</Nav.Link>
                        <Nav.Link as={Link} to="/order" style={{color: "var(--second-color)"}}>Đơn hàng</Nav.Link>
                    </Nav>
                    <Nav>
                        {user !== null ? (
                            <>
                                <Nav.Link as={Link} to="/user" className="d-flex align-items-center me-2" style={{color: "var(--second-color)"}}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                                    {user.fullname}
                                </Nav.Link>
                                <button 
                                    className="me-2"
                                    onClick={logout} 
                                    style={{color: "var(--second-color)", fontWeight: 600, backgroundColor: 'transparent', border:'none', textAlign:'left'}}
                                >
                                    {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '4px'}}><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5ZM15 16L20 12L15 8V11H9V13H15V16Z"></path></svg> */}
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" style={{color: "var(--second-color)"}}>Đăng nhập</Nav.Link>
                                <Nav.Link as={Link} to="/register" style={{color: "var(--second-color)"}}>Đăng ký</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header