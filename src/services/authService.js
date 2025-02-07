const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../config/auth");

exports.registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  const user = new User({ name, email, password });
  await user.save();

  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Vos identifiants ne sont pas valides.");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};
