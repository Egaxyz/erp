const express = require("express");
const router = express.Router();
const controller = require("./supplier.controller");

router.get("/", controller.getSupplier);
router.post("/", controller.createSupplier);
router.put("/:id", controller.updateSupplier);
router.delete("/:id", controller.deleteSupplier);

module.exports = router;
