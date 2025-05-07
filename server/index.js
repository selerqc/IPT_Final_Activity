require("express-async-errors");
require("dotenv").config();

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");
const connection = require("./db/connection");
const app = express();

const Login = require("./auth/Login");

const Signup = require("./auth/Signup");
const userRoute = require("./routes/user.route");
const studentRoute = require("./routes/student.route");
app.use(cors());
app.use(express.json());

connection();

app.post("/api/Login", Login);
app.post("/api/Signup", Signup);

app.use("/api",userRoute)
app.use("/api",studentRoute)
app.use(errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
