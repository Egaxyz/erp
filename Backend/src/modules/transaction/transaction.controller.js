const service = require("./transaction.service");

exports.getTransaction = async (req, res) => {
  try {
    const result = await service.getTransaction();
    res.status(200).json(result);
  } catch {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.borrowItem = async (req, res) => {
  try {
    const result = await service.borrowItem(req.body);
    res.status(200).json(result);
  } catch {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
