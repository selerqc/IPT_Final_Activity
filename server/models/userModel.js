const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    middlename: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
   
  },{
    collection:"user-data"
}
);

UserSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1000, increment_by: 1 });

module.exports = mongoose.model("User", UserSchema);
