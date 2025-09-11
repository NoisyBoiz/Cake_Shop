import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/styles/app.css';
import Layout from './layouts';
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import User from './pages/User.jsx';
import { NotificationProvider } from './components/Notification.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/home/:fragment" element={<Home/>}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/user" element={<User/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
