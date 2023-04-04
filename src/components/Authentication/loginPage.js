import React, { useEffect } from "react";
import { useState } from "react";
import {emailValidation,loginResponseValidation,passwordValidation} from  "./loginValidation";
import style from "../../style/loginPage.module.css";
import image from "../../img/loginLogo.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginAgain() {
  const navigate = useNavigate();
  // for setting password and email
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  // for getting the error message
  const [error, setError] = useState({}); // to check required fields
  const [loginError,setLoginError]=useState({}) // to check after submitting the data
  const [emailcounter,setEmailCounter]=useState(0); // to skip first loading
  const [passwordCounter,setPasswordCounter]=useState(0) //to skip first password loading error check
  // previous values with the new one
  const handleEmailChange = (e) => {
    setEmail( e.target.value );
  };

  const handlePasswordChange = (e) => {
  setPassword(e.target.value );
  };

  const submit = async(e) => {
    e.preventDefault();
    const values={
      "email":email,
      "password":password
    }
    // setLoginError(loginResponseValidation(values))
      if(Object.keys(error).length==0&&(values.email!=""&&values.password!="")){

        try{
         const result=await axios.post("http://localhost:3035/v1/login",values);
         if(result.status){
          localStorage.setItem("token",result.data.data);
          toast.success("login Successful");
          setTimeout(()=>{
            navigate("/dashboard");
          },2000)
            
         }
        }catch(error){
          console.log(JSON.stringify(error.response.data))
          toast.error(JSON.stringify(error.response.data.message));
          localStorage.setItem("token",null);
        }
       
   }
  };

  // useeffect for the email field check
  useEffect(()=>{
    const values={
      "email":email,
      "password":password
    }
     setError(emailValidation(values,emailcounter));
      setEmailCounter(1);
  },[email]) // it will be called when error will be updated



  // useffect for the password field check 
  useEffect(()=>{
    const values={
      "email":email,
      "password":password
    }
    setError(passwordValidation(values,passwordCounter));
    setPasswordCounter(1);
 },[password]) // it will be called when error will be updated


 useEffect(()=>{
  const values={
    "email":email,
    "password":password
  }
  setLoginError(loginResponseValidation(values))
  console.log("pawan");
  console.log("l--?>",loginError)
  console.log("o--->",Object.keys(loginError).length)
 },[email,password])
 
  return (
    <div className={style.parent}>
      <div className={style.container}>
     <div className={style.loginImage}> <img src={image}></img></div>  
        <br/>
        <label>Email</label>
        <br></br>
        <br></br>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {error.message && (
          <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>
        )}
        <br/>
        <br/>
        <label>Password</label>
        <br/>
        <br/>
        
        <input
          type="text"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <br />
        {error.password && (
          <p style={{ color: "red", fontSize: "13px" }}>{error.password}</p>
        )}

        <div className={style.forgot}><a  onClick={()=>navigate("/forgot")} >Forgot Password</a></div>
        <br/>
        <br/>
        <div className={style.error}>
        {loginError&& ((
          <p style={{ color: "red", fontSize: "13px" }}>{loginError.loginError}</p>
        ))}
        </div>
       <div className={style.loginButton}><button onClick={submit}>Submit</button></div> 
      </div>
      <br/>
            <ToastContainer/>
    </div>
  );
}

export default LoginAgain;





// //notes
//      {/* if u want to use the event call it without () and the genuine reason is 
//       that the function will be executed once when the component is rendered,
//        but it will not be called again when the input value changes.
// To fix this issue, you should pass the setEmailFun function as a reference 
// to the onChange event handler, without calling it: 
// just take care only reference will be called */}


// // by default alert take one argument and makes it string and to watch the 
//                               // the object just use json.string

//                               // navigate =navigate=useNavigate()
//                               // navigate(-1) // in place of history 






