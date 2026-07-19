const db = require("../config/database");

// Ambil tracker hari ini
exports.getTodayTracker = async (profileId, tanggal) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM tracker_harian
         WHERE profiles_id = ?
         AND tanggal = ?`,
        [profileId, tanggal]
    );

    return rows;
};

// Membuat tracker baru
exports.createTracker = async (profileId, tanggal) => {

    const [result] = await db.execute(
        `INSERT INTO tracker_harian
        (profiles_id, tanggal)
        VALUES (?, ?)`,
        [
            profileId,
            tanggal
        ]
    );

    return result.insertId;
};

// Update checklist sholat
exports.updateSholat = async (
    trackerId,
    field
) => {

    const [result] = await db.execute(
        `UPDATE tracker_harian
         SET ${field} = 1
         WHERE tracker_id = ?`,
        [trackerId]
    );

    return result;
};

// Riwayat
exports.getHistory = async (profileId) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM tracker_harian
         WHERE profiles_id = ?
         ORDER BY tanggal DESC`,
        [profileId]
    );

    return rows;
};