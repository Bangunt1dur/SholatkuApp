const express = require("express");
const router = express.Router();

const trackerController = require("../controllers/trackerController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/today",
    verifyToken,
    trackerController.getTodayTracker
);

router.put(
    "/check",
    verifyToken,
    trackerController.checkSholat
);

router.get(
    "/history",
    verifyToken,
    trackerController.getHistory
);

module.exports = router;