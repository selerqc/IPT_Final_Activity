const userModel = require("../models/userModel");
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw "Please fill in all fields";

  const user = await userModel.findOne({ email });

  if (!user) throw "User not found";

  if (user.email !== email) throw "Incorrect email";

  if (user.password !== password) throw "Incorrect password";

  res.status(200).json({
    status: `Login Successful, Welcome ${user.firstname}`,
    user,
  });
};
module.exports = Login;
