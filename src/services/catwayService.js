const Catway = require("../models/Catway");

exports.getAllCatways = async () => {
  const catways = await Catway.find();
  return catways;
};

exports.getCatwayById = async (id) => {
  return await Catway.findById(id);
};

exports.findCatwayByNumber = async (catwayNumber) => {
  return await Catway.findOne({ catwayNumber });
};

exports.createCatway = async (data) => {
  data.disponible = data.disponible === "true";

  if (!["long", "short"].includes(data.type)) {
    throw new Error("Type invalide. Choisissez 'long' ou 'short'.");
  }

  return await Catway.create(data);
};

exports.updateCatway = async (id, updates) => {
  return await Catway.findByIdAndUpdate(
    id,
    { $set: { catwayState: updates.catwayState } },
    { new: true, runValidators: true }
  );
};

exports.deleteCatway = async (id) => {
  return await Catway.findByIdAndDelete(id);
};
