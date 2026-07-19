const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const verifyToken = require("../middleware/authMiddleware");

// Ambil profile
router.get(
    "/",
    verifyToken,
    profileController.getProfile
);

// Update profile
router.put(
    "/",
    verifyToken,
    profileController.updateProfile
);

module.exports = router;