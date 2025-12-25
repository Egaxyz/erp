const express = require("express");
const router = express.Router();
const controller = require("./items.controller");
const typeController = require("./type/type.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.get("/", auth, permit("read_items"), controller.getItems);
router.post("/", auth, permit("create_items"), controller.createItems);
router.put("/:id", auth, permit("update_items"), controller.updateItems);
router.delete("/:id", auth, permit("delete_items"), controller.deleteItems);

router.get("/types", auth, permit("read_item_types"), typeController.getTypes);
router.post(
  "/types",
  auth,
  permit("create_item_types"),
  typeController.createTypes
);
router.put(
  "/types/:id",
  auth,
  permit("update_item_types"),
  typeController.updateTypes
);
router.delete(
  "/types/:id",
  auth,
  permit("delete_item_types"),
  typeController.deleteTypes
);

module.exports = router;
