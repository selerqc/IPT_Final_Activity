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
    fetchUsers();
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

  const fetchUsers = async () => {

    try {
      const response = await axios.get('http://localhost:1337/api/getUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setAlert({ message: 'Error fetching users!', severity: 'error', visible: true });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:1337/api/addUser', {
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: data.middlename,
        email: data.email,
        password: data.password
      });
      setAlert({ message: 'User added successfully!', severity: 'success', visible: true });
      await fetchUsers();
      setOpen(false);
      clearForm();
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Error adding user!', severity: 'error', visible: true });
    }
  };

  const handleEdit = (user) => {
    setData(user);
    setEditOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:1337/api/deleteUser/${userId}`);
      setAlert({ message: 'User deleted successfully!', severity: 'success', visible: true });
      await fetchUsers();
    } catch (error) {
      setAlert({ message: 'Error deleting user!', severity: 'error', visible: true });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:1337/api/updateUser/${data.userId}`, {
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: data.middlename,
        email: data.email,
        password: data.password
      });
      setAlert({ message: 'User updated successfully!', severity: 'success', visible: true });
      clearForm();
      await fetchUsers();
      setEditOpen(false);
    } catch (error) {
      setAlert({ message: 'Error updating user!', severity: 'error', visible: true });
    }
  };

  const clearForm = () => {
    setData({
      userId: '',
      firstname: '',
      lastname: '',
      middlename: '',
      email: '',
      password: ''
    });
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
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Manage Users
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Manage system users
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
          fields={["userId", "firstname", "lastname", "middlename", "email"]}
        />

        <TableContainer component={Paper} sx={{
          boxShadow: 2,

        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>User Id</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Firstname</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Lastname</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Middlename</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Password</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
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
                  <TableCell>••••••••</TableCell>
                  <TableCell sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ":hover": { transform: 'translateY(-2px)' } }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ":hover": { transform: 'translateY(-2px)' } }}
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No users found
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

export default Users;
