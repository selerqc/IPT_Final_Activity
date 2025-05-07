const UserModel = require('../models/userModel');
const validator = require('validator');
const UserControllers = {

  addUser: async (req, res) => {
    const { firstname, lastname, middlename, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) throw ("Please fill in all fields");

    const containsDuplicate = await UserModel.findOne({ email: email });
    if (containsDuplicate) throw ("User already exists");

    if (!validator.isEmail(email)) throw ("Invalid email address");


    UserModel.create({
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      email: email,
      password: password,
    });

    res.status(200).json({
      message: "New User Added",
    });
  },

  deleteUser: async (req, res) => {
    let { userId } = req.params;
    if (!userId) throw ("Please provide a userId");

    await UserModel.findOneAndDelete({
      userId: userId,
    });

    res.status(200).json({
      message: "User Deleted",

    })
  },
  getUsers: async (req, res) => {
    const data = await UserModel.find({}).select({
      _id: 0,
      __v: 0,
    });
    const userCount = await UserModel.countDocuments({});
    console.log(data);
    res.status(200).json({
      message: "Users Data",
      users: data,
      userCount: userCount,
    });

  },

  updateUser: async (req, res) => {
    const { firstname, lastname, middlename, email, password } = req.body;
    const { userId } = req.params;
    if (!firstname || !lastname || !email || !password) throw ("Please fill in all fields");
    if (!userId) throw ("Please provide a userId");


    const updatedUser = await UserModel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        email: email,
        password: password,
      },
      { new: true }
    )

    if (!updatedUser) throw ("User not found");

    res.status(200).json({
      message: "User Updated",
      user: updatedUser,
    });
  },
}

module.exports = UserControllers;