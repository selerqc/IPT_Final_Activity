const Student = require("../models/studentModel");
const updateStudent = async (req, res) => {
  const { idNumber } = req.params;
  console.log(idNumber);
  console.log(req.body);
  const { Firstname, Lastname, Middlename, course, year } = req.body;

  const updatedStudent = await Student.findOneAndUpdate(
    {
      idNumber: idNumber,
    },
    {
      Firstname: Firstname,
      Lastname: Lastname,
      Middlename: Middlename,
      course: course,
      year: year,
    },
    { new: true }
  ).select({
    _id: 0,
    __v: 0,
  });
  res.status(200).json({
    message: "Student updated successfully",
    updatedStudent,
  });
};
module.exports = updateStudent;
