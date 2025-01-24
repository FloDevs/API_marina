const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCatway = async (req, res) => {
  const { catwayNumber, type, catwayState } = req.body;
  try {
    const newCatway = new Catway({ catwayNumber, type, catwayState });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
    if (!updatedCatway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.partialUpdateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedCatway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
