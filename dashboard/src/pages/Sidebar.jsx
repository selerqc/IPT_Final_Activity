import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import "../styles/Sidebar.css";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/", label: "HOME", icon: <HomeIcon /> },
    { to: "/AddStudent", label: "ADD STUDENT", icon: <InfoIcon /> },
    { to: "/TaskTracker", label: "TASK TRACKER", icon: <InfoIcon /> },
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
