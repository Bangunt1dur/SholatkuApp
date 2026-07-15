const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Backend Sholatku berhasil berjalan!");
});

module.exports = app;