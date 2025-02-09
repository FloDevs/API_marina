const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connecté avec succès");
    await createFirstUser();
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};

const createFirstUser = async () => {
  try {
    const existingUser = await User.findOne({ email: "first@example.com" });
    if (!existingUser) {
      const firstUser = new User({
        name: "first",
        email: "first@example.com",
        password: "first123",
      });

      await firstUser.save();
    }
  } catch (err) {
    console.error(
      "❌ Erreur lors de la création de l'utilisateur 'professeur':",
      err
    );
  }
};

module.exports = connectDB;
