const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// router.post("/", authMiddleware, create);
// router.get("/:providerId", viewAll);

module.exports = router;
