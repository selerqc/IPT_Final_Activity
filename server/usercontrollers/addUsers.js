const fs = require("fs");
const addUser = (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/Users.json", "utf-8"));
  const User = req.body;
  const UserId = data.map((user) => user.UserId);
  const UserIndex = UserId.indexOf(User.UserId);
  const argon2 = require('argon2');


  
  if (UserIndex > -1) throw "User Already Exists";
  // if(!User.UserId || !User.Firstname || !User.Lastname || !User.Middlename || !User.Username || !User.Password) throw "Please fill up all fields";
  console.log(User)
  data.push(User);

  fs.writeFileSync("./db/Users.json", JSON.stringify(data, null, 2));

  res.status(200).json({
    message: "New User Added",
    User,
  });
};

module.exports = addUser;
