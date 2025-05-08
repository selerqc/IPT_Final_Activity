import { React, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
      <Box sx={{ top: 0, left: 0, position: "fixed", width: "100%" }}>
        <Navbar />
      </Box>
      <Box sx={{ display: "flex" }}>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",

            p: 3,
            mt: 10,
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
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'left', mt: 3, }}>
        <Card sx={{ minWidth: 300, ":hover": { boxShadow: 3 } }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'left', }}>
              Student Count
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 2, textAlign: 'left', }}>
              {studentCount}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 300, ":hover": { boxShadow: 3 } }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'left', }}>
              User Count
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 2, textAlign: 'left', }}>
              {userCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>


    </>
  );
}

export default Dashboard;
