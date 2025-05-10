const mongoose = require("mongoose");
const connection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/SIS");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connection;
