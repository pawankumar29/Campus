import React, { useEffect } from "react";
import { useState } from "react";
import {validation,loginResponseValidation} from  "./loginValidation";
import style from "../../style/loginPage.module.css";
import image from "../../img/loginLogo.jpg"

function LoginAgain() {
  // for setting password and email
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // for getting the error message
  const [error, setError] = useState({});
  const [loginError,setLoginError]=useState({})

  // previous values with the new one
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
      setLoginError(loginResponseValidation({}))
  };

  useEffect(()=>{

      if(Object.keys(error).length==0&&(values.email!=""&&values.password!="")){
           alert(JSON.stringify(values))
      }
  },[error]) // it will be called when error will be updated

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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
        />
        <br />
        <br />
        {error.password && (
          <p style={{ color: "red", fontSize: "13px" }}>{error.password}</p>
        )}

        <div className={style.forgot}><a href="#">Forgot Password</a></div>
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





//notes
     {/* if u want to use the event call it without () and the genuine reason is 
      that the function will be executed once when the component is rendered,
       but it will not be called again when the input value changes.
To fix this issue, you should pass the setEmailFun function as a reference 
to the onChange event handler, without calling it: 
just take care only reference will be called */}


// by default alert take one argument and makes it string and to watch the 
                              // the object just use json.string

                              // navigate =navigate=useNavigate()
                              // navigate(-1) // in place of history 