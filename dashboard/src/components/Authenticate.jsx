import Chip from "@mui/material/Chip";

export default function Authenticate(username) {
  const userNameLog = localStorage.getItem("username");
  if (userNameLog === username) {
    return <Chip label="Chip Filled" />;
  }
}
