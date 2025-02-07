const authService = require("../services/authService");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    res.redirect(
      "/?message=Utilisateur enregistré avec succès ! Vous pouvez maintenant vous connecter."
    );
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(400).render("index", { message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    req.session.user = user;
    req.session.token = token;

    res.redirect("/dashboard");
  } catch (err) {
    res
      .status(400)
      .render("index", { message: "Email ou mot de passe incorrect" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard?message=Erreur lors de la déconnexion");
    }
    res.redirect("/?message=Déconnexion réussie !");
  });
};
