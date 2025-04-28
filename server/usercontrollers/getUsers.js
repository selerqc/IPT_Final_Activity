const userModel = require("../models/userModel");
const getUsers = async (req, res) => {
  const data = await userModel.find({}).select({
    _id: 0,
    __v: 0,
  });

  res.status(200).json({
    message: "Users Data",
    users: data,
  });
};

module.exports = getUsers;
