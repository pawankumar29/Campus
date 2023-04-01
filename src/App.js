
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/privateRoute.js";
import Dashboard from "./components/dashboardPage.js";
import Login from "./components/Authentication/loginPage.js";
import ForgotPassword from './components/Authentication/forgotPasswordPage.js';
import ResetPassword from './components/Authentication/resetPasswordPage.js';
function App() {
 
  return (
    <Router>

              
        <Routes>
         <Route path="/dashboard" element={<PrivateRoute  Component={Dashboard}/>} />
          <Route path="/forgot" element={<ForgotPassword/>}  />   
          <Route path="/" element={<Login/>}  />  
          <Route path="/reset" element={<ResetPassword/>}  /> 

          {/* // necessary to give <LoginPage/> */}
           
        </Routes>

      {/* <button >Click</button> */}

    </Router>

  );
}

export default App;







//-------------------

// int sum(int a[],int n,int i){
//   int sum1=0;
//   cout<<"n"<<endl;
//   if(i<n){
//   cout<<"i-->"<<i<<endl;
//    sum1=sum1+sum(a,n,++i);
//    return 0;
//   }

//  return sum1;

// }