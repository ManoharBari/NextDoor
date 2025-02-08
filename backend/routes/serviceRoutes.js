const express = require("express");
const router = express.Router();
const {
  create,
  viewAll,
  remove,
} = require("../controllers/serviceControllers");
const { roleMiddleware } = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware(["provider"]), create);
router.get("/", viewAll);
router.delete("/:id", roleMiddleware(["provider"]), remove);

module.exports = router;
