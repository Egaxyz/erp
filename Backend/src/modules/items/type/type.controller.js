const service = require("./type.service");

exports.getTypes = async (req, res) => {
  try {
    const types = await service.getTypes();
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createTypes = async (req, res) => {
  try {
    const types = await service.createTypes(req.body);
    res.status(201).json(types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateTypes = async (req, res) => {
  try {
    const types = await service.updateTypes(req.params.id, req.body);
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteTypes = async (req, res) => {
  try {
    const types = await service.deleteTypes(req.params.id);
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
