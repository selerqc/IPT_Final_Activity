const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: [true, "id is required"],
    },
    Firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    Lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    Middlename: {
      type: String,
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
    },

    Password: {
      type: String,
      required: [true, "Password is required"],
    },
   
  },
  {
    collection: "user-data",
  }
);

module.exports = mongoose.model("User", UserModel);
