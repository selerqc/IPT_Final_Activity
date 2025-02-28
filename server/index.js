require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");
const getStudents = require("./controllers/getStudents");
const mongoose = require("mongoose");
const addStudents = require("./controllers/addStudents");
const deleteStudents = require("./controllers/deleteStudents");
const app = express();

app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connection to the database");
  })
  .catch((err) => {
    console.log("error", err);
  });

require("./model/students.model");

app.delete("/api/deleteStudents/:id_number", deleteStudents);

app.post("/api/addStudents", addStudents);

app.get("/api/students", getStudents);

app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
