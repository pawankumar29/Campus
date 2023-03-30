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
