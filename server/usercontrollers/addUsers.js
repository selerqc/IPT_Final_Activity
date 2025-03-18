const fs = require("fs");
const addUser = (req, res) => {
  const data = JSON.parse(fs.readFileSync("Users.json", "utf-8"));
  const User = req.body;
  data.push(User);

  fs.writeFileSync("Users.json", JSON.stringify(data, null, 2));

  res.status(200).json({
    message: "New User Added",
    User,
  });
};

module.exports = addUser;
