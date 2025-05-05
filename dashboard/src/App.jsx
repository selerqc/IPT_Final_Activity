import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";

import "./App.css";
import TaskTracker from "./pages/TaskTracker";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/AddStudent' element={<AddStudent />} />
          <Route path='/TaskTracker' element={<TaskTracker />} />
          <Route path='/Users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
