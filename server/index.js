require("express-async-errors");
require("dotenv").config();
const validator = require("validator");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");

const app = express();

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
  const { idNumber, Firstname, Lastname, Middlename, course, year } = req.body;

  const existingStudent = students.find(
    (student) => student.idNumber.toString() === idNumber.toString()
  );

  if (validator.isEmpty(idNumber)) throw "Please fill in the fields";
  if (validator.isEmpty(Firstname)) throw "Please fill in the fields";
  if (validator.isEmpty(Lastname)) throw "Please fill in the fields";
  if (validator.isEmpty(Middlename)) throw "Please fill in the fields";
  if (validator.isEmpty(course)) throw "Please fill in the fields";
  if (validator.isEmpty(year)) throw "Please fill in the fields";
  if (idNumber.length <= 8) throw "ID Number must be atleast 8 digits";
  if (existingStudent) throw "Student already exists";

  students.push({
    idNumber: idNumber,
    Firstname: Firstname,
    Lastname: Lastname,
    Middlename: Middlename,
    course: course,
    year: year,
  });
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
  if (index === -1) throw "Student not found";
  students[index] = student;
  res.status(200).json({
    message: "Student updated successfully",
    students,
  });
});

app.delete("/api/deleteStudents/:idNumber", (req, res) => {
  const { idNumber } = req.params;
  if (validator.isEmpty(idNumber)) throw "Please provide an idNumber";
  students = students.filter(
    (student) => student.idNumber.toString() !== idNumber.toString()
  );

  res.status(200).json({
    message: "Student deleted successfully",
    students,
  });
});

app.use(errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
