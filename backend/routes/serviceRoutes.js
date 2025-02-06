const express = require("express");
const router = express.Router();
const { create, viewAll, remove } = require("../controllers/serviceControllers");

router.post("/", create);
router.get("/", viewAll);
router.delete("/:id", remove);

module.exports = router;
