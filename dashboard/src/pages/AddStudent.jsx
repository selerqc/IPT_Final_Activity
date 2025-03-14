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

  // Handle Form Changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSuccesToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };
  const handleErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
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
      return handleErrorToast("All fields are required");
    } else if (isNaN(data.idNumber) || isNaN(data.year)) {
      return handleErrorToast("Id Number and Year must be a number");
    } else {
      console.log("Submitting data:", data);
      postStudent();
      setData({
        idNumber: "",
        Firstname: "",
        Lastname: "",
        Middlename: "",
        course: "",
        year: "",
      });
    }
  };
  const postStudent = async () => {
    await axios
      .post("http://localhost:1337/api/addStudents", {
        idNumber: data.idNumber,
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Middlename: data.Middlename,
        course: data.course,
        year: data.year,
      })
      .then((res) => {
        handleSuccesToast(res.data.message);
        window.location.href = "/Information";
      })

      .catch((err) => {
        handleErrorToast(err.response.data.message);
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
      </div>

      <Sidebar />
    </>
  );
}

export default AddStudent;
