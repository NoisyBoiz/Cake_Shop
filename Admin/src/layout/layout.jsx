import React from 'react'
import Header from '../components/Header';
import '../assets/styles/header.css';

function layout({children}) {
  return (
    <>
      <Header/>
      <div className="main-content">
        {children}
      </div>
    </>
  )
}

export default layout