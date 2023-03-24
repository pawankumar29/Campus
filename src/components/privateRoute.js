import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Authentication/loginPage";

const PrivateRoute=(props)=>{

  

  const token=localStorage.getItem("token")
  const {Component}=props
 
  return(
    token?<Component/>:<Login/>

  )


}


export default PrivateRoute;

