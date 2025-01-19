import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './app.css'

import HomedPage from './Pages/UserSide/HomedPage';
import AuthPage from './Pages/UserSide/SignIn';
import {ToastContainer } from 'react-toastify';
import {  useAuth } from './authContext';
import AdminDashboard from './Pages/AdminSide/AdminDashboard';
import { axiosUserInstance } from './axiosInstance';
import UserProfileModal from './Components/Profile';
import AmbulanceListing from './Components/AmbulanceListing';
import DriverDashboard from './Pages/UserSide/DriverDashboard';
import ContactPage from './Pages/UserSide/Contact';

const App = ({ isAdmin = true }) => {
   const {isLoggedIn , login ,logout , role} = useAuth()
   const navigate = useNavigate()
  
  useEffect(()=>{
    async function validateToken(){
     try{
      const token = localStorage.getItem("token")
      if(token){
        console.log(token)
        const {data} = await axiosUserInstance.post('/validate/token',{
          token 
        })
        if(data){
          console.log(data)
          login(data.decoded.role)
        }
      }
     }catch(err){
        logout()
     }
     
    }
    validateToken()
  },[])
 
  return (
       <>
         <Routes>
          <Route  element={<HomedPage/>} path='/'/>
          <Route element={<AuthPage isLogin={true}/>} path='/login'/>
          <Route element={<AuthPage isLogin={false}/>} path='/signup' />
          <Route element={<UserProfileModal/>} path='/profile' />
          <Route element={<AdminDashboard/>} path='/admin' />
          <Route element={<AmbulanceListing/>} path='/available' />
          <Route element={<DriverDashboard/>} path='/driver/requests'/>
         <Route element={<ContactPage/>} path='/contact'/>
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
      </>
  );
};

export default App;