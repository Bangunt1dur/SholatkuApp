const db = require("../config/database");

// Ambil semua reward milik profile
exports.getByProfile = async (profileId) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM reward_history
         WHERE profiles_id = ?
         ORDER BY created_at DESC`,
        [profileId]
    );

    return rows;

};

// Tambah reward baru
exports.create = async (
    profileId,
    activity,
    coins
) => {

    const [result] = await db.execute(
        `INSERT INTO reward_history
        (
            profiles_id,
            activity,
            coins
        )
        VALUES (?,?,?)`,
        [
            profileId,
            activity,
            coins
        ]
    );

    return result.insertId;

};