import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import ReusableModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import Sidebar from './Sidebar';
import axios from 'axios';

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
    studentId: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    course: '',
  });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/getStudents')
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:1337/api/addStudents', data)
      .then((response) => {
        console.log('Student added:', response.data.student);
        setStudents([...students, response.data.student]);
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
    setOpen(false);
  };

  const handleEditSubmit = () => {
    // Add logic to handle form submission
    console.log('Updated data:', editData);
    setEditOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'left', padding: '20px', boxShadow: 2 }}>
        <div className="user-header">
          <Typography variant="h4" gutterBottom>
            Manage Students
          </Typography>
          <Typography variant="body1">
            List of Students
          </Typography>
        </div>


      </Box>
      <div style={{ padding: '20px', textAlign: 'right' }}>
        <Sidebar />
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Student
        </Button>
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
          fields={["studentId", "firstname", "lastname", "middlename", "email", "course"]}
        />
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Middlename</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.Firstname}</TableCell>
                  <TableCell>{student.Lastname}</TableCell>
                  <TableCell>{student.Middlename}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => {
                      setEditData({
                        studentId: student.id,
                        firstname: student.Firstname,
                        lastname: student.Lastname,
                        middlename: student.Middlename,
                        email: student.email,
                        course: student.course,
                      });
                      setEditOpen(true);
                    }}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Student;
