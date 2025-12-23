const express = require("express");
const router = express.Router();
const controller = require("./items.controller");
const typeController = require("./type/type.controller");

router.get("/", controller.getItems);
router.post("/", controller.createItems);
router.put("/:id", controller.updateItems);
router.delete("/:id", controller.deleteItems);

router.get("/types", typeController.getTypes);
router.post("/types", typeController.createTypes);
router.put("/types/:id", typeController.updateTypes);
router.delete("/types/:id", typeController.deleteTypes);

module.exports = router;
