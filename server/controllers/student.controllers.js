const StudentModel = require('../models/studentModel');

const StudentControllers = {

  addStudent: async (req, res) => {
    try {
      const { Firstname, Lastname, Middlename, course, year } = req.body;
      if (!Firstname || !Lastname || !Middlename || !course || !year) throw ("Please fill in all fields");

      const student = await StudentModel.create({
        Firstname,
        Lastname,
        Middlename,
        course,
        year,
        isDeleted: false,
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
  },

  deleteStudent: async (req, res) => {
    const { idNumber } = req.params;
    if (!idNumber) throw ("Please provide a student idNumber");
    await StudentModel.findOneAndUpdate({
      idNumber: idNumber,

    }, {
      isDeleted: true,
    })
    res.status(200).json({
      message: "Student deleted successfully"
    });
  },
  getStudents: async (req, res) => {

    const data = await StudentModel.find({
      isDeleted: false,
    });

    const studentCount = await StudentModel.countDocuments({ isDeleted: false });

    res.status(200).json({
      message: "Students Data",
      students: data,
      studentCount: studentCount,
    });
  },
  updateStudent: async (req, res) => {
    const { idNumber } = req.params;
    if (!idNumber) throw ("Please provide a student idNumber");

    const { Firstname, Lastname, Middlename, course, year } = req.body;

    const updatedStudent = await StudentModel.findOneAndUpdate(
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
  },
}
module.exports = StudentControllers;
