const express = require("express");
const router = express.Router();
const { create, viewAll } = require("../controllers/bookingControllers");

router.post("/", create);
router.get("/:providerId", viewAll);

module.exports = router;
