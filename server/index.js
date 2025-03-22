require("express-async-errors");
require("dotenv").config();

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");

const app = express();
const fs = require("fs");

const getUsers = require("./usercontrollers/getUsers");
const addUser = require("./usercontrollers/addUsers");
const updateUser = require("./usercontrollers/updateUser");
const deleteUser = require("./usercontrollers/deleteUser");
app.use(cors());
app.use(express.json());
let students = [];

app.get("/api/getStudents", (req, res) => {
  res.status(200).json({
    message: "Students Data",
    students,
  });
});

app.post("/api/addStudents", (req, res) => {
  const student = req.body;
  const StudentId = students.map((student) => student.idNumber);
  const StudentIndex = StudentId.indexOf(student.idNumber);

  if (StudentIndex > -1) throw "Student Already Exists";
  students.push(student);
  console.log(students);
  res.status(201).json({
    message: "Student added successfully",
    students,
  });
});
app.patch("/api/updateStudent/:idNumber", (req, res) => {
  const { idNumber } = req.params;
  const student = req.body;
  const index = students.findIndex(
    (student) => student.idNumber.toString() === idNumber.toString()
  );

  students[index] = student;
  res.status(200).json({
    message: "Student updated successfully",
    students,
  });
});

app.delete("/api/deleteStudents/:idNumber", (req, res) => {
  const { idNumber } = req.params;

  students = students.filter(
    (student) => student.idNumber.toString() !== idNumber.toString()
  );

  res.status(200).json({
    message: "Student deleted successfully",
    students,
  });
});

app.get("/api/getUsers", getUsers);

app.post("/api/addUser", addUser);

app.patch("/api/updateUser/:UserId", updateUser);

app.delete("/api/deleteUser/:UserId", deleteUser);

app.use(errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
