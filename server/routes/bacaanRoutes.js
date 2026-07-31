const express = require("express");
const router = express.Router();

const bacaanController = require("../controllers/bacaanController");
const upload = require("../middleware/uploadImage");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Semua user
router.get("/", bacaanController.getAllBacaan);

router.get("/:id", bacaanController.getBacaanById);

// ADMIN
router.post(
    "/",
    verifyToken,
    checkRole("ADMIN"),
    upload.single("audio"),
    bacaanController.createBacaan
);

// ADMIN
router.put(
    "/:id",
    verifyToken,
    checkRole("ADMIN"),
    upload.single("audio"),
    bacaanController.updateBacaan
);

// ADMIN
router.delete(
    "/:id",
    verifyToken,
    checkRole("ADMIN"),
    bacaanController.deleteBacaan
);

module.exports = router;