import LoginPage from "./components/loginPage.js";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from "./components/privateRoute.js";
import Dashboard from "./components/dashboardPage.js";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about">Home</Link>
              
            </li>
            <li><Link to="/Login">Login</Link></li>
          </ul>
        </nav>
              
        <Routes>
          <Route path="/about" element={<PrivateRoute  Component={<LoginPage/>} />} />
          <Route path="/Login" element={<PrivateRoute  Component={<Dashboard/>} />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
