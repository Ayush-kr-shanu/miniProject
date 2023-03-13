const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BlacklistModel } = require("../models/blacklist.model");
const userRoute = express.Router();

require('dotenv').config()

userRoute.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      res.send({
        msg: `User with ${username || email} is already exists please login`,
      });
    }
    //Create new user
    const user = new UserModel({ username, email, password, role });
    await user.save();

    res.send({ msg: "User Registered sucessfully" });
  } catch (err) {
    res.send({ msg: "something went wrong", error: err.message });
  }
});


userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.send({ message: "Invalid username or password" });
    }

    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.send({ message: "Invalid username or password" });
    }
    const acessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1 min",
    });
    const refreshToken = jwt.sign({ userId: user._id },process.env.JWT_SECRET_REFRESH,{
        expiresIn: "5 min",
    });
    res.send({ acessToken, refreshToken });
  } catch (err) {
    res.send({ msg: "something went wrong", error: err.message });
  }
});


userRoute.post("/refresh-token", async (req, res) => {
    try {
      const refreshToken = req.headers.authorization.split(' ')[1];
    //   console.log(refreshToken);
  
      if (!refreshToken) {
        throw new Error("No refresh token provided");
      }
      const { userId } = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
      
      const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1 min"
      });

      res.send({ msg: "Login successful", accessToken });
     

    } catch (err) {
      res.send({ msg: "something went wrong", error: err.message }); 
    }
  });
  
  


userRoute.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();
    res.status(200).send("Logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = {
  userRoute,
};
