const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

exports.getAllReservations = async () => {
  const reservations = await Reservation.find();
  return reservations;
};

exports.getReservationsByCatway = async (catwayId) => {
  return await Reservation.find({ catway: catwayId });
};

exports.getReservationById = async (reservationId) => {
  return await Reservation.findById(reservationId);
};

exports.createReservation = async (catwayId, reservationData) => {
  const catway = await Catway.findById(catwayId);
  if (!catway) {
    throw new Error("Catway not found");
  }
  if (!catway.disponible) {
    throw new Error("Catway is already reserved");
  }

  const reservation = new Reservation({
    ...reservationData,
    catway: catwayId,
  });

  await reservation.save();

  catway.reservations.push(reservation._id);
  catway.disponible = false;
  await catway.save();

  return reservation;
};

exports.deleteReservation = async (reservationId) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new Error("Reservation not found");
  }

  await Reservation.findByIdAndDelete(reservationId);

  const catway = await Catway.findById(reservation.catway);
  if (catway) {
    catway.reservations = catway.reservations.filter(
      (resId) => resId.toString() !== reservationId
    );

    if (catway.reservations.length === 0) {
      catway.disponible = true;
    }

    await catway.save();
  }

  return { message: "Reservation deleted successfully" };
};
