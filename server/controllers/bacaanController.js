const Bacaan = require("../models/bacaanModel");

// ===============================
// GET Semua Bacaan
// ===============================
exports.getAllBacaan = async (req, res) => {

    try {

        const bacaan = await Bacaan.getAllBacaan();

        res.json({
            message: "Data bacaan berhasil diambil",
            data: bacaan
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// GET Bacaan Berdasarkan ID
// ===============================
exports.getBacaanById = async (req, res) => {

    try {

        const id = req.params.id;

        const bacaan = await Bacaan.getBacaanById(id);

        if (bacaan.length === 0) {
            return res.status(404).json({
                message: "Bacaan tidak ditemukan"
            });
        }

        res.json({
            message: "Bacaan berhasil diambil",
            data: bacaan[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// CREATE Bacaan
// ===============================
exports.createBacaan = async (req, res) => {

    try {

        const {
    gerakan_id,
    teks_arab,
    teks_latin,
    terjemahan,
    sumber
} = req.body;

let audio_url = "";

if (req.file) {

    audio_url =
        `data:${req.file.mimetype};base64,` +
        req.file.buffer.toString("base64");

}

        const id = await Bacaan.createBacaan(
            gerakan_id,
            teks_arab,
            teks_latin,
            terjemahan,
            audio_url,
            sumber
        );

        res.status(201).json({
            message: "Bacaan berhasil ditambahkan",
            bacaan_id: id
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// UPDATE Bacaan
// ===============================
exports.updateBacaan = async (req, res) => {

    try {

        const id = req.params.id;

        const {
    gerakan_id,
    teks_arab,
    teks_latin,
    terjemahan,
    sumber
} = req.body;

let audio_url = req.body.audio_url;

if (req.file) {

    audio_url =
        `data:${req.file.mimetype};base64,` +
        req.file.buffer.toString("base64");

}

        await Bacaan.updateBacaan(
            id,
            gerakan_id,
            teks_arab,
            teks_latin,
            terjemahan,
            audio_url,
            sumber
        );

        res.json({
            message: "Bacaan berhasil diupdate"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// DELETE Bacaan
// ===============================
exports.deleteBacaan = async (req, res) => {

    try {

        const id = req.params.id;

        await Bacaan.deleteBacaan(id);

        res.json({
            message: "Bacaan berhasil dihapus"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};