const db = require("../config/database");

exports.createProfile = async (
    userId,
    name,
    pin,
    avatar_url
) => {

    console.log("Masuk ke createProfile");


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

        console.log("Insert profile berhasil");

    return result.insertId;

};