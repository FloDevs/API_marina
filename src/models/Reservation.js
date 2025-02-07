const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catway",
    required: true,
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
