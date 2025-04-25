const mongoose = require('mongoose');
const updateStudent = (req, res) => {
  const { idNumber } = req.params;
  const {Firstname, Lastname, Middlename, course,year} = req.body;
  const Student = mongoose.model('Student');

  Student.findOneAndUpdate({
    idNumber: idNumber
  }, {
    Firstname: Firstname,
    Lastname: Lastname,
    Middlename: Middlename,
    course: course,
    year: year
  }, { new: true })
  
  res.status(200).json({
    message: "Student updated successfully",
  
  });
};
module.exports = updateStudent;
