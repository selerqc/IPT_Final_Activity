const mongoose = require("mongoose");

const addStudents = async (req, res) => {
  const students = mongoose.model("students");
  const { id_number, first_name, last_name, middle_name, course, year } =
    req.body;

  const isStudentExist = await students.findOne({
    id_number: id_number,
  });
  if (isStudentExist) throw "Student Already Exist";

  await students.create({
    id_number: id_number,
    first_name: first_name,
    last_name: last_name,
    middle_name: middle_name,
    course: course,
    year: year,
  });
  res.status(201).json({
    status: "Add Student",
    message: "Student Submitted!",
  });
};
module.exports = addStudents;
