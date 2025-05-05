const Student = require("../models/studentModel");
const addStudent = async(req, res) => {
  try {
    const {Firstname, Lastname, Middlename, course, year} = req.body;
    if (!Firstname || !Lastname || !Middlename || !course || !year) throw ("Please fill in all fields");
     
    
  const student = await Student.create({
    Firstname,
    Lastname,
    Middlename,
    course,
    year,
  });
  res.status(200).json({
    message: "New Student Added",
    student: student,
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding student",
      error: error.message,
    });
  }
  
 
};

module.exports = addStudent;
