const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/SIS")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;
