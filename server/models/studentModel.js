const mongoose = require('mongoose');

const StudentModel = new mongoose.Schema({
    idNumber:{
        type: String,
        required: true,
    },
    Firstname:{
        type: String,
        required: [true,"id is required"],
    },
    Lastname:{
        type: String,
        required: true,
    },
    Middlename:{
        type: String,
    },
    course:{
        type: String,
        required: true,
    },
    year:{
        
        type: String,
        required: true,
    },
    

},{
    collection:"student-data"
});

module.exports = mongoose.model("Student", StudentModel);