const express = require("express");
const router = express.Router();
const {
  create,
  viewAll,
  remove,
} = require("../controllers/serviceControllers");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, roleMiddleware("provider"), create);
router.get("/", viewAll);
router.delete("/:id", authMiddleware, roleMiddleware("provider"), remove);

module.exports = router;
