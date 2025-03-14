const mongoose = require("mongoose");

const studentModel = mongoose.model(
  "students",
  new mongoose.Schema(
    {
      idNumber: {
        type: Number,
        required: [true, "Student Id Required", "Id Number  must be a number"],
        unique: true,
      },
      Firstname: {
        type: String,
        required: [true, "First Name Required"],
      },
      Lastname: {
        type: String,
        required: [true, "Last Name Required"],
      },
      Middlename: {
        type: String,
        required: [true, "Middle Name Required"],
      },
      course: {
        type: String,
        required: [true, "Course Required"],
      },
      year: {
        type: Number,
        required: [true, "Year Required", "Year must be a number"],
      },
    },
    { timestamps: true }
  )
);
module.exports = studentModel;
