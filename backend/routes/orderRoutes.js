const express = require("express");
const {
  createOrder,
  verifyPayment,
  viewAll,
  remove,
} = require("../controllers/orderControllers");
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/:userId", viewAll);
router.delete("/:orderId", remove);

module.exports = router;
