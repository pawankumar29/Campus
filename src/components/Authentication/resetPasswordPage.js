import React from "react";
import forgotStyle from "../../style/resetPassword.module.css"
import forgot from "../../img/forgot.jpg"
class resetPassword extends React.Component{
  

    render(){

        return (
            <div className={forgotStyle.parent}>
            <div className={forgotStyle.div1}>
              <img src={forgot}/>
            </div>
            <div className={forgotStyle.div2}>
             <div className={forgotStyle.divstyle}>
            <div className={forgotStyle.header}> 
                Reset Password
              </div>
              <div className={forgotStyle.headerContent}>
              Please set your new password
              </div>

              <div className={forgotStyle.input}>
               <label>New Password</label>
               <br/>
               <input type="text"></input>
               <br/>
               <br/>
               <label> Confirm New Password</label>
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

export default resetPassword;