const service = require("./users.service");

exports.getUsers = async (req, res) => {
  try {
    const users = await service.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createUsers = async (req, res) => {
  try {
    const users = await service.createUsers(req.body);
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
exports.updateUsers = async (req, res) => {
  try {
    const users = await service.updateUsers(req.params.id, req.body);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
exports.deleteUsers = async (req, res) => {
  try {
    const users = await service.deleteUsers(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
