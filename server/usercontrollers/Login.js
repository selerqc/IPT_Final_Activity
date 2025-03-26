const fs = require("fs");
const Login = (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./db/Users.json"));
  const user = users.find((user) => {
    return user.Username === username && user.Password === password;
  });

  if (!user) throw new Error("Invalid Username or Password");

  res.status(200).json({
    status: `Login Successful, Welcome ${username}`,
    user: user,
  });
};
module.exports = Login;
