const mongoose = require("mongoose");
const getStudents = async (req, res) => {
  const students = mongoose.model("students");
  const studentsData = await students.find({});
  res.status(200).json({
    message: "Student Information",
    data: studentsData,
  });
};
module.exports = getStudents;
