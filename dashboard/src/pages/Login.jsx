import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h1>Login</h1>

      <TextField type="text" placeholder="Username" />
      <TextField type="password" placeholder="Password" />
      <Button onClick={() => navigate("/Dashboard")}>Login</Button>
    </div>
  );
}
