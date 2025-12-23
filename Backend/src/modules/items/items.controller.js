const service = require("./items.service");

exports.getItems = async (req, res) => {
  try {
    const items = await service.getItems();
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createItems = async (req, res) => {
  try {
    const items = await service.createItems(req.body);
    res.status(201).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
exports.updateItems = async (req, res) => {
  try {
    const items = await service.updateItems(req.params.id, req.body);
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteItems = async (req, res) => {
  try {
    const items = await service.deleteItems(req.params.id);
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
