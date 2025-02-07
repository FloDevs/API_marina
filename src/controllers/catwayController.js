const catwayService = require("../services/catwayService");

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.render("catways", { catways, user: req.session.user });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.getCatwayById = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).render("error", { message: "Catway non trouvé" });
    }
    const viewType = req.query.view === "details" ? "catwayDetails" : "catways";

    res.render(viewType, { catway, user: req.session?.user || null });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.createCatway = async (req, res) => {
  try {
    const existingCatway = await catwayService.findCatwayByNumber(
      req.body.catwayNumber
    );
    if (existingCatway) {
      return res
        .status(400)
        .render("error", { message: "Le numéro du Catway existe déjà !" });
    }

    const newCatway = await catwayService.createCatway(req.body);

    res.redirect("/dashboard?message=Catway créé avec succès !");
  } catch (error) {
    res.status(400).render("error", { message: error.message });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await catwayService.updateCatway(
      req.params.id,
      req.body
    );
    if (!updatedCatway) {
      return res.status(404).render("error", { message: "Catway non trouvé" });
    }
    res.redirect("/dashboard?message=Catway mis à jour avec succès !");
  } catch (error) {
    res.status(400).render("error", { message: error.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await catwayService.deleteCatway(req.params.id);
    if (!deletedCatway) {
      return res.status(404).render("error", { message: "Catway non trouvé" });
    }
    res.redirect("/dashboard?message=Catway supprimé avec succès !");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};
