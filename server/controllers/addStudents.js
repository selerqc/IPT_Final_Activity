const mongoose = require("mongoose");

const addStudents = async (req, res) => {
  const students = mongoose.model("students");
  const { idNumber, Firstname, Lastname, Middlename, course, year } = req.body;

  const isStudentExist = await students.findOne({
    idNumber: idNumber,
  });
  if (isStudentExist) throw "Student Already Exist";
  if (idNumber.length < 8) throw "Id Number must be 8 digits";
  await students.create({
    idNumber: idNumber,
    Firstname: Firstname,
    Lastname: Lastname,
    Middlename: Middlename,
    course: course,
    year: year,
  });
  res.status(201).json({
    status: "Add Student",
    message: "Student Submitted!",
    stats: req.body,
  });
};
module.exports = addStudents;
