import { useState, useEffect } from "react";
import { Box, Typography, Grid2, IconButton, Tooltip, CircularProgress } from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchStudents(), fetchUsers()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/getStudents");
      setStudentCount(response.data.studentCount);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/getUsers");
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ top: 0, left: 0, position: "fixed", width: "100%" }}>
        <Navbar />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3, mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <div>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to your management dashboard. Here&apos;s an overview of your system.
            </Typography>
          </div>
          <Tooltip title="Refresh Data">
            <IconButton onClick={fetchData} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid2 container spacing={3}>
          <Grid2 item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SchoolIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                  <div>
                    <Typography color="text.secondary" variant="h6">
                      Total Students
                    </Typography>
                    <Typography variant="h3">
                      {loading ? <CircularProgress size={30} /> : studentCount}
                    </Typography>
                  </div>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Currently enrolled students in the system
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 40, color: "secondary.main", mr: 2 }} />
                  <div>
                    <Typography color="text.secondary" variant="h6">
                      Total Users
                    </Typography>
                    <Typography variant="h3">
                      {loading ? <CircularProgress size={30} /> : userCount}
                    </Typography>
                  </div>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Active users with system access
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}

export default Dashboard;
