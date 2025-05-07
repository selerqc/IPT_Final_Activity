const express = require('express');
const User = require("../controllers/user.controllers");

const userRoute = new express.Router();

userRoute.get('/getUsers', User.getUsers);
userRoute.post('/addUser', User.addUser);
userRoute.delete('/deleteUser/:userId', User.deleteUser);
userRoute.patch('/updateUser/:userId', User.updateUser);

module.exports = userRoute;