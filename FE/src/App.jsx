import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout';
import HomePage from "./components/HomePage";
import Payment from "./components/Payment";
import ShowBill from "./components/ShowBill";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import User from './components/User.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/show-bill" element={<ShowBill />}></Route>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/homepage/:type" element={<HomePage/>}></Route>
          <Route path="/user" element={<User/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
