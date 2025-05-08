import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";

import "./App.css";
import Login from "./auth/Login";
import Users from "./pages/Users";
import Signup from "./auth/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Students' element={<Student />} />
          <Route path='/Users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
