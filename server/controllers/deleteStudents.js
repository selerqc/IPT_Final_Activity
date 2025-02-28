const mongoose = require("mongoose");
const deleteStudents = async (req, res) => {
  const studentModel = mongoose.model("students");
  const id_number = req.params.id_number;

  const getIdNumber = await studentModel.findOne({
    id_number: id_number,
  });

  if (!getIdNumber) throw "Student does not Exists";

  await studentModel.deleteOne({
    id_number: id_number,
  });
  res.status(201).json({
    status: "Delete Student",
    message: "Student deleted success",
  });
};

module.exports = deleteStudents;
