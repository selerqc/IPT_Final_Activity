const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const StudentModel = new mongoose.Schema({
    idNumber: {
        type: Number,

        unique: true,
    },
    Firstname: {
        type: String,
        required: [true, "Firstname is required"],
    },
    Lastname: {
        type: String,
        required: [true, "Lastname is required"],
    },
    Middlename: {
        type: String,

    },
    course: {
        type: String,
        required: [true, "Course is required"],

    },
    year: {

        type: String,
        required: [true, "Year is required"],
    },


}, {
    collection: "student-data"
});


StudentModel.plugin(AutoIncrement, { inc_field: 'idNumber', start_seq: 5000, increment_by: 1 });


module.exports = mongoose.model("Student", StudentModel);