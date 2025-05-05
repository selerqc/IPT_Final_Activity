const userModel = require("../models/userModel");

const updateUser =async (req, res) => {
  const {  firstname, lastname, middlename, email, password } = req.body;
  const {userId} = req.params;
  if (!firstname || !lastname || !email || !password) throw ("Please fill in all fields");
  console.log(userId)
  

 const updatedUser = await userModel.findOneAndUpdate(
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

  console.log(updatedUser);
  res.status(200).json({
    message: "User Updated",
    user: updatedUser,
  });
};

module.exports = updateUser;
