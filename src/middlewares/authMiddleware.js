const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.session.message = "Veuillez vous connecter.";
    return res.redirect("/");
  }

  const token = req.session.token;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    req.session.destroy();
    return res.redirect("/");
  }
};

module.exports = authMiddleware;
