import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginPage from "./loginPage.js";

const PrivateRoute=(props)=>{

  

  const token=localStorage.getItem("token")
  const {Component}=props
 
  return(
    token?<Component/>:<LoginPage/>

  )


}


export default PrivateRoute;

