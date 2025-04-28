require("express-async-errors");
require("dotenv").config();

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");
const connection = require("./db/connection");
const app = express();

const getUsers = require("./usercontrollers/getUsers");
const addUser = require("./usercontrollers/addUsers");
const updateUser = require("./usercontrollers/updateUser");
const deleteUser = require("./usercontrollers/deleteUser");
const addStudent = require("./studentscontrollers/addStudent");
const getStudents = require("./studentscontrollers/getStudents");
const updateStudent = require("./studentscontrollers/updateStudent");
const deleteStudent = require("./studentscontrollers/deleteStudent");
const Login = require("./usercontrollers/Login");

const mongoose = require("mongoose");
const userModel = require("./models/userModel");
app.use(cors());
app.use(express.json());

connection();
app.get("/api/getStudents", getStudents);

app.post("/api/addStudents", addStudent);

app.patch("/api/updateStudent/:idNumber", updateStudent);

app.delete("/api/deleteStudents/:idNumber", deleteStudent);

app.post("/api/Login", Login);

app.get("/api/getUsers", getUsers);

app.post("/api/addUser", addUser);

app.patch("/api/updateUser/:UserId", updateUser);

app.delete("/api/deleteUser/:UserId", deleteUser);

app.put("/api/logout/:UserId", async (req, res) => {
  const updateUser = await userModel.findOneAndUpdate(
    {
      UserId: req.params.UserId,
    },
    {
      isActive: false,
    }
  );

  res.status(200).json({
    updateUser,
  });
});
app.use(errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
