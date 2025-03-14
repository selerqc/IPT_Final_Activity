const mongoose = require("mongoose");
const deleteStudents = async (req, res) => {
  const studentModel = mongoose.model("students");
  const idNumber = req.params.idNumber;

  const getIdNumber = await studentModel.findOne({
    idNumber: idNumber,
  });

  if (!getIdNumber) throw "Student does not Exists";

  await studentModel.deleteOne({
    idNumber: idNumber,
  });
  res.status(201).json({
    status: "Delete Student",
    message: "Student deleted success",
    data: idNumber,
  });
};

module.exports = deleteStudents;
