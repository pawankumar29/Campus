import React from 'react';
import { useFormik } from 'formik';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

// // app.js

// import Dashboard from './component/dashboard';
// import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
// import ProtectedRoute from './component/protected.js';
// import Page from "./component/page.js"

// import { useState } from 'react';
// function App() {
 
//   const [value,setValue]=useState(1);
//   const [linkclicked,setLinkClicked]=useState(false);
//  function fun(){
//   setValue(value+1);
//   console.log("v-->",value);
//     if((value)%2===0)
//     localStorage.setItem("bool",true);
   
//     else
//     localStorage.setItem("bool",false);

//  }

//  function set(){
//   setLinkClicked(true);
//  }
//   return (
//     <Router>
//      {!linkclicked && (
//   <ul>
//     <li><Link to="/home" onClick={set}>Pawan</Link></li>
//     <li><Link to="/page" >Page</Link></li>
//   </ul>
// )}


//       <button onClick={fun}>True</button>
//     <Routes>
//     <Route path="/home" element={<ProtectedRoute Comp={Dashboard} /> } />
//     <Route path="/page" element={<Page/>} />
//     </Routes>

//     </Router>
  
//   );
// }

// export default App;


// // // mistakes happened 
// // 1.how to use Router
// //  Browserouter>routes>routes
// // 2.always keep the state variable   {!linkclicked && (
// //   <ul>
// //     <li><Link to="/home">Pawan</Link></li>
// //   </ul>
// // )}



// protected route


// import React from "react";

// const protectedRoute=(props)=>{

//   const {Comp }=props
//   const state=localStorage.getItem("bool");
// console.log("isP-->",state);
//     return(
//         state=="true"?<Comp/>:<h1>No page</h1>


//     )




// }


// export default protectedRoute;


//2
{/*       
        <nav>
          <ul>
            <li>
              <Link to="/dash">Home</Link>
              
            </li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav> */}


  ///3
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




// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignupForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

    
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};


export default SignupForm;







