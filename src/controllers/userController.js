const userService = require("../services/userService");

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await userService.updateUser(userId, updates);

    if (!updatedUser) {
      return res.status(404).render("error", {
        message: "Utilisateur introuvable",
      });
    }

    res.redirect("/dashboard?message=Utilisateur mis à jour avec succès !");
  } catch (error) {
    res.status(500).render("error", {
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.redirect("/dashboard?message=Utilisateur supprimé avec succès !");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};
