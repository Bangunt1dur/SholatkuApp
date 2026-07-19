const db = require("../config/database");

// GET semua kategori
exports.getAllKategori = async () => {

    const [rows] = await db.execute(
        `SELECT * FROM kategori`
    );

    return rows;
};

// GET kategori berdasarkan ID
exports.getKategoriById = async (id) => {

    const [rows] = await db.execute(
        `SELECT * FROM kategori
         WHERE kategori_id = ?`,
        [id]
    );

    return rows;
};

// CREATE
exports.createKategori = async (nama) => {

    const [result] = await db.execute(
        `INSERT INTO kategori (nama)
         VALUES (?)`,
        [nama]
    );

    return result.insertId;
};

// UPDATE
exports.updateKategori = async (id, nama) => {

    const [result] = await db.execute(
        `UPDATE kategori
         SET nama = ?
         WHERE kategori_id = ?`,
        [nama, id]
    );

    return result;
};

// DELETE
exports.deleteKategori = async (id) => {

    const [result] = await db.execute(
        `DELETE FROM kategori
         WHERE kategori_id = ?`,
        [id]
    );

    return result;
};