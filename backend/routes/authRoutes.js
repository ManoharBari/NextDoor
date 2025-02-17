const express = require("express");
const router = express.Router();
const { signup, login, getUser } = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/getuser", authMiddleware, getUser);

module.exports = router;
