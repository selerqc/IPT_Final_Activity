import { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function Login() {
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
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
      .post(`http://localhost:1337/api/Login`, LoginData)
      .then(() => {
        window.localStorage.setItem("Usertype", "admin");
        window.localStorage.setItem("isLoggedin", true);
        window.localStorage.setItem("username", LoginData.username);
        alert("Login Successful, Welcome " + LoginData.username);

        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Username or Password");
      });
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <div className="input-group">
          {error && <p className="error-message">{error}</p>}

          <input
            id="username"
            type="text"
            value={LoginData.username}
            onChange={(e) =>
              setLoginData({ ...LoginData, username: e.target.value })
            }
            placeholder="Username"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={LoginData.password}
              onChange={(e) =>
                setLoginData({ ...LoginData, password: e.target.value })
              }
              placeholder="Password"
              className="input-field password-input"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
        </div>

        <div className="button-group">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <a
          className="guest-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleWithoutLogin();
          }}>
          Continue without Login
        </a>
      </div>
    </div>
  );
}

export default Login;
