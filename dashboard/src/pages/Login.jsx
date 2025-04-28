import { useEffect, useRef, useState } from "react";
// import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Login() {
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
    isActive: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleWithoutLogin = () => {
    alert("You are logged in as a guest user");
    window.localStorage.setItem("Usertype", "guest");
    window.localStorage.setItem("isLoggedin", false);
    navigate("/Dashboard");
  };
  const handleLogin = async () => {
    if (!LoginData.username || !LoginData.password) {
      setError("Please fill in all fields");
      return;
    }
    await axios
      .post(`http://localhost:1337/api/Login`, {
        username: LoginData.username,
        password: LoginData.password,
      })
      .then((res) => {
        window.localStorage.setItem("UserId", res.data.user.UserId);
        window.localStorage.setItem("Usertype", "admin");
        window.localStorage.setItem("username", LoginData.username);
        alert("Login Successful, Welcome " + LoginData.username);

        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };
  return (
    <Container
      maxWidth='xs'
      sx={{
        width: "100vw",
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Box component='section'>
        <h1 className='login-title'>Login</h1>

        {error && <p className='error-message'>{error}</p>}

        <TextField
          id='username'
          label='Username'
          variant='outlined'
          size='small'
          value={LoginData.username}
          onChange={(e) =>
            setLoginData({ ...LoginData, username: e.target.value })
          }
          fullWidth></TextField>

        <TextField
          id='password'
          label='Password'
          variant='outlined'
          value={LoginData.password}
          size='small'
          onChange={(e) =>
            setLoginData({ ...LoginData, password: e.target.value })
          }
          type={showPassword ? "text" : "password"}
          fullWidth
          margin='normal'></TextField>

        <Button
          id='login-btn'
          variant='contained'
          size='small'
          fullWidth
          onClick={handleLogin}>
          Login
        </Button>

        <a
          className='guest-link'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handleWithoutLogin();
          }}>
          Continue without Login
        </a>
      </Box>
    </Container>
  );
}

export default Login;
