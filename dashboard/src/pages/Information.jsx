import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "../styles/Information.css";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
function Information() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:1337/api/students")
        .then((response) => {
          setData(response.data.data);
        })
        .catch(() => {
          console.log("failed");
        });
    }
    fetchData();
  }, [data]);
  const deleteStudent = async (idNumber) => {
    await axios
      .delete(`http://localhost:1337/api/deleteStudents/${idNumber}`)
      .then((response) => {
        setData((prevData) =>
          prevData.filter((student) => student.idNumber !== idNumber)
        );
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <h1 className="title">Student Information</h1>
      <div className="infoContainer">
        {data.map((student, index) => (
          <div key={index} className="student-info">
            <span id="delete" onClick={() => deleteStudent(student.idNumber)}>
              <DeleteIcon style={{ color: "red" }} />
            </span>
            <span id="delete" onClick={() => deleteStudent(student.idNumber)}>
              <EditOutlinedIcon style={{ color: "green" }} />
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
          </div>
        ))}
      </div>

      <Sidebar />
    </>
  );
}

export default Information;
