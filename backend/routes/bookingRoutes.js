const express = require("express");
const router = express.Router();
const {
  create,
  viewAll,
  remove,
} = require("../controllers/bookingControllers");

router.post("/", create);
router.get("/:userId", viewAll);
router.delete("/:userId", remove);

module.exports = router;
