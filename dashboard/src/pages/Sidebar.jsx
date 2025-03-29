/* eslint-disable react/prop-types */
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TaskIcon from "@mui/icons-material/Task";
import PeopleIcon from "@mui/icons-material/People";
import "../styles/Sidebar.css";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  // const links = [
  //   { to: "/Dashboard", label: "HOME", icon: <HomeIcon /> },
  //   { to: "/AddStudent", label: "STUDENTS", icon: <AccessibilityIcon /> },
  //   { to: "/TaskTracker", label: "TASK TRACKER", icon: <TaskIcon /> },
  //   { to: "/Users", label: "USERS", icon: <PeopleIcon /> },
  //   { to: "/", label: "Logout", icon: <InfoIcon /> },
  // ];
  const isLoggedIn = window.localStorage.getItem("isLoggedin");
  const Usertype = window.localStorage.getItem("Usertype");
  return (
    <div>
      {isLoggedIn && Usertype === "admin" ? (
        <div className="side">
          <Link to="/Dashboard">
            <p>
              <HomeIcon />
              Dashboard
            </p>
          </Link>
          <Link to="/AddStudent">
            <p>
              <AccessibilityIcon />
              Add Student
            </p>
          </Link>
          <Link to="/TaskTracker">
            <p>
              <TaskIcon />
              Task Tracker
            </p>
          </Link>
          <Link to="/Users">
            <p>
              <PeopleIcon />
              Users
            </p>
          </Link>
          <Link to="/">
            <p>
              <InfoIcon />
              Logout
            </p>
          </Link>
        </div>
      ) : (
        <div className="side">
          <Link to="/Dashboard">
            <p>
              <HomeIcon />
              Dashboard
            </p>
          </Link>
          <Link to="/TaskTracker">
            <p>
              <TaskIcon />
              Task Tracker
            </p>
          </Link>
          <Link to="/">
            <p>
              <InfoIcon />
              Logout
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
