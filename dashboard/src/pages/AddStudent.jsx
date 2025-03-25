import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/AddStudent.css";

// Table components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Icons
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";

function AddStudent() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [data, setData] = useState({
    idNumber: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    await axios
      .get("http://localhost:1337/api/getStudents")
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteStudent = async (idNumber) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await axios
        .delete(`http://localhost:1337/api/deleteStudents/${idNumber}`)
        .then((res) => {
          console.log(res);
          fetchStudents();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:1337/api/addStudents", data)
      .then((res) => {
        alert("New Student Added");
        console.log(res.data.Student);
        setOpen(false);
        fetchStudents();
        setData({
          idNumber: "",
          Firstname: "",
          Lastname: "",
          Middlename: "",
          course: "",
          year: "",
        });
      })
      .catch((error) => {
        alert("Student Already Exists");
        console.log(error);
      });
  };

  const handleEditClick = (student) => {
    setData(student);
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    await axios
      .patch(`http://localhost:1337/api/updateStudent/${data.idNumber}`, data)
      .then((res) => {
        alert("Student Updated");
        setEditOpen(false);
        fetchStudents();
        console.table(res.data.students);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Add Student</h2>
          {[
            "idNumber",
            "Firstname",
            "Lastname",
            "Middlename",
            "course",
            "year",
          ].map((field) => (
            <TextField
              key={field}
              className="text-field"
              label={field}
              name={field}
              value={data[field]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <Button
            variant="contained"
            className="submit-button"
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit Student</h2>
          {["Firstname", "Lastname", "Middlename", "course", "year"].map(
            (field) => (
              <TextField
                key={field}
                className="text-field"
                label={field}
                name={field}
                value={data[field]}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            )
          )}
          <Button
            variant="contained"
            className="submit-button"
            onClick={handleEditSubmit}>
            Update
          </Button>
        </Box>
      </Modal>

      <div className="addStudentDashboard">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Student
        </Button>
        <h1>Student Management</h1>

        <TableContainer className="table-container" component={Paper}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-cell">Id Number</TableCell>
                <TableCell className="table-cell" align="right">
                  First Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Middle Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Last Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Course
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Year
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow className="table-row" key={student.idNumber}>
                  <TableCell className="table-cell" scope="row">
                    {student.idNumber}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {student.Firstname}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {student.Middlename}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {student.Lastname}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {student.course}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {student.year}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    <DeleteIcon
                      className="icon"
                      onClick={() => deleteStudent(student.idNumber)}
                      style={{
                        marginRight: "10px",
                        color: "red",
                      }}
                    />
                    <EditIcon
                      className="icon"
                      onClick={() => handleEditClick(student)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Sidebar />
    </>
  );
}

export default AddStudent;
