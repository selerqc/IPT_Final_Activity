const userModel = require("../models/userModel");
const validator = require("validator");
const Signup = async (req, res) => {
    const { firstname, lastname, middlename, email, password, confirmPassword } = req.body;
    console.log(req.body);
    if (!firstname || !lastname || !email || !password || !confirmPassword) throw "Please fill in all fields";

    const user = await userModel.findOne({ email });
    if (user) throw "User already exists";
    if (password !== confirmPassword) throw "Passwords do not match";
    if (!validator.isEmail(email)) throw "Invalid email address";
    if (password.length < 8) throw "Password must be at least 8 characters long";
    if (!validator.isStrongPassword(password)) throw "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";



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