const Student = require("../models/studentModel");
const addStudent = async(req, res) => {
  try {
    const {idNumber,Firstname, Lastname, Middlename, course, year} = req.body;

  const student = new Student({
    idNumber,
    Firstname,
    Lastname,
    Middlename,
    course,
    year
  });
  await student.save();
  res.status(200).json({
    message: "New Student Added",
    student: student,
  });
  } catch (error) {
    
  }
  
 
};

module.exports = addStudent;
