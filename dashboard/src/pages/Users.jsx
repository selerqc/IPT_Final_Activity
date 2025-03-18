import { useState, useEffect, useRef } from "react";
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

function Users() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    UserId: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    Username: "",
    Password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:1337/api/getUsers")
      .then((res) => {
        setStudents(res.data.users);
        console.log(res.data.users);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteStudent = async (UserId) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await axios
        .delete(`http://localhost:1337/api/deleteUsers/${UserId}`)
        .then((res) => {
          console.log(res);
          fetchUsers();
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
      .post("http://localhost:1337/api/addUser", data)
      .then((res) => {
        alert(res.data.message);
        setOpen(false);
        fetchUsers();
        setData({
          UserId: "",
          Firstname: "",
          Lastname: "",
          Middlename: "",
          Username: "",
          Password: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = (student) => {
    setData(student);
    setIsEditing(true);
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    await axios
      .patch(`http://localhost:1337/api/updateUsers/${data.UserId}`, data)
      .then((res) => {
        alert(res.data.message);
        setEditOpen(false);
        fetchUsers();
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
          {["UserId", "Firstname", "Lastname", "Middlename", "Username"].map(
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
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit Student</h2>
          {["Firstname", "Lastname", "Middlename", "Username"].map((field) => (
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
            onClick={handleEditSubmit}>
            Update
          </Button>
        </Box>
      </Modal>

      <div className="addStudentDashboard">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          style={{ justifyContent: "center" }}>
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
                <TableCell className="table-cell">User Id</TableCell>
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
                  Username
                </TableCell>

                <TableCell className="table-cell" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow className="table-row" key={student.UserId}>
                  <TableCell className="table-cell" component="th" scope="row">
                    {student.UserId}
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
                    {student.Username}
                  </TableCell>

                  <TableCell className="table-cell" align="right">
                    <DeleteIcon
                      className="icon"
                      onClick={() => deleteStudent(student.UserId)}
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

export default Users;
