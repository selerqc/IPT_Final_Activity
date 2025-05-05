import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Sidebar from "./Sidebar";

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

// Enhanced UI components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Card components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

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
      .post("http://localhost:1337/api/addStudents", {
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Middlename: data.Middlename,
        course: data.course,
        year: data.year,
      })
      .then((res) => {
        alert("New Student Added");
        setData(res.data.student);
        console.log(res.data.message);
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
        alert(error.response.data.message);
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
        <Box className="modal-box" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Student
          </Typography>
          <Grid container spacing={2}>
            {["Firstname", "Lastname", "Middlename", "course", "year"].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field}
                  name={field}
                  value={data[field]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Student
          </Typography>
          <Grid container spacing={2}>
            {["idNumber", "Firstname", "Lastname", "Middlename", "course", "year"].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field}
                  name={field}
                  value={data[field]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={field === "idNumber"}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleEditSubmit}
          >
            Update
          </Button>
        </Box>
      </Modal>

      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" component="h1">
              Student Management
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              Add Student
            </Button>
          </Grid>
        </Grid>

        {/* New Box for Student Count */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Total Students" sx={{ textAlign: "center" }} />
              <CardContent>
                <Typography variant="h5" component="p" align="center">
                  {students.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {[
                  "Id Number",
                  "First Name",
                  "Middle Name",
                  "Last Name",
                  "Course",
                  "Year",
                  "Actions",
                ].map((header) => (
                  <TableCell key={header} align="center">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.idNumber} hover>
                  <TableCell align="center">{student.idNumber}</TableCell>
                  <TableCell align="center">{student.Firstname}</TableCell>
                  <TableCell align="center">{student.Middlename}</TableCell>
                  <TableCell align="center">{student.Lastname}</TableCell>
                  <TableCell align="center">{student.course}</TableCell>
                  <TableCell align="center">{student.year}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon
                      onClick={() => deleteStudent(student.idNumber)}
                      sx={{ cursor: "pointer", color: "error.main", mr: 1 }}
                    />
                    <EditIcon
                      onClick={() => handleEditClick(student)}
                      sx={{ cursor: "pointer", color: "primary.main" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Sidebar />
    </>
  );
}

export default AddStudent;
