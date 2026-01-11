const express = require("express");
const router = express.Router();
const controller = require("./transaction.controller");
const auth = require("../../middleware/auth.middleware");
const permit = require("../../middleware/permission.middleware");

router.get("/", auth, permit("read_transaction"), controller.getTransaction);
router.post("/borrow/", auth, permit("borrow_item"), controller.borrowItem);
router.get(
  "/detail/",
  auth,
  permit("read_trans_details"),
  controller.transactionDetail
);
router.put(
  "/approve/:id",
  auth,
  permit("approve_transaction"),
  controller.approveTransaction
);
module.exports = router;
