import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, Grid2
} from '@mui/material';
import ReusableModal from '../components/AddModal';
import EditModal from '../components/EditModal';

import axios from 'axios';
import SimpleAlert from '../components/SimpleAlert';
import Navbar from '../components/Navbar';

const Student = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [data, setData] = useState({
    Firstname: '',
    Lastname: '',
    Middlename: '',
    course: '',
    year: ''
  });
  const [editData, setEditData] = useState({
    idNumber: '',
    firstname: '',
    lastname: '',
    middlename: '',
    course: '',
    year: '',
  });
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '', visible: false });

  useEffect(() => {
    fetchStudents();

  }, []);
  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  const fetchStudents = async () => {

    try {
      const response = await axios.get('http://localhost:1337/api/getStudents');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      setAlert({ message: 'Error fetching students!', severity: 'error', visible: true });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/addStudents', data);
      setAlert({ message: 'Student added successfully!', severity: 'success', visible: true });
      setStudents([...students, response.data.student]);
      setOpen(false);
      clearForm();
    } catch (error) {
      setAlert({ message: 'Error adding student!', severity: 'error', visible: true });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:1337/api/updateStudent/${editData.idNumber}`, editData);
      setAlert({ message: 'Student updated successfully!', severity: 'success', visible: true });
      await fetchStudents();
      setEditOpen(false);
    } catch (error) {
      setAlert({ message: 'Error updating student!', severity: 'error', visible: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/deleteStudents/${id}`);
      setAlert({ message: 'Student deleted successfully!', severity: 'success', visible: true });
      await fetchStudents();
    } catch (error) {
      setAlert({ message: 'Error deleting student!', severity: 'error', visible: true });
    }
  };

  const clearForm = () => {
    setData({
      Firstname: '',
      Lastname: '',
      Middlename: '',
      course: '',
      year: ''
    });
  };





  return (
    <>
      <Box sx={{ top: 0, left: 0, position: "fixed", width: "100%" }}>
        <Navbar />
      </Box>
      {alert.visible && (
        <SimpleAlert
          message={alert.message}
          severity={alert.severity}
        />
      )}
      <Box sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        p: 3,
        mt: 10,
      }}>
        <div className="user-header">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Manage Students
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Manage student records
          </Typography>
        </div>


        <Grid2 item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ ":hover": { transform: 'translateY(-2px)' } }}
            onClick={() => setOpen(true)}
          >
            Add User
          </Button>
        </Grid2>


        <ReusableModal
          open={open}
          onClose={() => setOpen(false)}
          title="Add Student"
          fields={["Firstname", "Lastname", "Middlename", "course", "year"]}
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <EditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          data={editData}
          handleChange={handleEditChange}
          handleSubmit={handleEditSubmit}
          title="Edit Student"
          fields={["idNumber", "firstname", "lastname", "middlename", "course", "year"]}
        />

        <TableContainer component={Paper} sx={{
          mt: 2,
          boxShadow: 2,

        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Id Number</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Firstname</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Lastname</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Middlename</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Course</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Year</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.idNumber}</TableCell>
                  <TableCell>{student.Firstname}</TableCell>
                  <TableCell>{student.Lastname}</TableCell>
                  <TableCell>{student.Middlename}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ":hover": { transform: 'translateY(-2px)' } }}
                      onClick={() => {
                        setEditData({
                          idNumber: student.idNumber,
                          firstname: student.Firstname,
                          lastname: student.Lastname,
                          middlename: student.Middlename,
                          course: student.course,
                          year: student.year,
                        });
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ":hover": { transform: 'translateY(-2px)' } }}
                      onClick={() => handleDelete(student.idNumber)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No students found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Student;
