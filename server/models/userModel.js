const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Firstname: {
      type: String,
      required: [true, "id is required"],
    },
    Lastname: {
      type: String,
      required: true,
    },
    Middlename: {
      type: String,
    },
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user-data",
  }
);

module.exports = mongoose.model("User", UserModel);
