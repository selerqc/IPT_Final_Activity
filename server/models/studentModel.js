const mongoose = require('mongoose');

const StudentModel = new mongoose.Schema({
    idNumber:{
        type: String,
        required: [true,"id is required"],
        unique: true,
    },
    Firstname:{
        type: String,
        required: [true,"Firstname is required"],
    },
    Lastname:{
        type: String,
        required: [true,"Lastname is required"],
    },
    Middlename:{
        type: String,

    },
    course:{
        type: String,
        required: [true,"Course is required"],

    },
    year:{
        
        type: String,
        required: [true,"Year is required"],
    },
    

},{
    collection:"student-data"
});

module.exports = mongoose.model("Student", StudentModel);