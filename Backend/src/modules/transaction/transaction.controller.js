const service = require("./transaction.service");

exports.getTransaction = async (req, res) => {
  try {
    const result = await service.getTransaction();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
exports.borrowItem = async (req, res) => {
  console.log("=== START borrowItem ===");
  console.log("Body:", req.body);
  console.log("User:", req.user);

  try {
    const result = await service.borrowItem(req.body, req.user);

    console.log("=== SERVICE RESULT ===");
    console.log(result);

    if (!result) {
      console.log("❌ Result is null/undefined");
      return res.status(500).json({ error: "No result returned" });
    }

    console.log("✅ Sending response:", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ ERROR CAUGHT:", error.message);
    console.error("Stack:", error.stack);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
