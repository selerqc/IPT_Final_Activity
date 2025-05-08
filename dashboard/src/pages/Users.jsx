import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import ReusableModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import axios from 'axios';
import Box from '@mui/material/Box';
import SimpleAlert from '../components/SimpleAlert';
import Navbar from '../components/Navbar';
const Users = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState({
    userId: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '', visible: false });
  useEffect(() => {
    fetchUsers()
  }, []);
  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchUsers = () => {

    axios.get('http://localhost:1337/api/getUsers')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:1337/api/addUser', {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      password: data.password
    })
      .then((response) => {
        fetchUsers();
        setAlert({ message: 'User added successfully!', severity: 'success', visible: true });

        setOpen(false);
      })
      .catch((error) => {
        setAlert({ message: error.response.data.message, severity: 'error', visible: true });
        console.log(error)
      });


  };

  const handleEdit = (user) => {

    setData(user);
    setEditOpen(true);
  };
  const handleDelete = (userId) => {
    axios.delete(`http://localhost:1337/api/deleteUser/${userId}`)
      .then((response) => {
        setAlert({ message: 'User deleted successfully!', severity: 'success', visible: true });
        fetchUsers();
      })
      .catch((error) => {
        setAlert({ message: 'Error deleting user!', severity: 'error', visible: true });
      });
  };
  const handleEditSubmit = () => {
    axios.patch(`http://localhost:1337/api/updateUser/${data.userId}`, {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      password: data.password
    })
      .then((response) => {
        setAlert({ message: 'User updated successfully!', severity: 'success', visible: true });
        setData({
          userId: '',
          firstname: '',
          lastname: '',
          middlename: '',
          email: '',
          password: ''
        });
        fetchUsers();
      })
      .catch((error) => {
        setAlert({ message: 'Error updating user!', severity: 'error', visible: true });
      });
    setEditOpen(false);
  };

  return (
    <>
      <Box sx={{ top: 0, left: 0, position: "fixed", width: "100%" }}>
        <Navbar />
      </Box>
      {alert.visible && (
        <SimpleAlert message={alert.message} severity={alert.severity} />
      )}
      <Box sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        p: 3,
        mt: 10
      }}>
        <div className="user-header">
          <Typography variant="h4" gutterBottom>
            Manage Users
          </Typography>
          <Typography variant="body1">
            List of Users
          </Typography>
        </div>


      </Box>

      <div style={{ padding: '20px', textAlign: 'right' }}>
        <Button variant="contained" color="primary" sx={{ ":hover": { transform: 'translateY(-2px)' } }} onClick={() => setOpen(true)}>
          Add User
        </Button>
        <ReusableModal
          open={open}
          onClose={() => setOpen(false)}
          title="Add User"
          fields={["firstname", "lastname", "middlename", "email", "password"]}
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <EditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          data={data}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit}
          title="Edit User"
          fields={["userId", "firstname", "lastname", "middlename", "email",]}
        />
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Middlename</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.middlename}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{}}>Password is Hashed!!!</TableCell>
                  <TableCell sx={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" color="primary" sx={{ ":hover": { transform: 'translateY(-2px)' } }} onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="contained" color="error" sx={{ ":hover": { transform: 'translateY(-2px)' } }} onClick={() => handleDelete(user.userId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div >

    </>
  );
};

export default Users;
