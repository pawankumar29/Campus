import React from "react";
import forgotStyle from "../../style/resetPassword.module.css"
import forgot from "../../img/forgot.jpg"
import { resetPasswordValidation } from "./loginValidation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

class resetPassword extends React.Component{
    
    constructor(){
        super();
        this.state={
            password:"",
            confirmPassword:"",
            validate:{}
        }
        this.submit = this.submit.bind(this);

    }

  

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
          ...prevState,   // in class component send the object as a reference
          [name]: value,
        }));
      };
      
    submit = async (e) => {

      
        this.setState({ validate: resetPasswordValidation(this.state) }); // only filling the required value of validate
        const url = window.location.href;
        const result = url.split("=");
      
        const data = {
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          token: result[1],
        };
     
        if (Object.keys(this.state.validate).length === 0) {
          try {
            const result = await axios.post(
              "http://localhost:3035/v1/reset-password",
              data
            );
            
            if (result.status >= 200 && result.status < 300) {
              toast.success("Password Changed Successfully")
              console.log("success")
              
            } else {
              throw new Error("form Not submittted")
            }
          } catch (error) {
            toast.error(error.response.data.message);
            this.setState(prevState => ({    // in class component we havwe to first get the previous 
                                         // property and then change it 
                ...prevState,
                validate: { ...prevState.validate, resetError: error.response.data.message }
              }));
            console.error("Error submitting form:", error.response.data.message);
          }
        }
      };
      

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
               <input type="text" name="password" value={this.state.password} onChange={this.handleChange}></input>
               <br/>
               <br/>
               <label> Confirm New Password</label>
               <br/>
               <input type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}></input>
            
            
            </div>
            {this.state.validate.resetError&&(<p style={{color:"red",fontSize:"22px"}}>{this.state.validate.resetError}</p>)}
            <div>
                <button className={forgotStyle.button} onClick={this.submit} >Submit</button>
            </div>
            </div>
            <ToastContainer/>
            </div></div>

        )
    }


}

export default resetPassword;