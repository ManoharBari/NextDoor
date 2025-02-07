const express = require("express");
const router = express.Router();
const { send, getChat } = require("../controllers/chatControllers");

router.post("/", send);
router.get("/:senderId/:receiverId", getChat);

module.exports = router;
