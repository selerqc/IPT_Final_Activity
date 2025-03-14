const mongoose = require("mongoose");

const updateStudent = async (req, res) => {
  const idNumber = req.params.idNumber;
  const { Firstname, Lastname, Middlename, course, year } = req.body;
  const studentModel = mongoose.model("students");

  const updatedStudent = await studentModel.findOneAndUpdate(
    { idNumber: idNumber },
    { Firstname, Lastname, Middlename, course, year },
    { new: true, runValidators: true }
  );

  if (!updatedStudent) {
    return res.status(404).json({
      status: "Error",
      message: "Student not found!",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Student Updated!",
    data: updatedStudent,
  });
};

module.exports = updateStudent;
