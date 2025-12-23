const service = require("./permission.service");

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await service.getPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createPermissions = async (req, res) => {
  try {
    const permissions = await service.createPermissions(req.body);
    res.status(201).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
exports.updatePermissions = async (req, res) => {
  try {
    const permissions = await service.updatePermissions(
      req.params.id,
      req.body
    );
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deletePermissions = async (req, res) => {
  try {
    const permissions = await service.deletePermissions(req.params.id);
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
