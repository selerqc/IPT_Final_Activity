import { useState } from "react";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "../styles/AddStudent.css";
import axios from "axios";
import Sidebar from "./Sidebar";

function AddStudent() {
  // Controlled Input State
  const [data, setData] = useState({
    idNumber: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    course: "",
    year: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  // Handle Form Changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const submit = async () => {
    if (
      data.idNumber === "" ||
      data.Firstname === "" ||
      data.Lastname === "" ||
      data.Middlename === "" ||
      data.course === "" ||
      data.year === ""
    ) {
      return setErrorMessage("Please fill up all fields");
    }
    postStudent();
    setData({
      idNumber: "",
      Firstname: "",
      Lastname: "",
      Middlename: "",
      course: "",
      year: "",
    });
  };
  const postStudent = async () => {
    await axios
      .post("http://localhost:1337/api/addStudents", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="container">
        <div className="addStudent">
          <h1>ADD STUDENT</h1>

          <TextField
            label="Id Number:"
            margin="normal"
            name="idNumber"
            value={data.idNumber}
            onChange={handleChange}
          />
          <TextField
            label=" Firstname:"
            margin="normal"
            name="Firstname"
            value={data.Firstname}
            onChange={handleChange}
          />
          <TextField
            label=" Lastname:"
            margin="normal"
            name="Lastname"
            value={data.Lastname}
            onChange={handleChange}
          />
          <TextField
            label=" Middlename:"
            margin="normal"
            name="Middlename"
            value={data.Middlename}
            onChange={handleChange}
          />
          <TextField
            label="Course:"
            margin="normal"
            name="course"
            value={data.course}
            onChange={handleChange}
          />
          <TextField
            label="Year:"
            margin="normal"
            name="year"
            value={data.year}
            onChange={handleChange}
          />

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Button variant="contained" onClick={submit}>
            Add Student
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
          />
        </div>

        {/* 
        <div className="info">
          <p id="header">Student Information</p>
          <p>Id Number: {data.idNumber}</p>
          <p>First Name: {data.Firstname}</p>
          <p>Middle Name: {data.Middlename}</p>
          <p>Last Name: {data.Lastname}</p>
          <p>Course: {data.course}</p>
          <p>Year: {data.year}</p>
        </div> */}
      </div>

      <Sidebar />
    </>
  );
}

export default AddStudent;
