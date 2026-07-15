const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sholatku_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ Database berhasil terhubung");
        connection.release();
    } catch (err) {
        console.error("❌ Gagal terhubung ke database");
        console.error(err);
    }
})();

module.exports = db;