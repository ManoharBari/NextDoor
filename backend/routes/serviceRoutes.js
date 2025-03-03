const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  create,
  viewAll,
  remove,
  updateService,
} = require("../controllers/serviceControllers");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post(
  "/",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("provider"),
  create
);

router.put(
  "/:id",
  upload.single("image"),
  authMiddleware,
  roleMiddleware("provider"),
  updateService
);

router.get("/", viewAll);

router.delete("/:id", authMiddleware, roleMiddleware("provider"), remove);

module.exports = router;
