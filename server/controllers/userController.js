const db = require("../config/database");

const getAllUsers = (req, res) => {

    const sql = "SELECT users_id, email, account_type FROM users";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Terjadi kesalahan",
                error: err
            });
        }

        res.json(result);

    });

};

module.exports = {
    getAllUsers
};