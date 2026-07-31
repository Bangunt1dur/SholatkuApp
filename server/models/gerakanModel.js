const db = require("../config/database");

// ===============================
// GET Semua Gerakan
// ===============================
exports.getAllGerakan = async () => {

    const [rows] = await db.execute(
        `SELECT * FROM gerakan
         ORDER BY urutan ASC`
    );

    return rows;
};

// ===============================
// GET Gerakan By ID
// ===============================
exports.getGerakanById = async (id) => {

    const [rows] = await db.execute(
        `SELECT * FROM gerakan
         WHERE gerakan_id=?`,
        [id]
    );

    return rows;
};

// ===============================
// CREATE
// ===============================
exports.createGerakan = async (
    kategori_id,
    nama,
    urutan,
    deskripsi,
    gambar_url,
    video_url
) => {

    const [result] = await db.execute(

        `INSERT INTO gerakan
        (
            kategori_id,
            nama,
            urutan,
            deskripsi,
            gambar_url,
            video_url
        )

        VALUES
        (?,?,?,?,?,?)`,

        [
            kategori_id,
            nama,
            urutan,
            deskripsi,
            gambar_url,
            video_url
        ]

    );

    return result.insertId;

};

// ===============================
// UPDATE
// ===============================
exports.updateGerakan = async (

    id,
    kategori_id,
    nama,
    urutan,
    deskripsi,
    gambar_url,
    video_url

) => {

    const [result] = await db.execute(

        `UPDATE gerakan
         SET
            kategori_id=?,
            nama=?,
            urutan=?,
            deskripsi=?,
            gambar_url=?,
            video_url=?
         WHERE gerakan_id=?`,

        [
            kategori_id,
            nama,
            urutan,
            deskripsi,
            gambar_url,
            video_url,
            id
        ]

    );

    return result;

};

// ===============================
// DELETE
// ===============================
exports.deleteGerakan = async (id) => {

    const [result] = await db.execute(

        `DELETE FROM gerakan
         WHERE gerakan_id=?`,

        [id]

    );

    return result;

};