const userModel = require("../models/userModel");
const deleteUser = async(req, res) => {
  let { userId } = req.params;

  await userModel.findOneAndDelete({
    userId: userId,
  });


  
  res.status(200).json({
    message: "User Deleted",
  
  });
};
module.exports = deleteUser;
