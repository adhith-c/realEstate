require("dotenv").config();
const User = require("../models/user");
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

exports.getProfile = async (req, res) => {
  // console.log("emaill", req.user.UserInfo.email);
  const userEmail = req.user.UserInfo.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) return res.sendStatus(403).json({ msg: "notFound" });

  res.json({ user: user });
};
exports.postProfile = async (req, res) => {
  console.log("ii post");
  console.log(req.user);
};

exports.editProfile = async (req, res) => {
  try {
    console.log("req body", req.body);
    console.log("req params", req.params);
    const user = await User.findByIdAndUpdate(req.body.userData._id, {
      ...req.body.userData,
      url: req.body.url,
      // firstName: req.body.userData.firstName,
      // lastName: req.body.userData.lastName,
      // email: req.body.userData.email,
    });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};
