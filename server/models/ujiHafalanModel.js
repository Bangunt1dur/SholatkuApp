const db = require("../config/database");

// Ambil semua data
exports.getAll = async () => {

    const [rows] = await db.execute(
        `SELECT * FROM uji_hafalan`
    );

    return rows;
};

// Ambil berdasarkan profile
exports.getByProfile = async (profileId) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM uji_hafalan
         WHERE profiles_id=?`,
        [profileId]
    );

    return rows;
};

// Membuat ujian
exports.create = async (

    profileId,
    bacaanId

) => {

    const [result] = await db.execute(

        `INSERT INTO uji_hafalan
        (
            profiles_id,
            bacaan_id
        )
        VALUES(?,?)`,

        [
            profileId,
            bacaanId
        ]

    );

    return result.insertId;

};

// Update status
exports.updateStatus = async (

    id,
    status,
    testedBy

) => {

    await db.execute(

        `UPDATE uji_hafalan
        SET
            status=?,
            tested_by_id=?
        WHERE uji_hafalan_id=?`,

        [
            status,
            testedBy,
            id
        ]

    );

};

// Ambil satu data ujian
exports.getById = async (id) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM uji_hafalan
         WHERE uji_hafalan_id=?`,
        [id]
    );

    return rows;

};