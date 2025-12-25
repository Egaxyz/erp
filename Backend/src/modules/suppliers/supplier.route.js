const express = require("express");
const router = express.Router();
const controller = require("./supplier.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.get("/", auth, permit("read_suppliers"), controller.getSupplier);
router.post("/", auth, permit("create_suppliers"), controller.createSupplier);
router.put("/:id", auth, permit("update_suppliers"), controller.updateSupplier);
router.delete(
  "/:id",
  auth,
  permit("delete_suppliers"),
  controller.deleteSupplier
);

module.exports = router;
