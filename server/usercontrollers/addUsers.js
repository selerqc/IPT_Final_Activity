const userModel = require("../models/userModel");
const addUser = async(req, res) => {
  const {  firstname, lastname, middlename, email, password } =
    req.body;
    if (!firstname || !lastname || !email || !password) throw ("Please fill in all fields"); 

    const containsDuplicate = await userModel.findOne({ email: email });
    if (containsDuplicate) throw ("User already exists");
 
  
userModel.create({
    firstname: firstname, 
    lastname: lastname,
    middlename: middlename,
    email: email,
    password: password,
  });

  res.status(200).json({
    message: "New User Added",
  });
};

module.exports = addUser;
