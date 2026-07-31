const db = require("../config/database");

// =======================
// Ambil stats
// =======================
exports.getStats = async (profileId) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM user_stats
         WHERE profiles_id=?`,
        [profileId]
    );

    return rows;
};

// =======================
// Buat stats pertama kali
// =======================
exports.createStats = async (profileId) => {

    const [result] = await db.execute(
        `INSERT INTO user_stats
        (profiles_id)
        VALUES(?)`,
        [profileId]
    );

    return result.insertId;
};

// =======================
// Update stats
// =======================
exports.updateStats = async (

    profileId,
    level,
    xp,
    coins,
    streak

) => {

    await db.execute(

        `UPDATE user_stats
        SET
            level=?,
            xp=?,
            coins=?,
            streak_days=?
        WHERE profiles_id=?`,

        [
            level,
            xp,
            coins,
            streak,
            profileId
        ]

    );

};

// =======================
// Tambah Reward (XP, Coin, Level)
// =======================
    exports.addReward = async (profileId, xp, coins) => {

        const [rows] = await db.execute(
            `SELECT *
            FROM user_stats
            WHERE profiles_id=?`,
            [profileId]
        );

        if (rows.length === 0) {
            return;
        }

        let stats = rows[0];

        let totalXP = stats.xp + xp;
        let totalCoin = stats.coins + coins;
        let level = stats.level;

        // Level Up setiap 100 XP
        while (totalXP >= 100) {
            totalXP -= 100;
            level++;
        }

        await db.execute(

            `UPDATE user_stats
            SET
                xp=?,
                coins=?,
            level=?
        WHERE profiles_id=?`,

        [
            totalXP,
            totalCoin,
            level,
            profileId
        ]

    );

};