const express = require("express");
const router = express.Router();
const {
  create,
  viewAll,
  update,
} = require("../controllers/bookingControllers");

router.post("/", create);
router.get("/:userId", viewAll);
router.patch("/:userId", update);

module.exports = router;
