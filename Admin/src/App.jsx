import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom" 

import Layout from './layout/layout';
import Home from "./pages/home";
import Admin from './pages/admin';
import Client from './pages/client';
import Category from './pages/category';
import Cake from './pages/cake';
import Bill from './pages/bill';
import Order from './pages/order';
import AdminForm from './pages/adminForm';
import ClientForm from './pages/clientForm';
import CategoryForm from './pages/categoryForm';
import CakeForm from './pages/cakeForm';
import OrderForm from './pages/orderForm';
import BillForm from './pages/billForm';
import Login from './pages/login';

const publicRoutes = [
  {path:"/",layout:"Layout", component: Home},
  {path:"/admin",layout:"Layout", component: Admin},
  {path:"/client",layout:"Layout", component: Client},
  {path:"/category",layout:"Layout", component: Category},
  {path:"/cake",layout:"Layout", component: Cake},
  {path:"/bill",layout:"Layout", component: Bill},
  {path:"/order",layout:"Layout", component: Order},
  {path:"/adminForm/:id",layout:"Layout", component: AdminForm},
  {path:"/clientForm/:id",layout:"Layout", component: ClientForm},
  {path:"/categoryForm/:id",layout:"Layout", component: CategoryForm},
  {path:"/cakeForm/:id",layout:"Layout", component: CakeForm},
  {path:"/orderForm/:id",layout:"Layout", component: OrderForm},
  {path:"/billForm/:id",layout:"Layout", component: BillForm},
  {path:"/login",layout:null, component: Login}
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route,index)=>{
              const LayoutPage = route.layout===null?React.Fragment:Layout;
              return(
                <Route key={index} path={route.path} element={<LayoutPage><route.component/></LayoutPage>}/>
              )
            })}
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
