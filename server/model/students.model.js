const mongoose = require("mongoose");

const studentModel = mongoose.model(
  "students",
  new mongoose.Schema({
    id_number: {
      type: Number,
      required: [true, "Student Id Required"],
    },
    first_name: {
      type: String,
      required: [true, "First Name Required"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name Required"],
    },
    middle_name: {
      type: String,
      required: [true, "Middle Name Required"],
    },
    course: {
      type: String,
      required: [true, "Course Required"],
    },
    year: {
      type: Number,
      required: [true, "Year Required"],
    },
  })
);
module.exports = studentModel;
