import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginAgain from "./loginAgain";

const PrivateRoute=(props)=>{

  

  const token=localStorage.getItem("token")
  const {Component}=props
 
  return(
    token?<Component/>:<LoginAgain/>

  )


}


export default PrivateRoute;

