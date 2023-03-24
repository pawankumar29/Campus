import React from "react";
import forgotStyle from "../../style/forgotPassword.module.css"
class ForgotPassword extends React.Component{
  

    render(){

        return (
            <div className={forgotStyle.parent}>
            <div className={forgotStyle.div1}>
              
            </div>
            <div className={forgotStyle.div2}>
             <div className={forgotStyle.divstyle}>
            <div className={forgotStyle.header}>
                Forgot Password
              </div>
              <div className={forgotStyle.headerContent}>
                please enter registered email to set your password
              </div>

              <div className={forgotStyle.input}>
               <label>Please Enter Your Name</label>
               <br/>
               <input type="text"></input>
            
            
            </div>
            <div>
                <button className={forgotStyle.button} >Submit</button>
            </div>
            </div>
            </div></div>

        )
    }










}

export default ForgotPassword;