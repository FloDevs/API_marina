const Reservation = require('../models/Reservation');

// Obtenir toutes les réservations pour un catway donné
exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une réservation spécifique
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une réservation
exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation({ ...req.body, catwayNumber: req.params.id });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        res.json({ message: "Reservation deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
