const db = require("../config/database");

// GET semua bacaan
exports.getAllBacaan = async () => {
    const [rows] = await db.execute(
        `SELECT * FROM bacaan`
    );

    return rows;
};

// GET bacaan berdasarkan ID
exports.getBacaanById = async (id) => {

    const [rows] = await db.execute(
        `SELECT * FROM bacaan
         WHERE bacaan_id = ?`,
        [id]
    );

    return rows;
};

// CREATE
exports.createBacaan = async (
    gerakan_id,
    teks_arab,
    teks_latin,
    terjemahan,
    audio_url,
    sumber
) => {

    const [result] = await db.execute(
        `INSERT INTO bacaan
        (
            gerakan_id,
            teks_arab,
            teks_latin,
            terjemahan,
            audio_url,
            sumber
        )
        VALUES (?,?,?,?,?,?)`,
        [
            gerakan_id,
            teks_arab,
            teks_latin,
            terjemahan,
            audio_url,
            sumber
        ]
    );

    return result.insertId;
};

// UPDATE
exports.updateBacaan = async (
    id,
    gerakan_id,
    teks_arab,
    teks_latin,
    terjemahan,
    audio_url,
    sumber
) => {

    const [result] = await db.execute(
        `UPDATE bacaan
        SET
            gerakan_id=?,
            teks_arab=?,
            teks_latin=?,
            terjemahan=?,
            audio_url=?,
            sumber=?
        WHERE bacaan_id=?`,
        [
            gerakan_id,
            teks_arab,
            teks_latin,
            terjemahan,
            audio_url,
            sumber,
            id
        ]
    );

    return result;
};

// DELETE
exports.deleteBacaan = async (id) => {

    const [result] = await db.execute(
        `DELETE FROM bacaan
        WHERE bacaan_id=?`,
        [id]
    );

    return result;
};