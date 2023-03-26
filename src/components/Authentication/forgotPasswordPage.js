

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotStyle from "../../style/forgotPassword.module.css";
import forgot from "../../img/forgot.jpg";
import { forgotPasswordValidation } from "./loginValidation";
function ForgotPassword() {
  const [email,setEmail]=useState("");
  const [forgotError, setForgotError] = useState({});
  const navigate = useNavigate();
  let obj={};
  const handleChange=(e)=>{
      setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      setForgotError(forgotPasswordValidation(email));
     if(forgotError.forgotError)
      // perform submission logic
      console.log("Form submitted successfully");
    
  };

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
          {forgotError.forgotError&&(<p style={{ color: "red", fontSize: "22px",display:"block" }}>{forgotError.forgotError}</p>)}
          <div>
            <button className={forgotStyle.button} onClick={handleSubmit}>Submit</button>
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


