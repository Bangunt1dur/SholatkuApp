require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
console.log("JWT Secret:", process.env.JWT_SECRET);
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});