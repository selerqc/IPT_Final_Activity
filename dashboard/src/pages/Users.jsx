import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import ReusableModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import Sidebar from './Sidebar';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Toaster, toast } from 'sonner';
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

  useEffect(() => {
    fetchUsers()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchUsers = () => {
    // Fetch users data from the server
    axios.get('http://localhost:1337/api/getUsers')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleSubmit = () => {
    console.log('Submitting data:', data);
    axios.post('http://localhost:1337/api/addUser', {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      password: data.password
    })
      .then((response) => {
        toast.success('User added successfully!');
        fetchUsers();
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
    setData({
      userId: '',
      firstname: '',
      lastname: '',
      middlename: '',
      email: '',
      password: ''
    });
    setOpen(false);
  };

  const handleEdit = (user) => {
    setData(user);
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    console.log('Updated data:', data);
    axios.patch(`http://localhost:1337/api/updateUser/${data.userId}`, {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      email: data.email,
      password: data.password
    })
      .then((response) => {
        alert('User updated:', response.data.message);
        fetchUsers();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
    setEditOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'left', padding: '20px', boxShadow: 2 }}>
        <div className="user-header">
          <Typography variant="h4" gutterBottom>
            Manage Users
          </Typography>
          <Typography variant="body1">
            List of Users
          </Typography>
        </div>

        <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ height: '45px', width: '130px' }}>
          Add User
        </Button>
      </Box>

      <div style={{ padding: '20px', textAlign: 'right' }}>
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
          fields={["userId", "firstname", "lastname", "middlename", "email", "password"]}
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
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => console.log('Delete', user)}>Delete</Button>
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
};

export default Users;
