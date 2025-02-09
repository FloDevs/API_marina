require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/database");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
     
      return req.body._method;
    }
    return req.method;
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // ⚠️ Mettre `true` si HTTPS est activé
  })
);

app.get("/", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render("index", { message });
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    req.session.message = "Veuillez vous connecter.";
    return res.redirect("/");
  }

  const message = req.session.message || null;
  req.session.message = null;
  res.render("dashboard", { user: req.session.user, message }); // Passer message à la vue
});

app.get("/documentation", (req, res) => {
  res.render("documentation");
});

// Route pour la page d'erreur (optionnelle)
app.get("/error", (req, res) => {
  res.render("error", { message: "Une erreur est survenue." });
});

app.use("/users", require("./src/routes/userRoutes"));
app.use("/catways", require("./src/routes/catwayRoutes"));
app.use("/auth", require("./src/routes/authRoutes"));
app.use("/reservations", require("./src/routes/reservationRoutes"));
app.use((req, res, next) => {
  console.log(`Received: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue." });
});



// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

module.exports = app;
