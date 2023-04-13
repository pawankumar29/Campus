import React, { useState } from "react";
import Style from "../../style/page-1.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faSearch,faTimeline, faUser,faTable,faSchool ,faQuestionCircle,faWalkieTalkie, faGear} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Page = () => {
  library.add(faUser, faBell,faTable);
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  }; 

  // for date picker
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className={Style.parent}>
        <div className={Style.container1}>
          <div className={Style.c1}>HIRE ME</div>
          <ul>
            <li><FontAwesomeIcon icon={faTable} className={Style.icon}/>DashBoard</li>
            <li><FontAwesomeIcon icon={faSchool} className={Style.icon}/>Institutes</li>
            <li><FontAwesomeIcon icon={faWalkieTalkie} className={Style.icon}/>Walk IN</li>
            <li><FontAwesomeIcon icon={faQuestionCircle} className={Style.icon}/>Question Bank</li>
            <li><FontAwesomeIcon icon={faGear} className={Style.icon}/>Result</li>
          </ul>
        </div>
        <div className={Style.container2}>
          <div className={Style.header}>
            <div className={Style.profile}>
              <p onClick={logOut}>
                {" "}
                <FontAwesomeIcon icon={faUser} /> John Doe
              </p>
            </div>
            <FontAwesomeIcon icon={faBell} className={Style.bell} />
          </div>
          <h1>Institutes</h1>
          <div className={Style.searchMiddle}>
            <div className={Style.searchMiddle1}>
              
              <p>Hiring Institute</p>
              <p>All Institutes</p>
            </div>

            <div className={Style.buttonDiv}>
              <button>Sample File</button>
              <button>Assign&Schedule Test</button>
              <button><Link to={"/addInstitute"} style={{ textDecoration: 'none', color: 'inherit' }}>+Add Institute</Link></button>
            </div>
          </div>

          <div className={Style.searchBar}>
            <div className={Style.searchBar1}>
              {/* <input type="text" placeholder="Search By Date" /> */}
              <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Select a date..."
      />

            </div>
            <div className={Style.searchBar2}>
              <input
                type="text"
                placeholder="Search by Tpo name,institute name or qualification "
              />
            </div>
          </div>
          <br/>
          
          <div >
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Username</th>
          <th>Username</th>
          <th>Username</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
