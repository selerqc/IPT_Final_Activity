const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect(
      "mongodb+srv://mrcharlesagustin:selerqc@mydbdata.iod8q.mongodb.net/SIS?retryWrites=true&w=majority&appName=mydbdata"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;
