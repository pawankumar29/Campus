
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/privateRoute.js";
import Dashboard from "./components/dashboardPage.js";
import Login from "./components/Authentication/loginPage.js";
import ForgotPassword from './components/Authentication/forgotPasswordPage.js';
function App() {
 
  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/dash">Home</Link>
              
            </li>
            <li><Link to="/">Login</Link></li>
          </ul>
        </nav> */}
              
        <Routes>
         <Route path="/dash" element={<PrivateRoute  Component={Dashboard}/>} />
          <Route path="/" element={<ForgotPassword/>}  />    

          {/* // necessary to give <LoginPage/> */}
           
        </Routes>

      {/* <button >Click</button> */}

    </Router>

  );
}

export default App;
