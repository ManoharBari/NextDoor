const express = require("express");
const {
  createOrder,
  verifyPayment,
  viewAll,
  remove,
  updateOrderStatus,
} = require("../controllers/orderControllers");
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.put("/:orderId/status", updateOrderStatus);
router.get("/", viewAll);
router.delete("/:orderId", remove);

module.exports = router;
