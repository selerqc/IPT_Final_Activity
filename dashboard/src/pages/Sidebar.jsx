import HomeIcon from "@mui/icons-material/Home";

import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TaskIcon from "@mui/icons-material/Task";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/Sidebar.css";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/Dashboard", label: "HOME", icon: <HomeIcon /> },
    { to: "/AddStudent", label: "STUDENTS", icon: <AccessibilityIcon /> },
    { to: "/TaskTracker", label: "TASK TRACKER", icon: <TaskIcon /> },
    { to: "/Users", label: "USERS", icon: <PeopleIcon /> },
    { to: "/", label: "LOGOUT", icon: <LogoutIcon /> },
  ];
  return (
    <div>
      <div className="side">
        {links.map((link, index) => (
          <Link to={link.to} key={index} className="link">
            <p>
              <div style={{ display: "flex", alignItems: "center" }}>
                {link.icon}
                <span style={{ marginLeft: "10px" }}>{link.label}</span>
              </div>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
