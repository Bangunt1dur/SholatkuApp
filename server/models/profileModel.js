const db = require("../config/database");

// CREATE
exports.createProfile = async (
    userId,
    name,
    pin,
    avatar_url
) => {

    const [result] = await db.execute(
        `INSERT INTO profiles
        (users_id,name,pin,avatar_url)
        VALUES (?,?,?,?)`,
        [
            userId,
            name,
            pin,
            avatar_url
        ]
    );

    return result.insertId;

};

// GET PROFILE
exports.getProfileByUserId = async (userId) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM profiles
         WHERE users_id = ?`,
        [userId]
    );

    return rows;

};

// UPDATE PROFILE
exports.updateProfile = async (
    userId,
    name,
    avatar_url
) => {

    const [result] = await db.execute(
        `UPDATE profiles
         SET
            name = ?,
            avatar_url = ?
         WHERE users_id = ?`,
        [
            name,
            avatar_url,
            userId
        ]
    );

    return result;

};