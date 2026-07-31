const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const userStatsController = require("../controllers/userStatsController");

router.get(
    "/",
    verifyToken,
    userStatsController.getStats
);

module.exports = router;