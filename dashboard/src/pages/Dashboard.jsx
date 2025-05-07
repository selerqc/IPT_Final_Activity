import { React, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import { Box, Typography } from "@mui/material";
import axios from "axios";
function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);


  const fetchStudents = async () => {
    await axios.get("http://localhost:1337/api/getStudents")
      .then((response) => {
        setStudentCount(response.data.studentCount);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }

  const fetchUsers = async () => {
    await axios.get("http://localhost:1337/api/getUsers").then((response) => {
      setUserCount(response.data.userCount);
    }).catch((error) => {
      console.error("Error fetching users:", error);
    });


  }

  useEffect(() => {
    fetchStudents();
    fetchUsers();
  }
    , []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            boxShadow: 3,
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the dashboard! Here you can manage your application.
          </Typography>
        </Box>


      </Box >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Total Students: {studentCount}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Users: {userCount}
        </Typography>
      </Box>
    </>
  );
}

export default Dashboard;
