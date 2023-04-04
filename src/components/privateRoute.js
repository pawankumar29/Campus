import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Authentication/loginPage.js";

const PrivateRoute=(props)=>{

  const token=localStorage.getItem("token")


  const {Component}=props

  return(
    token!== "null" ?<Component/>:<Login/>

  )


}


export default PrivateRoute;




