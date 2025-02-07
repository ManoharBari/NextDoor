const express = require("express");
const router = express.Router();
const {
  processPayment,
  getAllPayment,
} = require("../controllers/paymentControllers");

router.post("/", processPayment);
router.get("/:userId", getAllPayment);

module.exports = router;
