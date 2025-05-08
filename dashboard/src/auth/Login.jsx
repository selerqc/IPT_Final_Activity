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
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}


        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            inputRef={emailRef}

          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            inputRef={passwordRef}
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

    </Container>
  );
}

export default Login;
