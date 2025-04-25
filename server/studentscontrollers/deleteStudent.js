const mongoose = require('mongoose');
const deleteStudent = async(req, res) => {
 const {idNumber} = req.params;
  const Student = mongoose.model('Student');
await Student.findOneAndDelete({
  idNumber: idNumber
})




  res.status(200).json({
    message: "Student deleted successfully"
   
  });
};
module.exports = deleteStudent;
