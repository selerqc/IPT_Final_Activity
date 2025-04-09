import { React, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Dashboard() {
  const username = window.localStorage.getItem("username");
  return (
    <div>
      <h1>Welcome to Saint Mary's University</h1>
      {username && (
        <h2>
          Hello <span>{username}</span>!
        </h2>
      )}

      <Sidebar />
    </div>
  );
}

export default Dashboard;
