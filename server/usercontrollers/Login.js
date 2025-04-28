const userModel = require("../models/userModel");
const Login = async (req, res) => {
  const { username, password, isActive } = req.body;
  const user = await userModel.findOne({
    username: username,
    password: password,
    isActive: isActive,
  });
  res.status(200).json({
    status: `Login Successful, Welcome ${username}`,
    user,
  });
};
module.exports = Login;
