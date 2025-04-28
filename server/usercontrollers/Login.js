const userModel = require("../models/userModel");
const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({
    Username: username,
    Password: password,
  });
  await userModel.findOneAndUpdate(
    { Username: username, Password: password },
    {
      isActive: true,
    }
  );
  console.log(user);
  if (!user) throw "User not found";
  res.status(200).json({
    status: `Login Successful, Welcome ${username}`,
    user,
  });
};
module.exports = Login;
