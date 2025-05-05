const userModel = require("../models/userModel");
const Signup = async (req, res) => {
    const { firstname, lastname, middlename, email, password,confirmPassword } = req.body;
    console.log(req.body);
    if (!firstname || !lastname || !email || !password || !confirmPassword) throw "Please fill in all fields";
    if (password !== confirmPassword) throw "Passwords do not match";
    if (password.length < 8) throw "Password must be at least 8 characters long";
    const user = await userModel.findOne({ email });

    if (user) throw "User already exists";

    const newUser = await userModel.create({
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        email: email,
        password: password,
    });
    res.status(200).json({
        message: `Signup Successful, Welcome ${newUser.Firstname}`,
        user: newUser,
    });
    }
module.exports = Signup;