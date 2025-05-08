const userModel = require("../models/userModel");
const validator = require('validator');
const argon2 = require('argon2');
const Login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) throw "Please fill in all fields";
  if (!validator.isEmail(email)) throw "Invalid email format";
  const user = await userModel.findOne({ email });
  if (!user) throw "User not found";
  if (user.email !== email) throw "Incorrect email";


  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) throw "Incorrect password";
  res.status(200).json({
    status: `Login Successful, Welcome ${user.firstname}`,
    user,
  });
};
module.exports = Login;
