import React from "react";
import AllInstitutePageStyle from "../../style/AllInstitutePageStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faSearch,
  faTimeline,
  faUser,
  faTable,
  faSchool,
  faQuestionCircle,
  faWalkieTalkie,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';

const AllInstitutePage = () => {
  const years = [];
  const year = new Date().getFullYear();

  for (let i = 2000; i < year; i++) {
    years.push(i);
  }

  return (
    <div className={AllInstitutePageStyle.parent}>
      <div className={AllInstitutePageStyle.div1}></div>
      <div className={AllInstitutePageStyle.div2}>
        <div className={AllInstitutePageStyle.div21}>
          <h1>institutes</h1>
          <div className={AllInstitutePageStyle.div211}>
            <FontAwesomeIcon icon={faBell} />

            <span>
              <FontAwesomeIcon icon={faUser} />
              John Doe
            </span>
          </div>
        </div>
        <div className={AllInstitutePageStyle.none1}>
          <span>&gt;</span>
        </div>
        <div className={AllInstitutePageStyle.div22}>
          <span className={AllInstitutePageStyle.div221}>
            Hiring Institutes
          </span>
          <span className={AllInstitutePageStyle.div222}>All Institutes</span>
        </div>
        <div className={AllInstitutePageStyle.div23}>
          <div className={AllInstitutePageStyle.div231}>
            <div className={AllInstitutePageStyle.div2311}>
              Academic Year{" "}
              <select>
                {years.map((year) => {
                  return <option>{year}</option>;
                })}
              </select>
            </div>

            <div className={AllInstitutePageStyle.div2312}>Search By Date</div>
            <div className={AllInstitutePageStyle.div2313}>
              {" "}
              <input
                type="text"
                placeholder="search by institute and qualification"
              />
            </div>
          </div>
         
          <div className={AllInstitutePageStyle.div232}>
          
          <Table striped bordered hover>

          <thead>
            <tr>
            <th ><input style={{"width":"20px"}} type="checkbox"/></th>
            <th>S.No</th>
            <th colspan="2">Institute Name</th>
            <th  colspan="2">University Name</th>
            <th  colspan="2">Qualification</th>
            <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td colSpan="2">1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>

          </Table>



          </div>
          <div className={AllInstitutePageStyle.div233}></div>
        </div>
      </div>
    </div>
  );
};

export default AllInstitutePage;
