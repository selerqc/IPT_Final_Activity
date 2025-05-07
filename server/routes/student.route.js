const express = require('express');
const Student = require("../controllers/student.controllers");

const studentRoute = new express.Router();

studentRoute.get('/getStudents', Student.getStudents);
studentRoute.post('/addStudents', Student.addStudent);
studentRoute.patch('/updateStudent/:idNumber', Student.updateStudent);
studentRoute.delete('/deleteStudents/:idNumber', Student.deleteStudent);


module.exports = studentRoute;