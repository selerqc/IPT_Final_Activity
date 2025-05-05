const userModel = require("../models/userModel");
const addUser = (req, res) => {
  const { UserId, Firstname, Lastname, Middlename, Username, Password } =
    req.body;


  userModel.findOne({ UserId }).then((user) => {
    if (user) throw ("User already exists");
  });
  const User = new userModel({
    UserId,
    Firstname,
    Lastname,
    Middlename,
    Username,
    Password,
  });
  User.save()
    .then(() => {
      console.log("User Added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    message: "New User Added",
    User,
  });
};

module.exports = addUser;
