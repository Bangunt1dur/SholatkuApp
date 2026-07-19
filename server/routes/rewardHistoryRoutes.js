const express = require("express");
const router = express.Router();

const rewardController = require("../controllers/rewardHistoryController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    rewardController.getHistory
);

module.exports = router;