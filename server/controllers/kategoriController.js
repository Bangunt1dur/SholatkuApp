const Kategori = require("../models/kategoriModel");

// GET ALL
exports.getAllKategori = async (req, res) => {

    try {

        const data = await Kategori.getAllKategori();

        res.json({
            message: "Data kategori berhasil diambil",
            data
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// GET BY ID
exports.getKategoriById = async (req, res) => {

    try {

        const data = await Kategori.getKategoriById(req.params.id);

        if (data.length === 0) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan"
            });
        }

        res.json({
            message: "Kategori berhasil diambil",
            data: data[0]
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// CREATE
exports.createKategori = async (req, res) => {

    try {

        const { nama } = req.body;

        const id = await Kategori.createKategori(nama);

        res.status(201).json({
            message: "Kategori berhasil ditambahkan",
            kategori_id: id
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// UPDATE
exports.updateKategori = async (req, res) => {

    try {

        const { nama } = req.body;

        await Kategori.updateKategori(
            req.params.id,
            nama
        );

        res.json({
            message: "Kategori berhasil diupdate"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// DELETE
exports.deleteKategori = async (req, res) => {

    try {

        await Kategori.deleteKategori(req.params.id);

        res.json({
            message: "Kategori berhasil dihapus"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};