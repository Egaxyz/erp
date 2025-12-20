const service = require("./auth.service");

exports.login = async (req, res) => {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.register = async (req, res) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
