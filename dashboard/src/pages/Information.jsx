import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "../styles/Information.css";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function Information() {
  const [data, setData] = useState([]);

  const handleSuccessToast = (message) => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:1337/api/students");
        setData(response.data.data);
      } catch {
        handleErrorToast("An error occurred while fetching data");
      }
    }
    fetchData();
  }, []);

  const deleteStudent = async (idNumber) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/api/deleteStudents/${idNumber}`
      );
      setData((prevData) =>
        prevData.filter((student) => student.idNumber !== idNumber)
      );
      handleSuccessToast(response.data.message);
    } catch (err) {
      handleErrorToast(err.response.data.message);
    }
  };

  return (
    <>
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Student Information
      </motion.h1>
      {data.length === 0 && <p>No data available</p>}
      <div className="infoContainer">
        <ToastContainer />
        <AnimatePresence>
          {data.map((student, index) => (
            <motion.div
              key={student.idNumber}
              className="student-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}>
              <span id="delete" onClick={() => deleteStudent(student.idNumber)}>
                <DeleteIcon style={{ color: "red" }} />
              </span>

              <div className="info-row">
                <strong>Id Number:</strong> <span>{student.idNumber}</span>
              </div>
              <div className="info-row">
                <strong>First Name:</strong> <span>{student.Firstname}</span>
              </div>
              <div className="info-row">
                <strong>Middle Name:</strong> <span>{student.Middlename}</span>
              </div>
              <div className="info-row">
                <strong>Last Name:</strong> <span>{student.Lastname}</span>
              </div>
              <div className="info-row">
                <strong>Course:</strong> <span>{student.course}</span>
              </div>
              <div className="info-row">
                <strong>Year:</strong> <span>{student.year}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Sidebar />
    </>
  );
}

export default Information;
