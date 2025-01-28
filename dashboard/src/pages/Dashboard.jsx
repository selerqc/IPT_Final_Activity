import { React, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
function Dashboard() {
  const [color, setColor] = useState("red");
  const [firstName, setFirstName] = useState("");
  return (
    <div>
      <h1>Welcome to Saint Mary's University</h1>
      <h2>
        My fav color is <span style={{ color: color }}>{color}</span>
      </h2>
      <Button
        className="btn"
        variant="contained"
        color="primary"
        onClick={() => setColor("blue")}
      >
        Blue
      </Button>
      <p>
        My name is: <span>{firstName}</span>
      </p>
      <TextField
        label="First Name"
        margin="normal"
        id="fn"
        variant="outlined"
      ></TextField>
      <br />
      <br />
      <Button
        className="btn"
        variant="contained"
        color="primary"
        onClick={() => {
          const fn = document.getElementById("fn");
          setFirstName(fn.value);
        }}
      >
        Submit
      </Button>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
