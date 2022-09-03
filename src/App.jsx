import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import NotFound from './NotFound';

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Summary from './components/admin/Summary';
import Order from './components/admin/Order';
import User from './components/admin/User';
import CreateProduct from './components/admin/CreateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}  ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/admin' element={<Dashboard />} >
            <Route path='products' element={<Products />} >
              <Route path="create-product" element={<CreateProduct />} ></Route>
            </Route>
            <Route path='summary' element={<Summary />} ></Route>
            <Route path='order' element={<Order />} ></Route>
            <Route path='user' element={<User />} ></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
          {/* <Route path='/cart/:id' element={<Cart/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
