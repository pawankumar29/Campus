import style from "../style/style.module.css"
import React, { useState } from 'react'
import axios from "axios"
import logo from "../img/download.jpg"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");

const navigate=useNavigate();
function setEmailFun(event){
       
     setEmail(event.target.value);
}

function setPasswordFun(event){
 
  setPassword(event.target.value);
}

const submit=async(e)=>{
   e.preventDefault();
  const obj={
    email:Email,
    password:Password
  } 

  const result=await axios.post('http://localhost:3035/v1/login',obj);
  if(result.data){
  var token=result.data.Data }
  if(token){
  localStorage.setItem("token",token)
  navigate("/dash")}
  else{
    // console.log("err-->",result)
  const errMsg = document.getElementById("errmsg");
  console.log("e--",errMsg)
  errMsg.classList.add(style.show);
  }
                            // by default alert take one argument and makes it string and to watch the 
                              // the object just use json.stringfy
}

  return (
    <div className={style.loginPageparent}>
    <div className={style.container}>
      <div className={style.logo}><img className={style.img} src={logo}></img></div>
      <br></br>
      <div className={style.logoText}>SIGN IN</div>
      <br></br>
      <br></br>
     <div className={style.inputField}>

     <label>Email</label>
     <br></br>
     <input className={style.loginInput}  type="text" value={Email} onChange={setEmailFun}></input>
     {/* if u want to use the event call it without () and the genuine reason is 
      that the function will be executed once when the component is rendered,
       but it will not be called again when the input value changes.
To fix this issue, you should pass the setEmailFun function as a reference 
to the onChange event handler, without calling it: 
just take care only reference will be called */}
     <br></br>
     <label>Password</label>
     <br></br>
     <input type="text" value={Password} className={style.loginInput} onChange={setPasswordFun}></input>
     
     </div>
     <div className={style.link}><a href="#">Forgot Password</a></div>
     <br></br>
     <br></br>
     <br></br>
     <div className={style.button}><span className={style.submit} onClick={submit}>Login</span></div>
     <br></br>
     <div id={style.errmsg}>Wrong Email Kindly login</div>


    </div>

   
    </div>
  )
}

export default LoginPage


