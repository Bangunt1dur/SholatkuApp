const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const controller = require("../controllers/ujiHafalanController");
const checkRole = require("../middleware/roleMiddleware");

router.get(
    "/",
    verifyToken,
    controller.getMyUjian
);

router.post(
    "/",
    verifyToken,
    controller.startUjian
);

router.put(
    "/:id/lulus",
    verifyToken,
    checkRole("ADMIN","PARENT"),
    controller.lulus
);

module.exports = router;