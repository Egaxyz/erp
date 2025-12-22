const service = require("./supplier.service");

exports.getSupplier = async (req, res) => {
  try {
    const result = await service.getSupplier();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.createSupplier = async (req, res) => {
  try {
    const result = await service.createSupplier(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.updateSupplier = async (req, res) => {
  try {
    const result = await service.updateSupplier(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.deleteSupplier = async (req, res) => {
  try {
    const result = await service.deleteSupplier(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
