import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
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
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import addInstituteStyle from "../../style/addInstituteStyle.module.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  university: Yup.string()
    .required("Required")
    .max(15, "Must be 15 characters or less"),
  institute: Yup.string()
    .required("Required")
    .max(20, "Must be 20 characters or less"),
  tpo_email: Yup.string().required("Required").email("Invalid email address"),
  tpo_name: Yup.string()
    .required("Required")
    .max(20, "Must be 20 characters or less"),
  tpo_phone_number: Yup.string()
    .required("Required")
    .max(10, "Number cannot be more than 10"),
  qualification: Yup.array()
    .of(Yup.string()) // Allow any string in the array
    .required("At least one qualification is required")
    .min(1, "one"),
});
const AddInstitute = () => {

    const [file,setFile]=useState(null);
  const navigate=useNavigate();
    const handleDrop=(e)=>{
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    }
    const handleDragOver = (event) => {
        event.preventDefault();
      }


  const formik = useFormik({
    initialValues: {
      university: "",
      institute: "",
      tpo_name: "",
      tpo_email: "",
      tpo_phone_number: "",
      qualification: [""],
      file: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
        try {
            
        
      const formData = new FormData();
      formData.append("university", values.university);
      formData.append("institute", values.institute);
      formData.append("tpo_name", values.tpo_name);
      formData.append("tpo_email", values.tpo_email);
      formData.append("tpo_phone_number", values.tpo_phone_number);
      formData.append("qualification", values.qualification);
      if(file)
      formData.append("studentFile", file);
      else
      formData.append("studentFile", values.file);
      console.log(...formData);

      const response=await axios.post("http://localhost:3035/v1/institute/addInstitute",formData);
      
      toast.success(response.data.message);

      if(response.data.status){
    
        setTimeout(()=>{
          navigate("/dashboard");
        },2000)
          
       }
       else
       throw response;
      

    //   resetForm();
    }catch (error) {
      toast.error(JSON.stringify(error.response.data.message));
          //  alert(JSON.stringify(error.response.data)); 
    }
  }
}
  )
 

//   useEffect(() => {
//     console.log("File: ", file); //  to check the file on any change
//   }, [file]); // Add file as a dependency in the array



  return (
    <div className={addInstituteStyle.parent}>
      <div className={addInstituteStyle.firstDiv}>
        <div className={addInstituteStyle.c1}>HIRE ME</div>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faTable}
              className={addInstituteStyle.icon}
            />
            DashBoard
          </li>
          <li>
            <FontAwesomeIcon
              icon={faSchool}
              className={addInstituteStyle.icon}
            />
            Institutes
          </li>
          <li>
            <FontAwesomeIcon
              icon={faWalkieTalkie}
              className={addInstituteStyle.icon}
            />
            Walk IN
          </li>
          <li>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className={addInstituteStyle.icon}
            />
            Question Bank
          </li>
          <li>
            <FontAwesomeIcon icon={faGear} className={addInstituteStyle.icon} />
            Result
          </li>
        </ul>
      </div>

      <div className={addInstituteStyle.secondDiv}>
        <div className={addInstituteStyle.header}>
          <div className={addInstituteStyle.profile}>
            <p>
              <FontAwesomeIcon icon={faUser} /> John Doe
            </p>
          </div>
          <FontAwesomeIcon icon={faBell} className={addInstituteStyle.bell} />
        </div>
        <div className={addInstituteStyle.formSection}>
          <h1>Institute</h1>

          <div className={addInstituteStyle.formSection1}>
            <p>institute  &gt; add Institute</p>
          </div>

          <div className={addInstituteStyle.formSection2}>
            <form onSubmit={formik.handleSubmit}>
              <div className={addInstituteStyle.two1}>
                <div className={addInstituteStyle.two11}>
                  <label htmlFor="university">
                    Name of university<sup>*</sup>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="university"
                    value={formik.values.university}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.university && formik.errors.university && (
                    <div className={addInstituteStyle.error}>
                      {formik.errors.university}
                    </div>
                  )}
                </div>

                <div className={addInstituteStyle.two12}>
                  <label htmlFor="institute">
                    Name of Institute<sup>*</sup>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="institute"
                    value={formik.values.institute}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                    {formik.touched.institute && formik.errors.institute && (
                      <div className={addInstituteStyle.error}>
                        {formik.errors.institute}
                      </div>  // never write the error inside the input 
                    )}
             
                </div>
              </div>



              <div className={addInstituteStyle.two2}>
                <div>
                  <label htmlFor="tpo_name">
                    Name of TPO <sup>*</sup>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="tpo_name"
                    value={formik.values.tpo_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tpo_name && formik.errors.tpo_name && (
                    <div className={addInstituteStyle.error}>{formik.errors.tpo_name}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="tpo_email">
                    TPO email <sup>*</sup>
                  </label>
                  <br />

                  <input
                    type="text"
                    name="tpo_email"
                    value={formik.values.tpo_email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tpo_email && formik.errors.tpo_email && (
                    <div className={addInstituteStyle.error}>{formik.errors.tpo_email}</div>
                  )}
                </div>
              </div>



              <div className={addInstituteStyle.two3}>
                <div>
                  <label htmlFor="tpo_phone_number">
                    TPO phone number<sup>*</sup>
                  </label>
                  <br />
                  <input      // while using sup do not give space      TPO phone number <sup>*</sup>
                    type="text"
                    name="tpo_phone_number"
                    value={formik.values.tpo_phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tpo_phone_number &&
                    formik.errors.tpo_phone_number && (
                      <div className={addInstituteStyle.error}>{formik.errors.tpo_phone_number}</div>
                    )}
                </div>
                <div>
                  <label htmlFor="qualification">qualification</label>
                  <br />
                  <textarea
                    name="qualification"
                    value={formik.values.qualification.join(",")} // Convert the array to a string with newline-separated values
                    onChange={(event) => {
                      const qualifications = event.target.value.split(","); // Split the string into an array of strings by newline
                      formik.setFieldValue("qualification", qualifications); // Update the "qualification" field value using setFieldValue
                    }}
                    onBlur={formik.handleBlur}
                    rows={1} // Set the number of rows for the textarea
                    cols={40} // Set the number of columns for the textarea
                  />
                  {formik.touched.qualification &&
                    formik.errors.qualification && (
                      <div className={addInstituteStyle.error}>{formik.errors.qualification}</div>
                    )}
                </div>
              </div>

  

              <div className={addInstituteStyle.file}  onDrop={handleDrop} onDragOver={handleDragOver}> 
              <label htmlFor="file">
                    upload Student
                  </label>
                  <br />
                  <div className={addInstituteStyle.input}>
                    <div className={addInstituteStyle.icon1} >
                  <FontAwesomeIcon icon={faUpload} />
                  </div>
                <input 
                  type="file"
                  name="file"
                  onChange={(event) =>
                    formik.setFieldValue("file", event.target.files[0])
                  } // Update the "file" field value using setFieldValue
                />
                </div>
              </div>
           <br/>
              <div className={addInstituteStyle.button}>
              <button type="submit">Submit</button>
              <button type="submit">cancel</button>
              </div>
      
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddInstitute;
