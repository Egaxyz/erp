const express = require("express");
const router = express.Router();

const authRoutes = require("./modules/auth/auth.route");
const supplierRoutes = require("./modules/suppliers/supplier.route");

router.use("/auth", authRoutes);

router.get("/home", (req, res) => {
  res.json({ status: "OK" });
});
router.use("/supplier", supplierRoutes);

module.exports = router;
