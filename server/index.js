require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");
const getStudents = require("./controllers/getStudents");
const mongoose = require("mongoose");
const addStudents = require("./controllers/addStudents");
const deleteStudents = require("./controllers/deleteStudents");
const updateStudent = require("./controllers/updateStudent");
const addTask = require("./controllers/addTask");
const getTask = require("./controllers/getTask");
const deleteTask = require("./controllers/deleteTask");
const app = express();

app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connection to the student database");
  })
  .catch((err) => {
    console.log("error", err);
  });

require("./model/students.model");
require("./model/task.model");
//students
app.get("/api/students", getStudents);
app.post("/api/addStudents", addStudents);
app.patch("/api/updateStudent/:idNumber", updateStudent);
app.delete("/api/deleteStudents/:idNumber", deleteStudents);

//tasks
app.get("/api/getTask", getTask);
app.post("/api/addTask", addTask);
app.delete("/api/deleteTask/:taskId", deleteTask);
app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
