require("express-async-errors");
require("dotenv").config();
const validator = require("validator");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");

const app = express();
const fs = require("fs");
const path = require("path");
const usersFile = path.join(__dirname, "Users.json");
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

  students.push({
    idNumber: idNumber,
    Firstname: Firstname,
    Lastname: Lastname,
    Middlename: Middlename,
    course: course,
    year: year,
  });
  console.log(students)
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

function addRecord(file, newRecord) {
  var records = readData(file);
  records.push(newRecord);
  writeData(file, records);
  return newRecord;
}

function updateRecord(file, id, updatedRecord, idField) {
  var records = readData(file);
  var index = records.findIndex(function(record) {
      return record[idField] === id;
  });

  if (index === -1) return null;
  records[index] = updatedRecord;
  writeData(file, records);
  return updatedRecord;
}

function readData(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
app.get("/api/getUsers", function(req, res) {
  res.json(readData(usersFile));
});

app.post("/api/addUser", function(req, res) {
  res.status(201).json(addRecord(usersFile, req.body));
});

app.put("/updateUsers/:id", function(req, res) {
  var updated = updateRecord(usersFile, req.params.id, req.body, "userId");
  if (updated) res.json(updated);
  else res.status(404).json({ message: "User not found" });
});

  






app.use(errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
