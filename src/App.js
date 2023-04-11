
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/privateRoute.js";
import Dashboard from "./components/dashboardPage.js";
import Login from "./components/Authentication/loginPage.js";
import ForgotPassword from './components/Authentication/forgotPasswordPage.js';
import ResetPassword from './components/Authentication/resetPasswordPage.js';
import Page from './components/Institute/page-1.js';
import SignUp from "./components/helper.js"
import AddInstitute from './components/Institute/addInstitutePage.js';


function App() {
 
  return (
    <Router>
        
              
        <Routes>
         <Route path="/dashboard" element={<PrivateRoute  Component={Page}/>} />
         

          <Route path="/forgot" element={<ForgotPassword/>}  />   
          <Route path="/" element={<AddInstitute/>}  />  
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