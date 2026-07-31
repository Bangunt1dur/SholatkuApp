const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bacaanRoutes = require("./routes/bacaanRoutes");
const gerakanRoutes = require("./routes/gerakanRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");
const trackerRoutes = require("./routes/trackerRoutes");
const userStatsRoutes = require("./routes/userStatsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const ujiHafalanRoutes = require("./routes/ujiHafalanRoutes");
const rewardHistoryRoutes = require("./routes/rewardHistoryRoutes");


const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/bacaan", bacaanRoutes);
app.use("/api/gerakan", gerakanRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/stats", userStatsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/uji-hafalan", ujiHafalanRoutes);
app.use("/api/reward", rewardHistoryRoutes);

app.use((err, req, res, next) => {

    if (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    next();

});

app.get("/", (req, res) => {
    res.send("🚀 Backend Sholatku berhasil berjalan!");
});

module.exports = app;