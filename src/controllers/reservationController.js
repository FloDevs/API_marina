const reservationService = require("../services/reservationService");

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.render("reservations", { reservations, user: req.session.user });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await reservationService.getReservationsByCatway(
      req.params.catwayId
    );
    res.render("reservations", { reservations, user: req.session.user });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.reservationId
    );
    if (!reservation) {
      return res
        .status(404)
        .render("error", { message: "Réservation non trouvée" });
    }
    res.render("reservationDetail", { reservation, user: req.session.user });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { catwayId } = req.body;
    await reservationService.createReservation(catwayId, req.body);
    res.redirect(`/dashboard?message=Réservation créée avec succès !`);
  } catch (error) {
    res.status(400).render("error", { message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.reservationId);
    res.redirect(`/dashboard?message=Réservation supprimée avec succès !`);
  } catch (error) {
    res.status(400).render("error", { message: error.message });
  }
};
