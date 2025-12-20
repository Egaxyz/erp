const express = require("express");
const router = express.Router();

const authRoutes = require("./modules/auth/auth.route");

router.use("/auth", authRoutes);

router.get("/home", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router;
