import React, { useEffect } from "react";
import { useState } from "react";
import {emailValidation,loginResponseValidation,passwordValidation} from  "./loginValidation";
import style from "../../style/loginPage.module.css";
import image from "../../img/loginLogo.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    setLoginError(loginResponseValidation(values))
      if(Object.keys(error).length==0&&(values.email!=""&&values.password!="")){
         const result=await axios.post("http://localhost:3035/v1/login",values);
         if(result.status){
          localStorage.setItem("token",result.data.data);
            navigate("/dashboard");
         }
         else{
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





// import React, { useEffect } from "react";
// import { useState } from "react";
// import { validation, loginResponseValidation } from "./loginValidation";
// import style from "../../style/loginPage.module.css";
// import image from "../../img/loginLogo.jpg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function LoginAgain() {
//   const navigate = useNavigate();
//   // for setting password and email
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   // for getting the error message
//   const [error, setError] = useState({});
//   const [loginError, setLoginError] = useState({});
//   const [firstCounter,setFirstCounter]=useState(0);

//   // previous values with the new one
//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoginError(loginResponseValidation({}));
//     if (Object.keys(error).length == 0 && values.email && values.password) {
//       const result = await axios.post("http://localhost:3035/v1/login", values);

//       if (result.status) {
//         localStorage.setItem("token", result.data.data);
//         navigate("/dashboard");
//       } else {
//         localStorage.setItem("token", null);
//       }
//     }
//   };

//   useEffect(() => {

//     if (Object.keys(error).length == 0 && values.email && values.password) {
//       setLoginError({}); // clear the error message
   
//     }
//   }, [error]); // update the effect dependencies

//   useEffect(() => {
//     // validate the email and password fields
//     setError(validation(values,firstCounter));
//     setFirstCounter(1);
//   }, [ values.email, values.password]);

//   return (
//     <div className={style.parent}>
//       <div className={style.container}>
//         <div className={style.loginImage}>
        
//           <img src={image}></img>
//         </div>
//         <br />
//         <label>Email</label>
//         <br></br>
//         <br></br>
//         <input
//           type="text"
//           name="email"
//           value={values.email}
//           onChange={handleChange}
//         />
//       {error.message &&(
//   <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>
// )}
//         <br />
//         <br />
//         <label>Password</label>
//         <br />
//         <br />

//         <input
//           type="text"
//           name="password"
//           value={values.password}
//           onChange={handleChange}
//         />
//         <br />
//         <br />
//         {/* {Object.values(error).length > 0 && (
//           <p style={{ color: "red", fontSize: "13px" }}>{error.password}</p>
//         )} */}

// { error.password && (
//   <p style={{ color: "red", fontSize: "13px" }}>{error.password}</p>
// )}

//         <div className={style.forgot}>
//           <a onClick={() => navigate("/forgot")}>Forgot Password</a>
//         </div>
//         <br />
//         <br />
//         <div className={style.error}>
          
//           {Object.values(loginError).length > 0  && (
//             <p style={{ color: "red", fontSize: "13px" }}>
//               {loginError.loginError}
//             </p>
//           )}
//         </div>
//         <div className={style.loginButton}>
//           <button onClick={submit}>Submit</button>
//         </div>
//       </div>
//       <br />
//     </div>
//   );
// }

// export default LoginAgain;
