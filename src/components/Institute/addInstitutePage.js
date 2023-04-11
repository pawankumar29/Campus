import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  university: Yup.string()
    .required('Required')
    .max(15, 'Must be 15 characters or less'),
  institute: Yup.string()
    .required('Required')
    .max(20, 'Must be 20 characters or less'),
  tpo_email: Yup.string()
    .required('Required')
    .email('Invalid email address'),
  tpo_name: Yup.string()
    .required("Required")
    .max(20, 'Must be 20 characters or less'),
  tpo_phone_number: Yup.string()
    .required("Required")
    .max(10, "Number cannot be more than 10"),
    qualification: Yup.array()
    .of(Yup.string()) // Allow any string in the array
    .required('At least one qualification is required').min(1,"one"), 
});

const AddInstitute = () => {
  const formik = useFormik({
    initialValues: {
      university: "",
      institute: "",
      tpo_name: "",
      tpo_email: "",
      tpo_phone_number: "",
      qualification: [""],
      file: null
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
     console.log("pawan");
      // Handle form submission logic here
      // You can access form data using values object
//       const token = "your_jwt_token"; // Replace with your actual JWT token

// const headers = {
//   "Content-Type": "multipart/form-data",
//   "Authorization": `Bearer ${token}` // Use a meaningful header field name and include the token using "Bearer" scheme
// };

const formData = new FormData();
formData.append("university", values.university);
formData.append("institute", values.institute);
formData.append("tpo_name", values.tpo_name);
formData.append("tpo_email", values.tpo_email);
formData.append("tpo_phone_number", values.tpo_phone_number);
formData.append("qualification", values.qualification);
formData.append("file", formik.values.file);
console.log(...formData);
alert(formData.get("institute"));

resetForm();
    }
  });

  return (
    <div>
      <h1>Add Institute Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="university"
          value={formik.values.university}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.university && formik.errors.university && (
          <div>{formik.errors.university}</div>
        )}
        <input
          type="text"
          name="institute"
          value={formik.values.institute}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.institute && formik.errors.institute && (
          <div>{formik.errors.institute}</div>
        )}
        <input
          type="text"
          name="tpo_name"
          value={formik.values.tpo_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.tpo_name && formik.errors.tpo_name && (
          <div>{formik.errors.tpo_name}</div>
        )}

<label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="tpo_email"
          value={formik.values.tpo_email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.tpo_email && formik.errors.tpo_email && (
          <div>{formik.errors.tpo_email}</div>
        )}
        <input
          type="text"
          name="tpo_phone_number"
          value={formik.values.tpo_phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.tpo_phone_number && formik.errors.tpo_phone_number && (
          <div>{formik.errors.tpo_phone_number}</div>
        )}
        {/* Render other form fields here */}

        <textarea
  name="qualification"
  value={formik.values.qualification.join(',')} // Convert the array to a string with newline-separated values
  onChange={(event) => {
    const qualifications = event.target.value.split(','); // Split the string into an array of strings by newline
    formik.setFieldValue('qualification', qualifications); // Update the "qualification" field value using setFieldValue
  }}
  onBlur={formik.handleBlur}
  rows={1} // Set the number of rows for the textarea
  cols={40} // Set the number of columns for the textarea
/>
{formik.touched.qualification && formik.errors.qualification && (
  <div>{formik.errors.qualification}</div>
)}

<input
          type="file"
          name="file"
          onChange={(event) => formik.setFieldValue('file', event.target.files[0])} // Update the "file" field value using setFieldValue
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddInstitute




//https://stackoverflow.com/questions/69790542/yup-validation-of-first-and-last-element-in-array-of-objects