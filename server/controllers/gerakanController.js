const Gerakan = require("../models/gerakanModel");

// ===============================
// GET ALL
// ===============================
exports.getAllGerakan = async (req, res) => {

    try {

        const data = await Gerakan.getAllGerakan();

        res.json({
            message: "Data gerakan berhasil diambil",
            data
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===============================
// GET BY ID
// ===============================
exports.getGerakanById = async (req, res) => {

    try {

        const id = req.params.id;

        const data = await Gerakan.getGerakanById(id);

        if (data.length == 0) {

            return res.status(404).json({
                message: "Gerakan tidak ditemukan"
            });

        }

        res.json({

            message: "Gerakan ditemukan",
            data: data[0]

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// ===============================
// CREATE
// ===============================
exports.createGerakan = async (req, res) => {
    
console.log("===== CREATE GERAKAN =====");
console.log("Body:", req.body);
console.log("File:", req.file);

    try {

        const {
    kategori_id,
    nama,
    urutan,
    deskripsi,
    video_url
} = req.body;

let gambar_url = "";

if (req.file) {

    gambar_url =
        `data:${req.file.mimetype};base64,` +
        req.file.buffer.toString("base64");

}

        const id = await Gerakan.createGerakan(

            kategori_id,
            nama,
            urutan,
            deskripsi,
            gambar_url,
            video_url

        );

        res.status(201).json({

            message: "Gerakan berhasil ditambahkan",
            gerakan_id: id

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// ===============================
// UPDATE
// ===============================
exports.updateGerakan = async (req, res) => {

    try {

        const id = req.params.id;

       const {
    kategori_id,
    nama,
    urutan,
    deskripsi,
    video_url
} = req.body;

let gambar_url = req.body.gambar_url;

if (req.file) {

    gambar_url =
        `data:${req.file.mimetype};base64,` +
        req.file.buffer.toString("base64");

}

        await Gerakan.updateGerakan(

            id,
            kategori_id,
            nama,
            urutan,
            deskripsi,
            gambar_url,
            video_url

        );

        res.json({

            message: "Gerakan berhasil diupdate"

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// ===============================
// DELETE
// ===============================
exports.deleteGerakan = async (req, res) => {

    try {

        const id = req.params.id;

        await Gerakan.deleteGerakan(id);

        res.json({

            message: "Gerakan berhasil dihapus"

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};