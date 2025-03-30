const fs = require("fs");
const addStudent = (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/Student.json", "utf-8"));
  const Student = req.body;
  const id = data.map((Student) => Student.idNumber);

  const StudentIndex = id.indexOf(Student.idNumber);
  console.log(StudentIndex);

  if (
    !Student.idNumber ||
    !Student.Firstname ||
    !Student.Lastname ||
    !Student.Middlename ||
    !Student.course ||
    !Student.year
  )
    throw "Please fill up all fields";
  if (StudentIndex > -1) throw "Student Already Exists";
  data.push(Student);

  fs.writeFileSync("./db/Student.json", JSON.stringify(data, null, 2));

  res.status(200).json({
    message: "New Student Added",
    Student,
  });
};

module.exports = addStudent;
