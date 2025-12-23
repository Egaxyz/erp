const express = require("express");
const router = express.Router();

const authRoutes = require("./modules/auth/auth.route");
const supplierRoutes = require("./modules/suppliers/supplier.route");
const itemsRoutes = require("./modules/items/items.route");

router.use("/auth", authRoutes);

router.get("/home", (req, res) => {
  res.json({ status: "OK" });
});
router.use("/supplier", supplierRoutes);
router.use("/items", itemsRoutes);
router.use("/items/types", itemsRoutes);

module.exports = router;
