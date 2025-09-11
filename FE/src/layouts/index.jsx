import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";
import React from 'react';

function Layout() {
  return (
    <>
      <div className="header-container">
        <Header/>
        <div className="sidebar-container">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Layout