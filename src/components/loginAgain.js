
import React, { useEffect } from 'react'
import { useState } from 'react'
import validation from './loginValidation';
import style from "../style/style.module.css"





function LoginAgain() {
    // for setting password and email
const [values,setValues]=useState({
    email:"",
    password:""
})

// for getting the error message
const [error,setError]=useState({});

// previous values with the new one
const handleChange=(e)=>{
     setValues({...values,[e.target.name]:e.target.value})
}

const submit=(e)=>{
    e.preventDefault();
   setError(validation(values));
}


useEffect(()=>{
    if(Object.keys(error).length==0&&(values.email!=""&&values.password!="")){
         alert(JSON.stringify(values))
    }
},[error]) // it will be called when error will be updated


  return (
    <div className={style.parent}>
        <div className={style.container}>
            <label>Email</label>
            <br></br>
            <br></br>
            <input type="text" name="email" value={values.email} onChange={handleChange}  />
            {error.message && (
                  <p style={{color:"red", fontSize:"13px"}}>{error.message}</p>
)}
            <label>Password</label>
            <br></br>
            <br></br>
            <input type="text" name="password" value={values.password} onChange={handleChange}  />
            <br/>
            <br/>
            {error.password && (
              <p style={{color:"red", fontSize:"13px"}}>{error.password}</p>
)}
            <button onClick={submit}>Submit</button>
        </div>
    </div>

  )
}

export default LoginAgain