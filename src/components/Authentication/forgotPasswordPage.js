

import React from "react";
import { useNavigate } from "react-router-dom";
import forgotStyle from "../../style/forgotPassword.module.css";
import forgot from "../../img/forgot.jpg";

function ForgotPassword() {
  const navigate = useNavigate();

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
            <input type="text" />
          </div>
          <div>
            <button className={forgotStyle.button}>Submit</button>
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


