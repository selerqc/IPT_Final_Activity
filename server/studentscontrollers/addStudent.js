const Student = require("../models/studentModel");
const addStudent = (req, res) => {
  const {idNumber,Firstname, Lastname, Middlename, course, year} = req.body;

  const student = new Student({
    idNumber,
    Firstname,
    Lastname,
    Middlename,
    course,
    year
  });
  res.status(200).json({
    message: "New Student Added",
    student: student,
  });
};

module.exports = addStudent;
