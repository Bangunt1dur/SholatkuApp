const db = require("../config/database");

exports.findByEmail = async (email) => {

    const [rows] = await db.execute(
        `SELECT
            u.users_id,
            u.email,
            u.password_hash,
            u.account_type,
            p.name,
            p.pin,
            p.avatar_url
        FROM users u
        LEFT JOIN profiles p
        ON u.users_id = p.users_id
        WHERE u.email = ?`,
        [email]
    );

    return rows;
};

exports.createUser = async (
    email,
    password_hash,
    account_type
) => {

    const [result] = await db.execute(
        `INSERT INTO users(email,password_hash,account_type)
         VALUES(?,?,?)`,
        [email,password_hash,account_type]
    );

    return result.insertId;
};

// Tambah XP dan Coin
exports.addReward = async (profileId, xp, coins) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM user_stats
         WHERE profiles_id=?`,
        [profileId]
    );

    if(rows.length===0){
        return;
    }

    let stats = rows[0];

    let totalXP = stats.xp + xp;
    let totalCoin = stats.coins + coins;
    let level = stats.level;

    while(totalXP >= 100){

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