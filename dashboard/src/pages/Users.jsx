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

function Users() {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:1337/api/getUsers")
      .then((res) => {
        setUser(res.data.users);
        console.table(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this User?")) {
      await axios
        .delete(`http://localhost:1337/api/deleteUser/${userId}`)
        .then((res) => {
          console.log(res);
          fetchUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setData({});
    await axios
      .post("http://localhost:1337/api/addUser", data)
      .then((res) => {
        alert(res.data.message);
        setOpen(false);
        fetchUsers();
        setData({});
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleEditClick = (user) => {
    setData(user);

    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    await axios
      .patch(`http://localhost:1337/api/updateUser/${data.userId}`, data) // Corrected serId to userId
      .then((res) => {
        alert(res.data.message);
        setEditOpen(false);
        fetchUsers();
        console.table(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className='modal-box'>
          <h2 className='modal-header'>Add User</h2>
          {[

            "firstname",
            "lastname",
            "middlename",
            "email",
            "password",
          ].map((field) => (
            <TextField
              key={field}
              className='text-field'
              label={field}
              name={field}
              value={data[field]}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          ))}
          <Button
            variant='contained'
            className='submit-button'
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className='modal-box'>
          <h2 className='modal-header'>Edit User</h2>
          {[
            "userId",
            "firstname",
            "lastname",
            "middlename",
            "email",
            "password",
          ].map((field) => (
            <TextField
              key={field}
              className='text-field'
              label={field}
              name={field}
              value={data[field]}
              onChange={handleChange}
              fullWidth
              margin='normal'
              disabled={field === "userId"}
            />
          ))}
          <Button
            variant='contained'
            className='submit-button'
            onClick={handleEditSubmit}>
            Update
          </Button>
        </Box>
      </Modal>

      <div className='addStudentDashboard'>
        <Button
          variant='contained'
          onClick={() => setOpen(true)}
          style={{ justifyContent: "center" }}>
          Add New User
        </Button>

        <h1>User Management</h1>
        {user.length === 0 ? (
          <h2>No Users Found</h2>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 1000 }}
              size='small'
              aria-label='a dense table'>
              <TableHead className='table-head'>
                <TableRow>
                  <TableCell className='table-cell'>User Id</TableCell>
                  <TableCell className='table-cell' align='left'>
                    First Name
                  </TableCell>
                  <TableCell className='table-cell' align='left'>
                    Middle Name
                  </TableCell>
                  <TableCell className='table-cell' align='left'>
                    Last Name
                  </TableCell>
                  <TableCell className='table-cell' align='left'>
                    Email
                  </TableCell>

                  <TableCell className='table-cell' align='left'>
                    Password
                  </TableCell>


                  <TableCell className='table-cell' align='left'>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((user) => (
                  <TableRow className='table-row' key={user.userId}>
                    <TableCell className='table-cell' scope='row'>
                      {user.userId}
                    </TableCell>
                    <TableCell className='table-cell' align='left'>
                      {user.firstname}
                    </TableCell>
                    <TableCell className='table-cell' align='left'>
                      {user.middlename}
                    </TableCell>
                    <TableCell className='table-cell' align='left'>
                      {user.lastname}
                    </TableCell>
                    <TableCell className='table-cell' align='left'>
                      {user.email}
                    </TableCell>

                    <TableCell className='table-cell' align='left'>
                      {user.password}
                    </TableCell>


                    <TableCell className='table-cell' align='left'>
                      <DeleteIcon
                        className='icon'
                        onClick={() => deleteUser(user.userId)}
                        style={{
                          marginRight: "10px",
                          color: "red",
                        }}
                      />
                      <EditIcon
                        className='icon'
                        onClick={() => handleEditClick(user)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Sidebar />
    </>
  );
}

export default Users;
