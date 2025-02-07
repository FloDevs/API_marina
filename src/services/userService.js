const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = async (id, updates) => {
  const allowedUpdates = ["name", "email", "password"];
  const filteredUpdates = {};

  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      filteredUpdates[key] = updates[key];
    }
  });

  if (filteredUpdates.password) {
    filteredUpdates.password = await bcrypt.hash(filteredUpdates.password, 10);
  }

  return await User.findByIdAndUpdate(id, filteredUpdates, {
    new: true,
    runValidators: true,
  });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
