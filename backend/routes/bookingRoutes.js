const express = require("express");
const router = express.Router();
const {
  create,
  viewAll,
  update,
} = require("../controllers/bookingControllers");
const { roleMiddleware } = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware(["client"]), create);
router.get("/:userId", roleMiddleware(["client"]), viewAll);
router.patch("/:userId", update);

module.exports = router;
