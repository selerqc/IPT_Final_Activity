import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";

import "./App.css";
import TaskTracker from "./pages/TaskTracker";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Sidebar from "./pages/Sidebar";
function App() {
  const isLoggedIn = window.localStorage.getItem("isLoggedin");
  const Usertype = window.localStorage.getItem("Usertype");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {isLoggedIn && Usertype === "admin" ? (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/AddStudent" element={<AddStudent />} />
              <Route path="/TaskTracker" element={<TaskTracker />} />
              <Route path="/Users" element={<Users />} />
            </>
          ) : (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/TaskTracker" element={<TaskTracker />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
