const mongoose = require('mongoose');
const getStudents = async(req, res) => {
const Student = mongoose.model("Student")

const data = await Student.find({});

  res.status(200).json({
    message: "Students Data",
    students: data,
  });
};
module.exports = getStudents;
