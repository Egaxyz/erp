const express = require("express");
const router = express.Router();
const controller = require("./transaction.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.get("/", auth, permit("read_transaction"), controller.getTransaction);
router.post("/", auth, permit("borrow_item"), controller.getTransaction);

module.exports = router;
