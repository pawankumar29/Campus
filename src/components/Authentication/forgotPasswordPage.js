

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotStyle from "../../style/forgotPassword.module.css";
import forgot from "../../img/forgot.jpg";

function ForgotPassword() {
  const [email,setEmail]=useState("");
  const navigate = useNavigate();

  const handleChange=(e)=>{
      setEmail(e.target.value);
  }

  const submit=(e)=>{
     e.preventDefault();

     alert(JSON.stringify(email));
  }

  return (
    <div className={forgotStyle.parent}>
      <div className={forgotStyle.div1}>
        <img src={forgot} alt="forgot password" />
      </div>
      <div className={forgotStyle.div2}>
        <div className={forgotStyle.divstyle}>
          <div className={forgotStyle.header}>Forgot Password</div>
          <div className={forgotStyle.headerContent}>
            please enter registered email to set your password
          </div>

          <div className={forgotStyle.input}>
            <label>Please Enter Your Name</label>
            <br />
            <input type="text" value={email} onChange={handleChange}/>
          </div>
          <div>
            <button className={forgotStyle.button} onClick={submit}>Submit</button>
          </div>
          <br />
          <div>
            <a onClick={() => navigate("/login")}>Back To Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;


