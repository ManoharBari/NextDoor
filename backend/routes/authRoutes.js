const express = require("express");
const router = express.Router();
const { signup, login, getUser } = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.post("/getuser", authMiddleware, getUser);

module.exports = router;
