const express = require("express");
const router = express.Router();

const gerakanController = require("../controllers/gerakanController");
const upload = require("../middleware/uploadImage");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Semua user boleh melihat data
router.get("/", gerakanController.getAllGerakan);

router.get("/:id", gerakanController.getGerakanById);

// Hanya ADMIN
router.post(
    "/",
    verifyToken,
    checkRole("ADMIN"),
    upload.single("gambar"),
    gerakanController.createGerakan
);

// Hanya ADMIN
router.put(
    "/:id",
    verifyToken,
    checkRole("ADMIN"),
    upload.single("gambar"),
    gerakanController.updateGerakan
);

// Hanya ADMIN
router.delete(
    "/:id",
    verifyToken,
    checkRole("ADMIN"),
    gerakanController.deleteGerakan
);

module.exports = router;