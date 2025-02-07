const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const User = require("../src/models/User");

let token;

before(async () => {
  console.log("🔹 Connexion à la base de test...");
  console.log("🔹 MONGODB_URI utilisé :", process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("🔹 Nettoyage de la base de test...");
  await User.deleteMany();

  console.log("🔹 Création d'un utilisateur test...");
  await User.create({
    name: "admin",
    email: "admin@example.com",
    password: "adminpassword",
  });

  console.log("🔹 Récupération du token JWT...");
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@example.com", password: "adminpassword" });
  token = res.body.token;
});

after(async () => {
  console.log("🔹 Fermeture de la connexion à la base de test...");
  await mongoose.connection.close();
});

module.exports = { token };
