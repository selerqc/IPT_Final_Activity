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
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Fade,
  Paper
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from '@mui/icons-material/AccountCircle';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`http://localhost:1337/api/Login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (rememberMe) {
        localStorage.setItem('userEmail', emailRef.current.value);
      } else {
        localStorage.removeItem('userEmail');
      }

      setSuccess(res.data.status);
      setError("");
      setTimeout(() => navigate("/Dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            padding: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}
          >
            <AccountCircle sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please login to your account
            </Typography>
          </Box>

          {error && (
            <Fade in={true}>
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            </Fade>
          )}
          {success && (
            <Fade in={true}>
              <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
            </Fade>
          )}

          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
              <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                type="email"
                inputRef={emailRef}
                required
                defaultValue={localStorage.getItem('userEmail') || ''}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
              <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                label="Password"
                variant="standard"
                required
                inputRef={passwordRef}
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          component="span"
                          onClick={handleClickShowPassword}
                          sx={{ cursor: 'pointer', display: 'flex' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Box>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />

            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 2,
                },

              }}
            >
              Login
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 3, textAlign: "left" }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/Signup"
              style={{
                color: "blue",
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Fade>
    </Container>
  );
}

export default Login;
