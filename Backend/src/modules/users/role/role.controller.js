const service = require("./role.service");

exports.getRoles = async (req, res) => {
  try {
    const roles = await service.getRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createRoles = async (req, res) => {
  try {
    const roles = await service.createRoles(req.body);
    res.status(201).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
exports.updateRoles = async (req, res) => {
  try {
    const roles = await service.updateRoles(req.params.id, req.body);
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteRoles = async (req, res) => {
  try {
    const roles = await service.deleteRoles(req.params.id);
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getRolesWithPermissions = async (req, res) => {
  try {
    const roles = await service.getRolesWithPermissions();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.assignPermissionsToRole = async (req, res) => {
  try {
    const result = await service.assignPermissionsToRole(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removePermissionsFromRoles = async (req, res) => {
  try {
    const result = await service.removePermissionsFromRoles(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
