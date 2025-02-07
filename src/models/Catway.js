const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: String, required: true, unique: true },
  catwayState: { type: String, default: "" },
  type: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = mongoose.model("Catway", catwaySchema);
