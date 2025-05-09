import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,

} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailIcon from '@mui/icons-material/Mail';
function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const res = await axios.post(`http://localhost:1337/api/Login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setSuccess(res.data.status);
      setError("");
      setTimeout(() => navigate("/Dashboard"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}

      >
        <Typography variant="h4" gutterBottom >
          Welcome Back

        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          Please login to your account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}


        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} method="POST">
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            margin="normal"
            type="email"
            inputRef={emailRef}


            slotProps={{
              input: {

                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }
            }}
          />



          <TextField
            fullWidth
            label="Password"
            variant="standard"
            margin="normal"
            type="password"
            inputRef={passwordRef}

            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }
            }}
          />



          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account? <Link to="/Signup" style={{ color: "blue" }}>Signup</Link>
        </Typography>
      </Box>

    </Container >
  );
}

export default Login;
