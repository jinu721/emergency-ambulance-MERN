import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'

import HomedPage from './Pages/UserSide/HomedPage';
import AuthPage from './Pages/UserSide/SignIn';
import {ToastContainer } from 'react-toastify';
import {  useAuth } from './authContext';
import AdminDashboard from './Pages/AdminSide/AdminDashboard';
import { axiosUserInstance } from './axiosInstance';
import UserProfileModal from './Components/Profile';

const App = ({ isAdmin = true }) => {
   const {isLoggedIn , login } = useAuth()
  useEffect(()=>{
    async function validateToken(){

      const token = localStorage.getItem("token")
      if(token){
        const {data} = await axiosUserInstance.post('/validate-token')
      }
    }
    validateToken()
  },[])
 
  return (
    <BrowserRouter>
         <Routes>
          <Route  element={<HomedPage/>} path='/'/>
          <Route element={<AuthPage isLogin={true}/>} path='/login'/>
          <Route element={<AuthPage isLogin={false}/>} path='/signup' />
          <Route element={<UserProfileModal/>} path='/profile' />
          <Route element={<AdminDashboard/>} path='/admin' />
         </Routes>
         <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </BrowserRouter>
  );
};

export default App;